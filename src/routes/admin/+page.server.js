import { Blocks, Pages, Components } from "$lib";
import { fail } from "@sveltejs/kit";

export const load = async ({ locals }) => {
  return {
    pages: await Pages.GET(),
    components: await Components.GET(),
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
