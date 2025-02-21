import { base } from "$lib/knex";
import { getPageComponents } from "$lib";

export const load = async ({ locals, params }) => {
  const page = await base("pages").where({ slug: params.slug }).first();
  return {
    metadata: page,
    blocks: await getPageComponents(base, page.id),
  };
};
