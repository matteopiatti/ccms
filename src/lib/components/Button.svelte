<script module>
  export const metadata = {
    props: [
      {
        name: "buttonText",
        title: "Button Text",
        type: "string",
        default: "Click Me",
        description: "The text to display on the button.",
      },
      {
        name: "buttonColor",
        title: "Button Color",
        type: "color",
        default: "#737373",
        description: "The Color of the button.",
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
    buttonColor = "#737373",
  } = $props();
</script>

<button style="background-color: {buttonColor}" onclick={clickAction}>
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
