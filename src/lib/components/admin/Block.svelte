<script>
  import Block from "./Block.svelte";

  const { block = {} } = $props();
  let BLOCK = $state();

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

{#if BLOCK}
  <BLOCK {...propGenerator()}>
    {#each block.children as child}
      <Block block={child} />
    {/each}
  </BLOCK>
{/if}
