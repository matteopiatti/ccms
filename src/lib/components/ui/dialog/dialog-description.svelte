<script>
  import { Dialog as DialogPrimitive } from "bits-ui";
  import { cn } from "$lib/utils.js";

  let {
    ref = $bindable(null),
    class: className,
    children,
    ...restProps
  } = $props();
</script>

<DialogPrimitive.Description
  bind:ref
  class={cn("text-muted-foreground text-sm", className)}
  {...restProps}
>
  {@render children?.()}
</DialogPrimitive.Description>
