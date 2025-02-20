import { populateComponents } from "$lib";

export const load = async ({ data: { components, pages } }) => {
  return {
    components: await populateComponents(components),
    pages,
  };
};
