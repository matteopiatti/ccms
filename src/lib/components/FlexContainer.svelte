<script module>
  export const metadata = {
    props: [],
    children: true,
  };
</script>

<script>
  const { children = () => [] } = $props();
</script>

<div class="flex flex-col">
  {@render children()}
</div>
