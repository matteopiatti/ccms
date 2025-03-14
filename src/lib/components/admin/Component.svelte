<script>
  import Component from "./Component.svelte";

  const { component = {} } = $props();
  let COMPONENT = $state();

  $effect(async () => {
    COMPONENT = (await import(/* @vite-ignore */ "/" + component.filename))
      .default;
  });
</script>

{#if COMPONENT}
  <COMPONENT {...component.props}>
    {#each component.children as child}
      <Component component={child} />
    {/each}
  </COMPONENT>
{/if}
