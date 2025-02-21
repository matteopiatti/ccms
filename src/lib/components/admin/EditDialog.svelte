<script>
  import * as Dialog from "$lib/components/ui/dialog/index.js";
  import { Button, buttonVariants } from "$lib/components/ui/button/index.js";
  import { enhance } from "$app/forms";

  let {
    isOpen = $bindable(),
    name,
    description,
    submit,
    children,
    action,
  } = $props();
</script>

<Dialog.Root bind:open={isOpen}>
  <Dialog.Trigger class={buttonVariants({ variant: "outline" })}>
    {name}
  </Dialog.Trigger>
  <Dialog.Content>
    <form
      method="POST"
      {action}
      use:enhance={() => {
        isOpen = false;
      }}
    >
      <Dialog.Header>
        <Dialog.Title>{name}</Dialog.Title>
        <Dialog.Description>{description}</Dialog.Description>
      </Dialog.Header>

      <div class="grid gap-4 py-4">
        {@render children()}
      </div>

      <Dialog.Footer>
        <Button type="submit">{submit}</Button>
      </Dialog.Footer>
    </form>
  </Dialog.Content>
</Dialog.Root>
