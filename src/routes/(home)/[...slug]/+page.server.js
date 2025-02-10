import { base } from "$lib/knex";

export const load = async ({ locals, params }) => {
  const slug = params.slug;
  const page = await base("pages").where({ slug }).first();
  const components =
    (await base("page_components")
      .join("components", "page_components.component_id", "components.id")
      .join("pages", "page_components.page_id", "pages.id")
      .where("pages.slug", slug)
      .select("components.*")) || [];

  return {
    page,
    components,
  };
};
