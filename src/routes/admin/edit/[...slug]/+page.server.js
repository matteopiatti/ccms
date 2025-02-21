import { redirect } from "@sveltejs/kit";
import { base } from "$lib/knex";
import {
  getPageComponents,
  deletePageComponent,
  createPageComponent,
  getAllComponents,
  getPage,
  editPage,
  editPageComponent,
} from "$lib";

export const load = async ({ locals, params }) => {
  const page = await getPage(base, params.slug);

  return {
    metadata: page,
    blocks: await getPageComponents(base, page.id),
    components: await getAllComponents(base),
  };
};

export const actions = {
  editMetadata: async ({ locals, request }) => {
    const data = await request.formData();

    await editPage(
      base,
      data.get("id"),
      data.get("title"),
      data.get("slug"),
      data.get("content")
    );

    return redirect(302, `/admin/edit/${data.get("slug")}`);
  },
  props: async ({ request, url }) => {
    const data = await request.formData();

    await editPageComponent(
      base,
      data.get("page_id"),
      data.get("component_id"),
      data.get("page_components_id"),
      getProps(data.entries())
    );

    return redirect(302, url.pathname);
  },
  delete: async ({ request, url }) => {
    const data = await request.formData();
    await deletePageComponent(base, data.get("page_components_id"));
    return redirect(302, url.pathname);
  },
  add: async ({ request, url }) => {
    const data = await request.formData();
    await createPageComponent(
      base,
      data.get("page_id"),
      data.get("component_id"),
      data.get("parent_component_id")
    );
    return redirect(302, url.pathname);
  },
  moveUp: async ({ request, url }) => {
    const data = await request.formData();
    const page_components_id = data.get("page_components_id");
    const page_id = data.get("page_id");

    try {
      const page_components = await base("page_components")
        .where({ id: page_components_id })
        .first();
      const order = page_components.order;
      const all = await base("page_components").where({ page_id }).select("*");
      const prev = all
        .filter((c) => c.order < order)
        .reduce((a, b) => (a.order > b.order ? a : b));

      if (prev) {
        await base("page_components")
          .where({ id: page_components_id })
          .update({ order: order - 1 });
        await base("page_components").where({ id: prev.id }).update({ order });
      }
    } catch (e) {
      console.error(e);
    }

    return redirect(302, url.pathname);
  },
  moveDown: async ({ request, url }) => {
    const data = await request.formData();
    const page_components_id = data.get("page_components_id");
    const page_id = data.get("page_id");

    try {
      const page_components = await base("page_components")
        .where({ id: page_components_id })
        .first();
      const order = page_components.order;
      const all = await base("page_components").where({ page_id }).select("*");
      const next = all
        .filter((c) => c.order > order)
        .reduce((a, b) => (a.order < b.order ? a : b));
      if (next) {
        await base("page_components")
          .where({ id: page_components_id })
          .update({ order: order + 1 });
        await base("page_components").where({ id: next.id }).update({ order });
      }
    } catch (e) {
      console.error(e);
    }

    return redirect(302, url.pathname);
  },
};

const getProps = (data) => {
  return Object.fromEntries(
    [...data]
      .filter(([key]) => key.startsWith("prop_"))
      .map(([key, value]) => [key.replace("prop_", ""), value])
  );
};

const getChildren = (data) => {
  return [...data]
    .filter(([key]) => key.startsWith("slot_"))
    .map(([key, value]) => {
      return { [key.replace("slot_", "")]: value };
    });
};
