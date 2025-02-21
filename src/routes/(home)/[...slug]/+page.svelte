<script>
  import Block from "$lib/components/admin/Block.svelte";
  const { data } = $props();
  const { metadata, blocks } = $derived(data);
</script>

<svelte:head>
  <title>{metadata.title}</title>
  <meta name="description" content={metadata.description} />
</svelte:head>

{#each blocks as block}
  <Block {block} />
{/each}

<a href="/admin">Back to Admin</a>
