<template>
  <component
    :is="tag"
    :style="styleProps"
    class="l-text-component"
    @click="handleClick"
  >
    {{ text }}
  </component>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import {
  transfromToComponentProps,
  textDefautlProps,
  textStylePropNames,
} from "../defaultProps";
import useComponentCommon from "../hooks/useComponentCommon";
const defaultProps = transfromToComponentProps(textDefautlProps);
export default defineComponent({
  name: "l-text",
  props: {
    tag: {
      teyp: String,
      default: "div",
    },
    ...defaultProps,
  },
  setup(props) {
    const { styleProps, handleClick } = useComponentCommon(
      props,
      textStylePropNames
    );

    return {
      styleProps,
      handleClick,
    };
  },
});
</script>

<style scoped>
h2.l-text-component,
p.l-text-component {
  margin-bottom: 0;
}
button.l-text-component {
  padding: 5px 10px;
  cursor: pointer;
}
.l-text-component {
  box-sizing: border-box;
  white-space: pre-warp;
  position: relative !important;
}
</style>
