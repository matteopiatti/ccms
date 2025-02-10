<script module>
  export const metadata = {
    props: [
      {
        name: "clickAction",
        type: "function",
        default: "defaultButtonClickHandler",
        description: "The function to call when the button is clicked."
      },
      {
        name: "buttonText",
        type: "string",
        default: "Click Me",
        description: "The text to display on the button."
      }
    ]
  };
</script>

<script>
  const defaultButtonClickHandler = (e) => {
    console.log(e);
  };

  const { clickAction = defaultButtonClickHandler, buttonText = "Click Me" } = $props();
</script>

<button onclick={clickAction}>
  {buttonText}
</button>

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