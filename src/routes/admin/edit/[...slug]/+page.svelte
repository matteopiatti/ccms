<script>
  import { enhance } from "$app/forms";
  import { ChevronLeft, ChevronDown, ChevronUp, Trash2 } from "lucide-svelte";
  import { Button, buttonVariants } from "$lib/components/ui/button/index.js";
  import EditDialog from "$lib/components/admin/EditDialog.svelte";
  import { Label } from "$lib/components/ui/label/index.js";
  import { Input } from "$lib/components/ui/input/index.js";
  import { Separator } from "$lib/components/ui/separator/index.js";
  import { populateComponents } from "$lib";
  import AdminTitle from "$lib/components/admin/AdminTitle.svelte";
  import BlockEditor from "$lib/components/admin/BlockEditor.svelte";
  import Header from "$lib/components/admin/Header.svelte";
  import AdminInput from "$lib/components/admin/AdminInput.svelte";

  const { data } = $props();
  const { metadata, components, blocks } = $derived(data);

  let isOpen = $state(false);
</script>

<Header title="Edit Page" subtitle={metadata.title} name="Admin" />

<div class="flex flex-col px-4 py-2 gap-4">
  <div class="flex items-center justify-between py-2">
    <a class={buttonVariants()} href="/admin"><ChevronLeft />Back to Admin</a>
    <EditDialog
      bind:isOpen
      name="Edit Page"
      description="Edit existing page metadata"
      submit="Save"
      action="?/editMetadata"
    >
      <input type="hidden" name="id" value={metadata.id} />
      <AdminInput title="Page title" name="title" value={metadata.title} />
      <AdminInput title="Slug" name="slug" value={metadata.slug} />
      <AdminInput title="Content" name="content" value={metadata.content} />
    </EditDialog>
  </div>

  <AdminTitle title="Add Block" />

  <div class="flex gap-2">
    {#each components as c}
      <form action="?/add" method="POST" use:enhance>
        <input type="hidden" name="page_id" value={metadata.id} />
        <input type="hidden" name="component_id" value={c.id} />
        <Button type="submit" class="flex items-center gap-2">
          {c.name}
        </Button>
      </form>
    {/each}
  </div>
</div>

<BlockEditor {blocks} {components} page_id={metadata.id} />
