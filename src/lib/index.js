import { env } from "$env/dynamic/private";
import { fail } from "@sveltejs/kit";

/* COMPONENTS */
export async function getAllComponents(base) {
  return await base("components").select("*");
}

export async function getPageComponents(base, page_id) {
  const components =
    (await base.transaction(async (trx) => {
      return await trx("page_components")
        .select(
          "page_components.props",
          "page_components.order",
          "page_components.id as page_components_id",
          "parent_component_id",
          "components.*"
        )
        .join("components", "page_components.component_id", "components.id")
        .join("pages", "page_components.page_id", "pages.id")
        .where("pages.id", page_id);
    })) || [];

  return cleanComponents(components);
}

function cleanComponents(components) {
  components.sort((a, b) => a.order - b.order);

  components.forEach((c) => {
    c.props = JSON.parse(c.props);
    c.props_schema = JSON.parse(c.props_schema);
    c.children = components.filter(
      (child) => child.parent_component_id === c.page_components_id
    );
  });

  return components.filter((c) => !c.parent_component_id);
}

export async function deletePageComponent(base, page_components_id) {
  await base("page_components").where({ id: page_components_id }).delete();
}

export async function createPageComponent(
  base,
  page_id,
  component_id,
  parent_component_id
) {
  await base.transaction(async (trx) => {
    const orders = await trx("page_components")
      .where({ page_id, parent_component_id: null })
      .select("order");
    let order = 0;
    const reduced =
      orders.length > 0
        ? orders.reduce((a, b) => (a.order > b.order ? a : b)).order + 1
        : 0;
    await trx("page_components").insert({
      page_id,
      component_id,
      order: reduced,
      props: "{}",
      parent_component_id,
    });
  });
}

export async function movePageComponent(
  base,
  page_components_id,
  page_id,
  direction
) {
  const page_components = await base("page_components")
    .where({ page_id })
    .select("*");
  const component = page_components.find((c) => c.id == page_components_id);
  const sameLayer = await base("page_components")
    .where({ page_id, parent_component_id: component.parent_component_id })
    .select("*");
}

export async function editPageComponent(
  base,
  page_id,
  component_id,
  page_components_id,
  props
) {
  await base("page_components")
    .where({ id: page_components_id, page_id, component_id })
    .update({ props: JSON.stringify(props) });
}

export async function populateComponents(components) {
  return await Promise.all(
    components.map(async (c) => {
      if (c.children?.length > 0) {
        c.children = await populateComponents(c.children);
      }
      return { ...c, component: await import(/* @vite-ignore */ "/" + c.url) };
    })
  );
}

/* PAGES */
export async function getAllPages(base) {
  return await base("pages").select("*");
}

export async function getPage(base, slug) {
  return await base("pages").where({ slug }).first();
}

export async function createPage(base, title, slug, content) {
  return await base("pages").insert({ title, slug, content });
}

export async function editPage(base, id, title, slug, content) {
  return await base("pages").where({ id }).update({ title, slug, content });
}

export async function deletePage(base, id) {
  await base.transaction(async (trx) => {
    await trx("page_components").where({ page_id: id }).delete();
    await trx("pages").where({ id }).delete();
  });
}

/* New API Functions */

export const Blocks = {
  GET: () => API(`/blocks`),
  DELETE: (id) => API(`/blocks/${id}`, { method: "DELETE" }),
  POST: (data) => API(`/blocks`, { method: "POST", body: data }),
  UPDATE: (id, data) => API(`/blocks/${id}`, { method: "PATCH", body: data }),
  SHOW: (id) => API(`/blocks/${id}`).then((res) => res.data),
  MOVE: (id, direction) =>
    API(`/blocks/move/${id}/${direction}`, { method: "POST" }),
};

export const Pages = {
  GET: () => API(`/pages`).then((res) => res.data),
  POST: (data) => API(`/pages`, { method: "POST", body: data }),
  DELETE: (id) => API(`/pages/${id}`, { method: "DELETE" }),
  SHOW: (slug) => API(`/pages/${slug}`).then((res) => res.data),
  UPDATE: (id, data) => API(`/pages/${id}`, { method: "PATCH", body: data }),
};

export const Components = {
  GET: () => API(`/components`).then((res) => res.data),
  POST: (data) => API(`/components`, { method: "POST", body: data }),
  DELETE: (id) => API(`/components/${id}`, { method: "DELETE" }),
  SHOW: (id) => API(`/components/${id}`).then((res) => res.data),
};

async function API(url, options = {}) {
  const response = await fetch(env.API_URL + url, {
    headers: {
      "Content-Type": "application/json",
    },
    method: options.method || "GET",
    body: JSON.stringify(options.body),
  });

  if (!response.ok) {
    return fail(404, await response.json());
  }

  return { status: response.status, data: await response.json() };
}
