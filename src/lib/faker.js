import { base } from "$lib/knex";
import { faker } from "@faker-js/faker";

async function fakePages(num) {
  if (await base.schema.hasTable("pages")) {
    await base("pages").truncate();
    const content = Array.from({ length: num }, () => ({
      content: faker.lorem.paragraph(),
      slug: faker.lorem.slug({ min: 1, max: 3 }),
      title: faker.food.dish(),
    }));
    await base("pages").insert(content);
  }
}

async function fakePageComponents() {
  if (await base.schema.hasTable("page_components")) {
    await base("page_components").truncate();
    const pages = await base("pages").select("id");
    const components = await base("components").select("id");
    const pageComponents = pages.flatMap((page) => {
      let order = 0;
      const componentsTwice = components.concat(components);
      return componentsTwice.map((component) => ({
        page_id: page.id,
        component_id: component.id,
        parent_component_id: null,
        props: JSON.stringify({}),
        order: order++,
      }));
    });
    await base("page_components").insert(pageComponents);
  }
}

export const seed = async () => {
  console.log("Seeding pages");
  // create 10 pages
  await fakePages(4);
  await fakePageComponents();
};
