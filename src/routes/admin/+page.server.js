import { Blocks, Pages, Components } from "$lib";
import { fail } from "@sveltejs/kit";
import { getCurrentFolder } from "$lib/utils.js";

export const load = async ({ locals }) => {
  return {
    pages: await Pages.GET(),
    components: await Components.GET(),
    blockDirectory: getCurrentFolder(),
  };
};

export const actions = {
  createPage: async ({ request }) => {
    const { title, slug } = Object.fromEntries(await request.formData());
    return await Pages.POST({ title, slug });
  },
  deletePage: async ({ request }) => {
    const { id } = Object.fromEntries(await request.formData());
    return await Pages.DELETE(id);
  },
};
