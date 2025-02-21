<script module>
  export const metadata = {
    props: [
      {
        name: "clickAction",
        type: "function",
        default: "defaultButtonClickHandler",
        description: "The function to call when the button is clicked.",
      },
      {
        name: "buttonText",
        type: "string",
        default: "Click Me",
        description: "The text to display on the button.",
      },
      {
        name: "buttonVariant",
        type: "color",
        default: "#9EBC9E",
        description: "The variant of the button.",
      },
    ],
  };
</script>

<script>
  const defaultButtonClickHandler = (e) => {
    console.log(e);
  };

  const {
    clickAction = defaultButtonClickHandler,
    buttonText = "Click Me",
    buttonVariant = "#9EBC9E",
  } = $props();
</script>

<button style="background-color: {buttonVariant}" onclick={clickAction}>
  {buttonText}
</button>

<style>
  button {
    color: white;
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 0.25rem;
    cursor: pointer;
  }
</style>
