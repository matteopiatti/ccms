<script>
  const { data } = $props();
  //onsole.log(data);
</script>

<h1>{data.page.title}</h1>
<p>{data.page.content}</p>

{#each data.components as c}
  <c.component.default />
{/each}

<a href="/admin">Back to Admin</a>