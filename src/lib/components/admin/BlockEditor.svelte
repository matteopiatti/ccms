<script>
  import AdminTitle from "$lib/components/admin/AdminTitle.svelte";
  import EditBlock from "./EditBlock.svelte";

  const { blocks = [], components = [], page_id } = $props();
  console.log("BLOCKS: ", blocks);
</script>

<div class="flex flex-col px-4 py-2 gap-4">
  <AdminTitle title="All Blocks" />

  <div>
    {#each blocks as block}
      <EditBlock {block} {page_id} {components} />
    {/each}
  </div>
</div>
