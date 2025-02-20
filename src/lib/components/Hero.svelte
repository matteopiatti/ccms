<script module>
  export const metadata = {
    props: [
      {
        name: "title",
        type: "string",
        default: "Welcome to the site!",
        description: "The title of the hero section.",
      },
      {
        name: "content",
        type: "string",
        default: "This is the hero content.",
        description: "The content of the hero section.",
      },
    ],
  };
</script>

<script>
  const {
    title = "Welcome to the site!",
    content = "This is the hero content.",
  } = $props();
</script>

<div class="hero">
  <h1>{title}</h1>
  <p>{content}</p>
</div>

<style>
  .hero {
    background-color: #333;
    color: white;
    padding: 2rem;
    text-align: center;
  }
</style>
