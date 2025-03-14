<script>
  import { Plus } from "lucide-svelte";
  import * as Sheet from "$lib/components/ui/sheet/index.js";
  import { enhance } from "$app/forms";
  import { BlockElements } from ".";

  let { components = [], page_id, parent_block = null } = $props();
  let isOpen = $state(false);
</script>

<Sheet.Root bind:open={isOpen}>
  <Sheet.Trigger class="w-full h-full">
    <button
      class="w-full h-full mt-0.5 p-2 cursor-pointer z-100 inset-0 transition-opacity flex items-center justify-center rounded-lg outline-blue-500 hover:outline hover:bg-slate-200 outline-2"
    >
      <Plus class="w-8 h-8 text-blue-500" />
    </button>
  </Sheet.Trigger>
  <Sheet.Content>
    <Sheet.Header>
      <Sheet.Title>Add new Block</Sheet.Title>
      <Sheet.Description>
        Click on the block below you would like to add to your layout. You can
        change it's position and settings later.
      </Sheet.Description>
      {#each components as block}
        <form
          method="POST"
          action="?/add"
          use:enhance={() => {
            isOpen = false;
          }}
        >
          <input type="hidden" name="page_id" value={page_id} />
          <input type="hidden" name="component_id" value={block.id} />
          <input type="hidden" name="parent_block_id" value={parent_block} />
          <button
            type="submit"
            class="w-full relative h-full mt-0.5 p-2 group z-100 inset-0 transition-opacity flex items-center justify-center rounded-lg outline-blue-500 hover:outline hover:bg-slate-200 outline-2"
          >
            <Plus
              class="w-8 h-8 absolute opacity-0 group-hover:opacity-100 text-blue-500"
            />
            <BlockElements.Block {block} />
          </button>
        </form>
      {/each}
    </Sheet.Header>
  </Sheet.Content>
</Sheet.Root>
