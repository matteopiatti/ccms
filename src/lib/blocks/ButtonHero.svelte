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
      {
        name: "content",
        title: "Content",
        prop_type: "string",
        default: "This is the hero content.",
        description: "The content of the hero section.",
      },
    ],
    children: true,
  };
</script>

<script>
  const {
    title = "Welcome to the site!",
    content = "This is the hero content.",
    children = () => [],
  } = $props();
</script>

<div class="hero">
  <h1>{title}</h1>
  <p>{content}</p>
  {@render children()}
</div>

<style>
  .hero {
    background-color: #787878;
    color: white;
    padding: 2rem;
    text-align: center;
  }
</style>
