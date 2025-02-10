import { redirect } from "@sveltejs/kit";
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
  //console.log(components);

  return {
    pageData: page,
    components,
  };
};

export const actions = {
  pageData: async ({ locals, request }) => {
    const db = locals.db;
    const data = await request.formData();
    const content = data.get("content");
    const slug = data.get("slug");
    const title = data.get("title");
    const id = data.get("id");
    return redirect(302, `/admin/edit/${slug}`);
  },
  props: async ({ request }) => {
    const data = await request.formData();
    const component = data.get("component");
    const props = data.get("props");
    return redirect(302, `/admin`);
  },
};
