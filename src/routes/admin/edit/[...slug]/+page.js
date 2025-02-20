import { populateComponents } from "$lib";

export const load = async ({ data: { components, metadata, blocks } }) => {
  return {
    components: await populateComponents(components),
    metadata,
    blocks,
  };
};
