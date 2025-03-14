import Block from "./Block.svelte";
import AddBlock from "./AddBlock.svelte";
import BlockEditor from "./BlockEditor.svelte";
import EditBlock from "./EditBlock.svelte";
import PropFormElement from "./PropFormElement.svelte";

import Header from "./Header.svelte";
import EditDialog from "./EditDialog.svelte";
import Title from "./Title.svelte";
import Input from "./Input.svelte";
import FormButton from "./FormButton.svelte";

import ColorPicker from "./ColorPicker.svelte";

export const BlockElements = {
  Block,
  AddBlock,
  BlockEditor,
  EditBlock,
  PropFormElement,
};

export const LayoutElements = {
  FormButton,
  Header,
  EditDialog,
  Title,
  Input,
  ColorPicker,
};

export default {
  BlockElements,
  LayoutElements,
};
