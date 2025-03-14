<script module>
  export const metadata = {
    props: [],
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
  {@render children()}
</div>

<style>
  .hero {
    background-color: #a3bda3;
    color: white;
    padding: 2rem;
    text-align: center;
    display: grid;
    grid-template-columns: 1fr 1fr;
  }

  .hero > :global(:first-child) {
    grid-column: 1 / 3;
  }
</style>
