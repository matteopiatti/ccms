<script>
  import { enhance } from "$app/forms";
  import { ChevronLeft, ChevronDown, ChevronUp, Trash2 } from "lucide-svelte";
  import { Button, buttonVariants } from "$lib/components/ui/button/index.js";
  import EditDialog from "$lib/components/admin/EditDialog.svelte";
  import { Label } from "$lib/components/ui/label/index.js";
  import { Input } from "$lib/components/ui/input/index.js";
  import { Separator } from "$lib/components/ui/separator/index.js";
  import AdminTitle from "$lib/components/admin/AdminTitle.svelte";
  import BlockEditor from "$lib/components/admin/BlockEditor.svelte";
  import Header from "$lib/components/admin/Header.svelte";
  import AdminInput from "$lib/components/admin/AdminInput.svelte";
  import AdminFormButton from "$lib/components/admin/AdminFormButton.svelte";

  const { data, form } = $props();
  //console.log(data.page.page);
</script>

<Header title="Edit Page" subtitle={data.page.title} name="Admin" />

<div class="flex flex-col px-4 py-2 gap-4">
  <div class="flex items-center justify-between py-2">
    <a class={buttonVariants()} href="/admin"><ChevronLeft />Back to Admin</a>
    <EditDialog
      name="Edit Page"
      description="Edit existing page metadata"
      submit="Save"
      action="?/editMetadata"
    >
      <input type="hidden" name="id" value={data.page.id} />
      <AdminInput
        title="Page title"
        name="title"
        value={data.page.title}
        error={form?.title}
      />
      <AdminInput
        title="Slug"
        name="slug"
        value={data.page.slug}
        error={form?.slug}
      />
    </EditDialog>
  </div>
</div>

<BlockEditor
  blocks={data.page.blocks}
  components={data.components}
  page_id={data.page.id}
/>
