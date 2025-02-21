import { base } from "$lib/knex";
import { getAllComponents, getAllPages, createPage, deletePage } from "$lib";

export const load = async ({ locals }) => {
  return {
    pages: await getAllPages(base),
    blocks: await getAllComponents(base),
  };
};

export const actions = {
  createPage: async ({ request }) => {
    const data = await request.formData();
    createPage(base, data.get("title"), data.get("slug"), data.get("content"));
  },
  deletePage: async ({ request }) => {
    const data = await request.formData();
    deletePage(base, data.get("id"));
  },
};
