import { redirect } from "@sveltejs/kit";
import { Pages, Components, Blocks, Props } from "$lib";

export const load = async ({ locals, params }) => {
  const page = await Pages.SHOW(params.slug);

  if (page.error) {
    return redirect(302, "/admin");
  }

  return {
    page,
    components: await Components.GET(),
  };
};

export const actions = {
  editMetadata: async ({ locals, request }) => {
    const { id, title, slug } = Object.fromEntries(await request.formData());
    const req = await Pages.UPDATE(id, { title, slug });

    if (req.status === 200) {
      return redirect(302, `/admin/edit/${slug}`);
    } else {
      return req;
    }
  },
  props: async ({ request, url }) => {
    const { id, ...leftovers } = Object.fromEntries(await request.formData());
    const props = cleanProps(leftovers);
    await Promise.all(
      props.map(async ({ isNew, id: propId, ...prop }) => {
        delete prop.isNew;
        return isNew === "true"
          ? Props.POST({ ...prop, block_id: id, default_prop_id: propId })
          : Props.UPDATE(propId, prop);
      })
    );
    return { success: true };
  },
  delete: async ({ request, url }) => {
    const { id } = Object.fromEntries(await request.formData());
    const req = await Blocks.DELETE(id);
    return { success: true };
  },
  add: async ({ request, url }) => {
    const { page_id, component_id, parent_block_id } = Object.fromEntries(
      await request.formData()
    );
    const component = await Components.SHOW(component_id);

    const req = await Blocks.POST({
      page_id,
      name: component.name,
      component_id,
      parent_block_id,
      props: [],
    });

    return { success: true };
  },
  move: async ({ request, url }) => {
    const { id, direction } = Object.fromEntries(await request.formData());

    const req = await Blocks.MOVE(id, direction);

    return { success: true };
  },
};

const cleanProps = (props) => {
  const result = [];

  for (const [key, value] of Object.entries(props)) {
    const [propName, attribute] = key.match(/(.*?)\[(.*?)\]/).slice(1);
    if (!result[propName]) result[propName] = {};
    result[propName][attribute] = value;
  }

  return Object.values(result);
};
