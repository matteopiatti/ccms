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

export async function deletePageComponent(base, page_components_id) {
  await base("page_components").where({ id: page_components_id }).delete();
}

export async function createPageComponent(base, page_id, component_id) {
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
    });
  });
}

export async function editPageComponent(
  base,
  page_id,
  component_id,
  page_components_id,
  props,
  children
) {
  await base.transaction(async (trx) => {
    await trx("page_components")
      .where({ id: page_components_id, page_id, component_id })
      .update({ props: JSON.stringify(props) });

    await Promise.all(
      children.map(async (child) => {
        await trx("page_components").insert({
          page_id,
          component_id: child.children,
          parent_component_id: page_components_id,
          order: 0,
          props: "{}",
        });
      })
    );
  });
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
