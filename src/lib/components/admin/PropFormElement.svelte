<script>
  import { LayoutElements } from ".";

  const { defaultProp, prop } = $props();
  const definer = $derived(prop || defaultProp);
  console.log(!prop);
  const ComponentMap = {
    color: LayoutElements.ColorPicker,
    string: LayoutElements.Input,
  };
  const PropField = ComponentMap[defaultProp.prop_type] || LayoutElements.Input;
</script>

<input type="hidden" name="{definer.name}[isNew]" value={!prop} />
<input type="hidden" name="{definer.name}[name]" value={definer.name} />
<input type="hidden" name="{definer.name}[id]" value={definer.id} />

<PropField
  name="{definer.name}[value]"
  title={defaultProp.title}
  value={definer.value || definer.default}
/>
