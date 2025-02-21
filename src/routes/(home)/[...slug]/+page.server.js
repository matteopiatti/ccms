import { base } from "$lib/knex";

export const load = async ({ locals, params }) => {
  return {
    metadata: await base("pages").where({ slug: params.slug }).first(),
    blocks: await getPageComponents(params.slug),
  };
};

const getPageComponents = async (slug) => {
  const components =
    (await base("page_components")
      .select(
        "page_components.props",
        "page_components.order",
        "page_components.id as page_components_id",
        "components.*"
      )
      .join("components", "page_components.component_id", "components.id")
      .join("pages", "page_components.page_id", "pages.id")
      .where("pages.slug", slug)) || [];

  components.sort((a, b) => a.order - b.order);
  components.map((c) => {
    c.props = JSON.parse(c.props);
    c.props_schema = JSON.parse(c.props_schema);
  });
  return components;
};
