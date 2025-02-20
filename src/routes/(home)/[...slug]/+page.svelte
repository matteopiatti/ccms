<script>
  const { data } = $props();
  //console.log(data);
</script>

<svelte:head>
  <title>{data.metadata.title}</title>
  <meta name="description" content={data.metadata.description} />
</svelte:head>

{#each data.components as c}
  {#if Object.keys(c.props).length > 0}
    <c.component.default {...c.props} />
  {:else}
    <c.component.default {...c.props_schema} />
  {/if}
{/each}

<a href="/admin">Back to Admin</a>
