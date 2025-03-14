<script>
  import AdminTitle from "$lib/components/admin/AdminTitle.svelte";
  import AddBlock from "./AddBlock.svelte";
  import EditBlock from "./EditBlock.svelte";

  const { blocks = [], components = [], page_id } = $props();
  let current = $state(null);
</script>

<div class="flex flex-col px-4 py-2 gap-4">
  <AdminTitle title="Page Template" />

  <div>
    {#each blocks as block}
      <EditBlock {block} {components} {page_id} bind:current />
    {/each}
    <AddBlock {components} {page_id} />
  </div>
</div>
