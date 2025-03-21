<script>
  import { BlockElements } from ".";

  const { block = {}, dir } = $props();
  let BLOCK = $state();
  const filename = block.component?.filename || block.filename;

  $effect(async () => {
    BLOCK = (await import(/* @vite-ignore */ dir + "/" + filename)).default;
  });

  const propGenerator = () => {
    const props = {};
    if (!block.props) return;
    block.props.forEach((prop) => {
      props[prop.name] = prop.value;
    });
    return props;
  };
</script>

{#if BLOCK}
  <BLOCK {...propGenerator()}>
    {#each block.children as child}
      <BlockElements.Block block={child} {dir} />
    {/each}
  </BLOCK>
{/if}
