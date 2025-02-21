<script>
  import { enhance } from "$app/forms";
  import Button from "../ui/button/button.svelte";

  const { action, children, variant = "default", hiddenFields = [] } = $props();
</script>

<form method="POST" {action} use:enhance>
  {#each hiddenFields as { name, value }}
    <input type="hidden" {name} {value} />
  {/each}
  <Button type="submit" {variant}>
    {@render children()}
  </Button>
</form>
