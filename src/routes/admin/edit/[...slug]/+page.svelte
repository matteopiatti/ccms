<script>
  import { ChevronLeft } from "lucide-svelte";
  import { buttonVariants } from "$lib/components/ui/button/index.js";
  import { LayoutElements, BlockElements } from "$lib/components/admin";

  const { data, form } = $props();
</script>

<LayoutElements.Header
  title="Edit Page"
  subtitle={data.page.title}
  name="Admin"
/>

<div class="flex flex-col px-4 py-2 gap-4">
  <div class="flex items-center justify-between py-2">
    <a class={buttonVariants()} href="/admin"><ChevronLeft />Back to Admin</a>
    <LayoutElements.EditDialog
      name="Edit Page"
      description="Edit existing page metadata"
      submit="Save"
      action="?/editMetadata"
    >
      <input type="hidden" name="id" value={data.page.id} />
      <LayoutElements.Input
        title="Page title"
        name="title"
        value={data.page.title}
        error={form?.title}
      />
      <LayoutElements.Input
        title="Slug"
        name="slug"
        value={data.page.slug}
        error={form?.slug}
      />
    </LayoutElements.EditDialog>
  </div>
</div>

<BlockElements.BlockEditor
  blocks={data.page.blocks}
  components={data.components}
  page_id={data.page.id}
/>
