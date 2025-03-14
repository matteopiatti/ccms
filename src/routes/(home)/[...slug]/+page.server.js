import { Pages } from "$lib";

export const load = async ({ locals, params }) => {
  return {
    page: await Pages.SHOW(params.slug),
  };
};
