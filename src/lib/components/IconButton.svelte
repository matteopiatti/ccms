<script module>
  export const metadata = {
    props: [
      {
        name: "clickAction",
        title: "Click Action",
        props_type: "function",
        default: "defaultButtonClickHandler",
        description: "The function to call when the button is clicked.",
      },
    ],
  };
</script>

<script>
  const defaultButtonClickHandler = (e) => {
    console.log(e);
  };

  const { clickAction = defaultButtonClickHandler } = $props();
</script>

<button onclick={clickAction}> Click Me </button>

<style>
  button {
    background-color: #333;
    color: white;
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 0.25rem;
    cursor: pointer;
  }
</style>
