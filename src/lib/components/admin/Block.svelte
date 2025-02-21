<script>
  import Block from "./Block.svelte";

  const { block = {} } = $props();
  let BLOCK = $state();

  $effect(async () => {
    BLOCK = (await import(/* @vite-ignore */ "/" + block.url)).default;
  });
</script>

{#if BLOCK}
  <BLOCK {...block.props}>
    {#each block.children as child}
      <Block block={child} />
    {/each}
  </BLOCK>
{/if}
