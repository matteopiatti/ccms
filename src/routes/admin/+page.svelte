<script>
  let { data } = $props();
  //console.log(data)
</script>

<h1>Pages</h1>
{#each data.pages as p }
  <div>
    <h2>{p.title}</h2>
    <p>{p.content}</p>
    {#each p.components as c }
    {/each}
    <a href="/admin/edit/{p.slug}">Edit</a>
    <a href="/{p.slug}">visit</a>
  </div>
{/each}

<h1>Components</h1>
{#each data.components as c }
  <div>
    <h2>{c.name}</h2>
    <c.component.default clickAction={() => {console.log('asdf')}} />
  </div>
{/each}

<form method="POST">
  <label>
    Page Title
    <input type="text" name="title" />
  </label>
  <label>
    Slug
    <input type="text" name="slug" />
  </label>
  <label>
    Page Content
    <textarea name="content"></textarea>
  </label>
  <select name="components" multiple>
    {#each data.components as c }
      <option value={c.id}>{c.name}</option>
    {/each}
  </select>
  <button type="submit">Create Page</button>
  </form>