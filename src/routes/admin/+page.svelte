<script>
  import { buttonVariants } from "$lib/components/ui/button/index.js";
  import * as Table from "$lib/components/ui/table/index.js";
  import { Trash2 } from "lucide-svelte";
  import { LayoutElements, BlockElements } from "$lib/components/admin";

  let { data, form } = $props();
  const { pages, components } = $derived(data);
</script>

<LayoutElements.Header title="Pages" name="Admin" />

<div class="flex flex-col px-4 py-2">
  <LayoutElements.Title title="Pages">
    <LayoutElements.EditDialog
      name="New Page"
      description="Create a new page"
      submit="Create"
      action="?/createPage"
    >
      <LayoutElements.Input
        title="Page title"
        name="title"
        error={form?.title}
      />
      <LayoutElements.Input title="Slug" name="slug" error={form?.slug} />
    </LayoutElements.EditDialog>
  </LayoutElements.Title>

  {@render pageTable(pages)}

  <LayoutElements.Title title="Components" />

  <div>
    {#each components as component}
      <BlockElements.Block block={component} />
    {/each}
  </div>
</div>

{#snippet pageTable(pages)}
  <Table.Root>
    <Table.Header>
      <Table.Row>
        <Table.Head class="w-[250px] font-bold">Title</Table.Head>
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

{#snippet pageTableCell({ title, slug, id })}
  <Table.Row>
    <Table.Cell class="font-bold">{title}</Table.Cell>
    <Table.Cell>/{slug}</Table.Cell>
    <Table.Cell class="text-right">
      <div class="flex flex-row gap-2 justify-end">
        <a href="/admin/edit/{slug}" class={buttonVariants()}>Edit</a>
        <a href={slug} class={buttonVariants({ variant: "outline" })}>Visit</a>
        <LayoutElements.FormButton
          action="?/deletePage"
          hiddenFields={[{ name: "id", value: id }]}
          variant="destructive"
        >
          <Trash2 />
        </LayoutElements.FormButton>
      </div>
    </Table.Cell>
  </Table.Row>
{/snippet}
