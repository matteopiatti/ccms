<script module>
  export const metadata = {
    props: [
      {
        name: "title",
        title: "Title",
        prop_type: "string",
        default: "Welcome to the site!",
        description: "The title of the hero section.",
      },
    ],
    children: false,
  };
</script>

<script>
  const { title = "Welcome to the site!" } = $props();
</script>

<div class="title">
  <h1>{title}</h1>
</div>

<style>
  .title {
    font-size: 40px;
    color: black;
    max-width: 60%;
    font-weight: bold;
  }
</style>
