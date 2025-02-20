<script>
  import { Button, buttonVariants } from "$lib/components/ui/button/index.js";
  import * as Table from "$lib/components/ui/table/index.js";
  import * as Dialog from "$lib/components/ui/dialog/index.js";
  import { Label } from "$lib/components/ui/label/index.js";
  import { Input } from "$lib/components/ui/input/index.js";
  import { Trash2 } from "lucide-svelte";
  import { enhance } from "$app/forms";

  let { data } = $props();
  let pageDialog = $state({ isOpen: false });
</script>

<div class="hidden flex-col md:flex">
  <div class="border-b">
    <div class="flex h-16 items-center px-4">
      <h1 class="text-3xl font-bold tracking-tight">CCMS</h1>
      <div class="ml-auto">Admin</div>
    </div>
  </div>
</div>

<div class="flex flex-col px-4 py-2">
  <div class="flex items-center justify-between py-2 border-b">
    <h2 class="text-2xl font-bold">Pages</h2>
    {@render createPageDialog(pageDialog)}
  </div>

  {@render pageTable(data.pages)}

  <div class="flex items-center justify-between py-2 border-b">
    <h2 class="text-2xl font-bold">Components</h2>
  </div>

  {#each data.components as comp}
    {@render component(comp)}
  {/each}
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
        <form method="POST" action="?/deletePage" use:enhance>
          <input type="hidden" name="id" value={id} />
          <Button type="submit" variant="destructive"><Trash2 /></Button>
        </form>
      </div>
    </Table.Cell>
  </Table.Row>
{/snippet}

{#snippet component({ name, component })}
  <div>
    <h2>{name}</h2>
    <component.default />
  </div>
{/snippet}

{#snippet createPageDialog(state)}
  <Dialog.Root bind:open={state.isOpen}>
    <Dialog.Trigger class={buttonVariants({ variant: "outline" })}>
      New Page
    </Dialog.Trigger>
    <Dialog.Content>
      <form
        method="POST"
        action="?/createPage"
        use:enhance={() => {
          state.isOpen = false;
        }}
      >
        <Dialog.Header>
          <Dialog.Title>New Page</Dialog.Title>
          <Dialog.Description>Create a new Page</Dialog.Description>
        </Dialog.Header>

        <div class="grid gap-4 py-4">
          <Label class="flex flex-col gap-2">
            Page title
            <Input name="title" class="col-span-3" />
          </Label>
          <Label class="flex flex-col gap-2">
            Slug
            <Input name="slug" class="col-span-3" />
          </Label>
          <Label class="flex flex-col gap-2">
            Content
            <Input name="content" class="col-span-3" />
          </Label>
        </div>

        <Dialog.Footer>
          <Button type="submit">Create page</Button>
        </Dialog.Footer>
      </form>
    </Dialog.Content>
  </Dialog.Root>
{/snippet}
