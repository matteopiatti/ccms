import { Pages } from "$lib";

export const load = async ({ locals, params }) => {
  return {
    pageData: await Pages.SHOW(params.slug),
  };
};
