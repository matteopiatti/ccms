<script>
  import { Plus } from "lucide-svelte";
  let { title, name, value } = $props();
  let label = $state();

  const colors = $state([
    "#fb2c36",
    "#ff6900",
    "#ffba00",
    "#7ccf00",
    "#00c951",
    "#00bba7",
    "#00a6f4",
    "#2b7fff",
    "#ad46ff",
    "#e12afb",
    "#ff2056",
    "#62748e",
    "#71717b",
    "#737373",
    "#000",
    "#fff",
  ]);
</script>

<input type="hidden" id="color" {name} bind:value />

<div class="flex flex-col gap-4">
  <label for="color" bind:this={label}>{title}</label>
  <div class="flex gap-2">
    {#each colors as color}
      <button
        type="button"
        class={`
          w-8 h-8 rounded cursor-pointer transition-all hover:opacity-75 hover:outline-blue-500 hover:outline outline-2 outline-offset-2
          ${value === color ? "outline outline-blue-500" : ""}
        `}
        style="background-color: {color}"
        onclick={() => (value = color)}
        aria-label="Select color {color}"
      ></button>
    {/each}
  </div>
</div>
