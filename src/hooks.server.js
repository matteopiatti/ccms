import { base, migrate } from "$lib/knex";
import { seed } from "$lib/faker";
import * as COMPONENTS from "$lib/components";
import { Components } from "$lib";

//await migrate();
syncComponents();
//await seed();

async function syncComponents() {
  Object.entries(COMPONENTS).forEach(async ([name, value]) => {
    const filenameSymbol = Object.getOwnPropertySymbols(value).find(
      (sym) => sym.toString() === "Symbol(filename)"
    );
    const filename = value[filenameSymbol];
    const schema =
      (
        await import(
          /* @vite-ignore */ `./lib/components/${filename.split("/").pop()}`
        )
      ).metadata?.props || [];

    try {
      //TODO: should check if exists and update info if it does
      const test = await Components.POST({ name, filename, schema });
    } catch (e) {
      console.error(e);
    }
  });

  return true;
}
