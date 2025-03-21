<script module>
  export const metadata = {
    props: [
      {
        name: "subtitle",
        title: "Subtitle",
        prop_type: "string",
        default:
          "This is your amazing Subtitle. Write here about all the cool crazy stuff you're doing",
        description: "The subtitle of the hero section.",
      },
    ],
    children: false,
  };
</script>

<script>
  const { subtitle = "Subtitle text lorem ipsum" } = $props();
</script>

<div class="title">
  <h1>{subtitle}</h1>
</div>

<style>
  .title {
    font-size: 24px;
    color: rgb(139, 139, 139);
    max-width: 60%;
    font-weight: 100;
  }
</style>
