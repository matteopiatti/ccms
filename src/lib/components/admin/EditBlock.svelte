<script>
  import Label from "../ui/label/label.svelte";
  import Input from "../ui/input/input.svelte";
  import EditBlock from "./EditBlock.svelte";
  import { SquarePen, X, Trash2, ChevronDown, ChevronUp } from "lucide-svelte";
  import { enhance } from "$app/forms";
  import { Button } from "../ui/button/index.js";

  const { block = {}, components = [], page_id } = $props();
  let BLOCK = $state();
  let isEdit = $state(false);

  $effect(async () => {
    BLOCK = (await import(/* @vite-ignore */ "/" + block.url)).default;
  });
</script>

<div class="relative">
  <div class="w-full h-full absolute group" class:pointer-events-none={isEdit}>
    <button
      onclick={() => (isEdit = !isEdit)}
      class:opacity-100={isEdit}
      class="w-full h-full absolute p-2 cursor-pointer z-50 inset-0 opacity-0 group-hover:opacity-100 transition-opacity flex items-start justify-end rounded-lg outline-blue-500 outline outline-2"
    >
      <div
        class="bg-white rounded flex p-1 hover:bg-slate-200 pointer-events-auto"
      >
        {#if isEdit}
          <X class="w-4 h-4 text-blue-500" />
        {:else}
          <SquarePen class="w-4 h-4 text-blue-500" />
        {/if}
      </div>
    </button>
  </div>

  {#if BLOCK}
    <BLOCK {...block.props}>
      {#each block.children as child}
        <EditBlock block={child} {page_id} {components} />
      {/each}
    </BLOCK>
  {/if}

  {#if isEdit}
    <div class="flex items-end gap-4 p-4 bg-white text-black">
      {@render editForm(block, page_id, block.page_components_id)}
      {#if block.props_schema.some((prop) => prop.name === "children")}
        <p>schildrön</p>
        {#each components as component}
          {@render addChild(page_id, component, block.page_components_id)}
        {/each}
      {/if}
      {@render moveButton("Up", page_id, block.page_components_id)}
      {@render deleteButton(block.page_components_id)}
      {@render moveButton("Down", page_id, block.page_components_id)}
    </div>
  {/if}
</div>

{#snippet editForm(block, page_id, page_components_id)}
  <form
    class="flex flex-col gap-2 items-start"
    method="POST"
    action="?/props"
    use:enhance
  >
    <input type="hidden" name="page_id" value={page_id} />
    <input type="hidden" name="component_id" value={block.id} />
    <input type="hidden" name="page_components_id" value={page_components_id} />
    {#each block.props_schema as prop}
      <Label class="flex flex-col gap-2">
        {prop.name}
        <Input name="prop_{prop.name}" value={block.props[prop.name]} />
      </Label>
    {/each}
    <Button type="submit">Save</Button>
  </form>
{/snippet}

{#snippet addChild(page_id, component, parent_id)}
  <form action="?/add" method="POST" use:enhance>
    <input type="hidden" name="page_id" value={page_id} />
    <input type="hidden" name="component_id" value={component.id} />
    <input type="hidden" name="parent_component_id" value={parent_id} />
    <Button type="submit" class="flex items-center gap-2">
      {component.name}
    </Button>
  </form>
{/snippet}

{#snippet deleteButton(page_components_id)}
  <form method="POST" action="?/delete" use:enhance>
    <input type="hidden" name="page_components_id" value={page_components_id} />
    <Button type="submit" variant="destructive">
      <Trash2 /> Delete
    </Button>
  </form>
{/snippet}

{#snippet moveButton(dir, page_id, page_components_id)}
  <form method="POST" action="?/move{dir}" use:enhance>
    <input type="hidden" name="page_id" value={page_id} />
    <input type="hidden" name="page_components_id" value={page_components_id} />
    <Button type="submit" variant="outline">
      {#if dir === "Up"}
        <ChevronUp />
      {:else}
        <ChevronDown />
      {/if}
    </Button>
  </form>
{/snippet}
