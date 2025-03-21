<script>
  import { SquarePen, X, Trash2, ChevronDown, ChevronUp } from "lucide-svelte";
  import { enhance } from "$app/forms";
  import { Button } from "../ui/button/index.js";
  import { BlockElements, LayoutElements } from ".";

  let {
    block = {},
    components = [],
    page_id,
    current = $bindable(),
    dir,
  } = $props();
  let BLOCK = $state();
  let isEdit = $derived(current === block.id);

  $effect(async () => {
    BLOCK = (
      await import(/* @vite-ignore */ dir + "/" + block.component.filename)
    ).default;
  });
</script>

<div class="relative" class:z-50={isEdit}>
  <div class="w-full h-full absolute group" class:pointer-events-none={isEdit}>
    <button
      onclick={() => (current = isEdit ? null : block.id)}
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
    <BLOCK
      {...Object.fromEntries(
        block.props.map((prop) => [prop.name, prop.value])
      )}
    >
      {#each block.children as child}
        <BlockElements.EditBlock
          block={child}
          {components}
          {page_id}
          bind:current
          {dir}
        />
      {/each}
    </BLOCK>
  {/if}

  {#if isEdit}
    <div class="flex items-end gap-4 p-4 bg-white text-black">
      <form
        class="flex flex-col gap-2 items-start"
        method="POST"
        action="?/props"
        use:enhance={() => {
          current = null;
        }}
      >
        <input type="hidden" name="id" value={block.id} />
        {#each block.component.default_props as defaultProp}
          <BlockElements.PropFormElement
            {defaultProp}
            prop={block.props.find((p) => p.default_prop_id === defaultProp.id)}
          />
        {/each}
        <Button type="submit">Save</Button>
      </form>
      {#if block.component.children}
        <BlockElements.AddBlock
          {components}
          {page_id}
          parent_block={block.id}
        />
      {/if}
      <div class="ml-auto flex gap-2">
        {@render moveButton("up", block.id)}
        <LayoutElements.FormButton
          action="?/delete"
          variant="destructive"
          hiddenFields={[{ name: "id", value: block.id }]}
        >
          <Trash2 /> Delete
        </LayoutElements.FormButton>
        {@render moveButton("down", block.id)}
      </div>
    </div>
  {/if}
</div>

{#snippet moveButton(dir, block_id)}
  <LayoutElements.FormButton
    action="?/move"
    variant="outline"
    hiddenFields={[
      { name: "id", value: block_id },
      { name: "direction", value: dir },
    ]}
  >
    {#if dir === "up"}
      <ChevronUp />
    {:else}
      <ChevronDown />
    {/if}
  </LayoutElements.FormButton>
{/snippet}
