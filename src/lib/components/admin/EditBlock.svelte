<script>
  import Label from "../ui/label/label.svelte";
  import Input from "../ui/input/input.svelte";
  import EditBlock from "./EditBlock.svelte";
  import ColorPicker from "./ColorPicker.svelte";
  import AdminInput from "./AdminInput.svelte";
  import { SquarePen, X, Trash2, ChevronDown, ChevronUp } from "lucide-svelte";
  import { enhance } from "$app/forms";
  import { Button } from "../ui/button/index.js";
  import AdminFormButton from "./AdminFormButton.svelte";
  import AddBlock from "./AddBlock.svelte";

  let {
    block = {},
    components = [],
    page_id,
    current = $bindable(),
  } = $props();
  let BLOCK = $state();
  let isEdit = $derived(current === block.id);

  $effect(async () => {
    BLOCK = (await import(/* @vite-ignore */ "/" + block.component.filename))
      .default;
  });

  const propGenerator = () => {
    const props = {};
    block.props.forEach((prop) => {
      props[prop.name] = prop.default;
    });
    return props;
  };
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
    <BLOCK {...propGenerator()}>
      {#each block.children as child}
        <EditBlock block={child} {page_id} bind:current />
      {/each}
    </BLOCK>
  {/if}

  {#if isEdit}
    <div class="flex items-end gap-4 p-4 bg-white text-black">
      {@render editForm(block, page_id)}
      {#if block.component.props.some((prop) => prop.name === "children")}
        <AddBlock {components} {page_id} parent_block={block.id} />
      {/if}
      <div class="ml-auto flex gap-2">
        {@render moveButton("up", block.id)}
        <AdminFormButton
          action="?/delete"
          variant="destructive"
          hiddenFields={[{ name: "id", value: block.id }]}
        >
          <Trash2 /> Delete
        </AdminFormButton>
        {@render moveButton("down", block.id)}
      </div>
    </div>
  {/if}
</div>

{#snippet editForm(block, page_id, id)}
  <form
    class="flex flex-col gap-2 items-start"
    method="POST"
    action="?/props"
    use:enhance
  >
    <input type="hidden" name="page_id" value={page_id} />
    <input type="hidden" name="id" value={block.id} />
    <input type="hidden" name="component_id" value={block.component_id} />
    {#each block.component.props as prop}
      <input type="hidden" name="{prop.name}[name]" value={prop.name} />
      <input type="hidden" name="{prop.name}[id]" value={prop.id} />
      {#if prop.prop_type === "color"}
        <ColorPicker
          name="{prop.name}[value]"
          title={prop.title}
          value={block.props.find((p) => p.name === prop.name) || prop.default}
        />
      {:else}
        <AdminInput
          title={prop.title}
          name="{prop.name}[value]"
          value={block.props.find((p) => p.name === prop.name)?.default ||
            prop.default}
        />
      {/if}
    {/each}
    <Button type="submit">Save</Button>
  </form>
{/snippet}

{#snippet moveButton(dir, block_id)}
  <AdminFormButton
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
  </AdminFormButton>
{/snippet}
