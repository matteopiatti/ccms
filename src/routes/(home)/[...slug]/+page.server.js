import { Pages } from "$lib";
import { getCurrentFolder } from "$lib/utils.js";

export const load = async ({ locals, params }) => {
  return {
    page: await Pages.SHOW(params.slug),
    blockDirectory: getCurrentFolder(),
  };
};
