<script>
  import { BlockElements } from "$lib/components/admin";
  const { data } = $props();
  const { page } = $derived(data);
</script>

<svelte:head>
  <title>{page.title}</title>
  <meta name="description" content={page.description} />
</svelte:head>

{#each page.blocks as block}
  <BlockElements.Block {block} />
{/each}

<a href="/admin">Back to Admin</a>
