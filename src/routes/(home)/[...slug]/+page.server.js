import { Pages } from "$lib";

export const load = async ({ locals, params }) => {
  // testing changes
  return {
    page: await Pages.SHOW(params.slug),
  };
};
