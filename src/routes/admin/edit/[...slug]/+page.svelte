<script>
  const { data } = $props();
  console.log(data);
</script>

<form method="POST" action="?/pageData">
  <label>
    Page Title
    <input type="text" name="title" value={data.pageData.title} />
  </label>
  <label>
    Slug
    <input type="text" name="slug" value={data.pageData.slug} />
  </label>
  <label>
    Page Content
    <textarea name="content">{data.pageData.content}</textarea>
  </label>
  <input type="hidden" name="id" value={data.pageData.id} />
  <button type="submit">Edit Page</button>
</form>

{#each data.components as c}
  <c.component.default />
  <h5>Props</h5>
  <form method="POST" action="?/props">
    <input type="hidden" name="component" value={c.name} />
    {#each JSON.parse(c.props) as p}
      <label>
        {p.name}
        <input type="text" name={p.name} value={p.value} />
      </label>
    {/each}
    <button type="submit">Update Props</button>
  </form>
{/each}