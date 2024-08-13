<template>
  <div class="props-table">
    123
    <div v-for="(value, key) in finalProps" :key="key" class="prop-item">
      <pre>{{ value?.component }}</pre>
      <component :is="value?.component" :value="value?.value" />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { reduce } from "lodash";
import { PropsToForms, mapPropsToForms } from "../propsMap";
import { TextComponentProps } from "../defaultProps";

export default defineComponent({
  name: "props-table",
  props: {
    props: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const finalProps = computed(() => {
      return reduce(
        props.props,
        (result, value, key) => {
          const newKey = key as keyof TextComponentProps;
          const item = mapPropsToForms[newKey];
          if (item) {
            item.value = value;
            result[newKey] = item;
          }
          return result;
        },
        {} as PropsToForms
      );
    });

    console.log(props);

    console.log(finalProps.value);

    return {
      finalProps,
    };
  },
});
</script>

<style scoped></style>
