<script>
  const { title, subtitle, name } = $props();
</script>

<div class="hidden flex-col md:flex">
  <div class="border-b">
    <div class="flex h-16 items-center px-4">
      <div class="flex gap-4 items-center">
        <h2 class="text-3xl font-bold tracking-tight">{title}</h2>
        <h1 class="text-2xl text-gray-400 font-bold tracking-tight">
          {subtitle}
        </h1>
      </div>
      <div class="ml-auto">{name}</div>
    </div>
  </div>
</div>
