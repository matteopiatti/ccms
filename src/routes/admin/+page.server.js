import { base } from "$lib/knex";

export const load = async ({ locals }) => {
  const pages = await base("pages");
  const components = await base("components");

  pages.forEach(async (page) => {
    const pageComponents = await base("page_components")
      .join("components", "page_components.component_id", "components.id")
      .where("page_components.page_id", page.id)
      .select("components.*");
    page.components = pageComponents;
  });

  return {
    pages,
    components,
  };
};

export const actions = {
  default: async ({ locals, request }) => {
    const data = await request.formData();
    const content = data.get("content");
    const slug = data.get("slug");
    const title = data.get("title");
  },
};
