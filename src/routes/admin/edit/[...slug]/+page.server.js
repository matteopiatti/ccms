import { redirect } from "@sveltejs/kit";
import { base } from "$lib/knex";
import {
  getPageComponents,
  deletePageComponent,
  createPageComponent,
  getAllComponents,
  getPage,
  editPage,
  editPageComponent,
  movePageComponent,
  Pages,
  Components,
  Blocks,
} from "$lib";

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
    const { page_id, id, component_id, ...leftovers } = Object.fromEntries(
      await request.formData()
    );
    let finishedProps = [];
    const props = cleanProps(leftovers);
    const defaultProps = await Components.SHOW(component_id);

    Object.entries(props).forEach(([key, prop]) => {
      const defaultProp = defaultProps.props.find((p) => p.name === prop.name);
      finishedProps.push({
        name: prop.name,
        title: defaultProp.title,
        prop_type: defaultProp.prop_type,
        default: prop.value,
        description: defaultProp.description,
      });
    });

    console.log(finishedProps);
    return;

    const req = await Blocks.UPDATE(id, {
      name: block.name,
      component_id: block.component_id,
      page_id,
      parent_block_id: block.parent_block_id,
      props: Object.entries(props).map(([key, value]) => ({
        name: key,
        default: value,
      })),
    });
    console.log(req);
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
    console.log(req);

    return { success: true };
  },
};

const cleanProps = (props) => {
  return Object.entries(props).reduce(function (r, e) {
    const [a, i] = e[0].split(/\[(.*?)\]/g);
    if (!r[a]) r[a] = {};
    r[a][i] = e[1];
    return r;
  }, []);
};
