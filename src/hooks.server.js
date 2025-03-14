import * as COMPONENTS from "$lib/components";
import { Components } from "$lib";

syncComponents();

async function syncComponents() {
  Object.entries(COMPONENTS).forEach(async ([name, value]) => {
    const filenameSymbol = Object.getOwnPropertySymbols(value).find(
      (sym) => sym.toString() === "Symbol(filename)"
    );
    const filename = value[filenameSymbol];
    const metadata =
      (
        await import(
          /* @vite-ignore */ `./lib/components/${filename.split("/").pop()}`
        )
      ).metadata || [];

    try {
      const test = await Components.POST({
        name,
        filename,
        schema: metadata?.props,
        children: metadata?.children,
      });
    } catch (e) {
      console.error(e);
    }
  });

  return true;
}
