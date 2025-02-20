import { base, migrate } from "$lib/knex";
import { seed } from "$lib/faker";
import * as Components from "$lib/components";

await migrate();
syncComponents();
await seed();

async function syncComponents() {
  await base("page_components").truncate();
  await base("components").truncate();

  Object.entries(Components).forEach(async ([key, value]) => {
    const filenameSymbol = Object.getOwnPropertySymbols(value).find(
      (sym) => sym.toString() === "Symbol(filename)"
    );
    const filename = value[filenameSymbol];
    const props =
      (await import(`./lib/components/${filename.split("/").pop()}`)).metadata
        ?.props || [];

    try {
      await base("components").insert({
        name: key,
        url: filename,
        props_schema: JSON.stringify(props),
      });
    } catch (e) {
      console.error(e);
    }
  });

  return true;
}
