<script>
  import { BlockElements, LayoutElements } from ".";

  const { blocks = [], components = [], page_id } = $props();
  let current = $state(null);
</script>

<div class="flex flex-col px-4 py-2 gap-4">
  <LayoutElements.Title title="Page Template" />

  <div>
    {#each blocks as block}
      <BlockElements.EditBlock {block} {components} {page_id} bind:current />
    {/each}
    <BlockElements.AddBlock {components} {page_id} />
  </div>
</div>
