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
    background-image: linear-gradient(#b6b6b6 50%, rgba(255, 255, 255, 0) 0%),
      linear-gradient(#b6b6b6 50%, rgba(255, 255, 255, 0) 0%);
    background-position: left, right;
    background-size: 1px 10px;
    background-repeat: repeat-y;
    display: flex;
    flex-direction: column;
    margin-left: auto;
    margin-right: auto;
    max-width: 1104px;
    min-height: 200px;
    padding: 2rem;
    gap: 1rem;
  }

  .hero:empty:before {
    content: "Layoutblock content goes here:";
  }
</style>
