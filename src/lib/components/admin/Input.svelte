<script>
  import Label from "../ui/label/label.svelte";
  import Input from "../ui/input/input.svelte";

  let {
    title,
    name,
    value = $bindable(),
    type = "text",
    error = undefined,
  } = $props();
</script>

<Label class="flex flex-col gap-2">
  {title}
  <Input {type} {name} bind:value />
  <p class="text-red-500">{error}</p>
</Label>
