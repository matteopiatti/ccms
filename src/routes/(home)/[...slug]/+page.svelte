<script>
  import Block from "$lib/components/admin/Block.svelte";
  const { data } = $props();
  const { page, blocks } = $derived(data.pageData);
</script>

<svelte:head>
  <title>{page.title}</title>
  <meta name="description" content={page.description} />
</svelte:head>

{#each blocks as block}
  <Block {block} />
{/each}

<a href="/admin">Back to Admin</a>
