<script>
  import { enhance } from "$app/forms";
  import { ChevronLeft, ChevronDown, ChevronUp, Trash2 } from "lucide-svelte";
  import { Button, buttonVariants } from "$lib/components/ui/button/index.js";
  import { Label } from "$lib/components/ui/label/index.js";
  import { Input } from "$lib/components/ui/input/index.js";
  import * as Dialog from "$lib/components/ui/dialog/index.js";
  import { Separator } from "$lib/components/ui/separator/index.js";
  import { populateComponents } from "$lib";
  import AdminTitle from "$lib/components/admin/AdminTitle.svelte";
  import BlockEditor from "$lib/components/admin/BlockEditor.svelte";

  const { data } = $props();
  const { metadata, components, blocks } = $derived(data);

  let pageDialog = $state({ isOpen: false });
</script>

<div class="hidden flex-col md:flex">
  <div class="border-b">
    <div class="flex h-16 items-center px-4">
      <div class="flex gap-4 items-center">
        <h2 class="text-3xl font-bold tracking-tight">Edit Page</h2>
        <h1 class="text-2xl text-gray-400 font-bold tracking-tight">
          {metadata.title}
        </h1>
      </div>
      <div class="ml-auto">Admin</div>
    </div>
  </div>
</div>

<div class="flex flex-col px-4 py-2 gap-4">
  <div class="flex items-center justify-between py-2">
    <a class={buttonVariants()} href="/admin"><ChevronLeft />Back to Admin</a>
    {@render editPageDialog(pageDialog)}
  </div>

  <AdminTitle title="Add Block" />

  <div class="flex gap-2">
    {#each components as c}
      {@render component(c)}
    {/each}
  </div>
</div>

<BlockEditor {blocks} {components} page_id={metadata.id} />

{#snippet block(b)}
  <div
    class="flex flex-col gap-2 justify-between p-4 bg-white hover:bg-slate-50 border rounded-lg shadow-sm"
  >
    <AdminTitle title={b.name} size="xl">
      <form method="POST" action="?/moveUp" use:enhance>
        <input type="hidden" name="page_id" value={metadata.id} />
        <input
          type="hidden"
          name="page_components_id"
          value={b.page_components_id}
        />
        <Button type="submit" variant="outline">
          <ChevronUp />
        </Button>
      </form>
    </AdminTitle>

    <div>
      {#if b.children.length > 0}
        <p>nia</p>
        {@render renderComponent(components, b.id, b.props, b.children)}
      {:else}
        {@render renderComponent(components, b.id, b.props)}
      {/if}

      {#if b.children.length > 0}
        <h2 class="text-lg font-bold">Children</h2>
        <div class="grid gap-4 p-4 text-sm">
          {#each b.children as c}
            {@render block(c)}
          {/each}
        </div>
      {/if}
    </div>

    <form
      class="flex flex-col gap-2 items-start"
      method="POST"
      action="?/props"
      use:enhance
    >
      <h3 class="text-lg font-bold">Edit Block</h3>
      <input type="hidden" name="component_id" value={b.id} />
      <input type="hidden" name="page_id" value={metadata.id} />
      <input
        type="hidden"
        name="page_components_id"
        value={b.page_components_id}
      />

      {#each b.props_schema as prop}
        {#if prop.type === "slot"}
          <Label class="flex flex-col gap-2">
            children
            <select name="slot_{prop.name}" value={prop.value}>
              {#each components as c}
                <option value={c.id}>{c.name}</option>
              {/each}
            </select>
          </Label>
        {:else if prop.type === "string"}
          <Label class="flex flex-col gap-2">
            {prop.name}
            <Input name="prop_{prop.name}" value={b.props[prop.name]} />
          </Label>
        {:else if prop.type === "color"}
          <Label class="flex flex-col gap-2">
            {prop.name}
            <Input
              name="prop_{prop.name}"
              type="color"
              value={b.props[prop.name] ? b.props[prop.name] : prop.default}
            />
          </Label>
        {/if}
      {/each}
      <Button type="submit">Save</Button>
    </form>

    <div class="flex items-center py-2">
      <div class="flex items-center justify-end py-2">
        <form method="POST" action="?/delete" use:enhance>
          <input
            type="hidden"
            name="page_components_id"
            value={b.page_components_id}
          />
          <Button type="submit" variant="destructive">
            <Trash2 /> Delete
          </Button>
        </form>
      </div>
    </div>

    <div class="flex items-center justify-end py-2">
      <form method="POST" action="?/moveDown" use:enhance>
        <input type="hidden" name="page_id" value={metadata.id} />
        <input
          type="hidden"
          name="page_components_id"
          value={b.page_components_id}
        />
        <Button type="submit" variant="outline">
          <ChevronDown />
        </Button>
      </form>
    </div>
  </div>
{/snippet}

{#snippet renderComponent(c, id, props, children)}
  {#each c as component}
    {#if component.id === id}
      <component.component.default {...props}>
        {#each children as child}
          {@render renderComponent(c, child.id, child.props, child.children)}
        {/each}
      </component.component.default>
    {/if}
  {/each}
{/snippet}

{#snippet component(c)}
  <form action="?/add" method="POST" use:enhance>
    <input type="hidden" name="page_id" value={metadata.id} />
    <input type="hidden" name="component_id" value={c.id} />
    <Button type="submit" class="flex items-center gap-2">
      {c.name}
    </Button>
  </form>
{/snippet}

{#snippet editPageDialog(state)}
  <Dialog.Root bind:open={state.isOpen}>
    <Dialog.Trigger class={buttonVariants({ variant: "outline" })}>
      Edit Page
    </Dialog.Trigger>
    <Dialog.Content>
      <form
        method="POST"
        action="?/editMetadata"
        use:enhance={() => {
          state.isOpen = false;
        }}
      >
        <Dialog.Header>
          <Dialog.Title>Edit Page</Dialog.Title>
          <Dialog.Description>Edit existing page metadata</Dialog.Description>
        </Dialog.Header>

        <div class="grid gap-4 py-4">
          <input type="hidden" name="id" value={metadata.id} />
          <Label class="flex flex-col gap-2">
            Page title
            <Input name="title" class="col-span-3" value={metadata.title} />
          </Label>
          <Label class="flex flex-col gap-2">
            Slug
            <Input name="slug" class="col-span-3" value={metadata.slug} />
          </Label>
          <Label class="flex flex-col gap-2">
            Content
            <Input name="content" class="col-span-3" value={metadata.content} />
          </Label>
        </div>

        <Dialog.Footer>
          <Button type="submit">Edit page</Button>
        </Dialog.Footer>
      </form>
    </Dialog.Content>
  </Dialog.Root>
{/snippet}
