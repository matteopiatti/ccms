<script module>
  export const metadata = {
    props: [
      {
        name: "children",
        title: "Children",
        prop_type: "slot",
        default: "",
        description: "The children of the hero section.",
      },
    ],
  };
</script>

<script>
  const { children = () => [] } = $props();
</script>

<div class="flex flex-col">
  {@render children()}
</div>
