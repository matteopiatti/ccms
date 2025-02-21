<script>
  import EditDialog from "$lib/components/admin/EditDialog.svelte";
  import Block from "$lib/components/admin/Block.svelte";
  import { Button, buttonVariants } from "$lib/components/ui/button/index.js";
  import * as Table from "$lib/components/ui/table/index.js";
  import * as Dialog from "$lib/components/ui/dialog/index.js";
  import AdminInput from "$lib/components/admin/AdminInput.svelte";
  import { Trash2 } from "lucide-svelte";
  import { enhance } from "$app/forms";
  import Header from "$lib/components/admin/Header.svelte";
  import AdminTitle from "$lib/components/admin/AdminTitle.svelte";
  import AdminFormButton from "$lib/components/admin/AdminFormButton.svelte";

  let { data } = $props();
  const { pages, blocks } = $derived(data);
  let isOpen = $state(false);
</script>

<Header title="Pages" name="Admin" />

<div class="flex flex-col px-4 py-2">
  <AdminTitle title="Pages">
    <EditDialog
      bind:isOpen
      name="New Page"
      description="Create a new page"
      submit="Create"
      action="?/createPage"
    >
      <AdminInput title="Page title" name="title" />
      <AdminInput title="Slug" name="slug" />
      <AdminInput title="Content" name="content" />
    </EditDialog>
  </AdminTitle>

  {@render pageTable(pages)}

  <AdminTitle title="Components" />

  <div>
    {#each blocks as block}
      <Block {block} />
    {/each}
  </div>
</div>

{#snippet pageTable(pages)}
  <Table.Root>
    <Table.Header>
      <Table.Row>
        <Table.Head class="w-[250px] font-bold">Title</Table.Head>
        <Table.Head>Content</Table.Head>
        <Table.Head>Slug</Table.Head>
        <Table.Head class="text-right">Actions</Table.Head>
      </Table.Row>
    </Table.Header>
    <Table.Body>
      {#each pages as page}
        {@render pageTableCell(page)}
      {/each}
    </Table.Body>
  </Table.Root>
{/snippet}

{#snippet pageTableCell({ title, content, slug, id })}
  <Table.Row>
    <Table.Cell class="font-bold">{title}</Table.Cell>
    <Table.Cell>{content}</Table.Cell>
    <Table.Cell>/{slug}</Table.Cell>
    <Table.Cell class="text-right">
      <div class="flex flex-row gap-2 justify-end">
        <a href="/admin/edit/{slug}" class={buttonVariants()}>Edit</a>
        <a href={slug} class={buttonVariants({ variant: "outline" })}>Visit</a>
        <AdminFormButton
          action="?/deletePage"
          hiddenFields={[{ name: "id", value: id }]}
          variant="destructive"
        >
          <Trash2 />
        </AdminFormButton>
      </div>
    </Table.Cell>
  </Table.Row>
{/snippet}
