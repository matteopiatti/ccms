<script>
  const { title, size = "2xl", border = false, children } = $props();
</script>

<div class="flex items-center justify-between py-2 {border && 'border-b'}">
  <h2 class="text-{size} font-bold">{title}</h2>
  {@render children?.()}
</div>
