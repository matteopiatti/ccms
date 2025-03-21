import { Pages } from "$lib";

export const load = async ({ locals, params }) => {
  // this comment is to test update functionality
  return {
    page: await Pages.SHOW(params.slug),
  };
};
