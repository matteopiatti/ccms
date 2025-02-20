export const load = async ({ data }) => {
  const components = await Promise.all(
    data.components.map(async (c) => {
      const component = await import("/" + c.url);
      return { ...c, component };
    })
  );

  return {
    components,
    metadata: data.metadata,
  };
};
