<template>
  <div class="props-table">
    <div v-for="(value, key) in finalProps" :key="key" class="prop-item">
      <span class="label" v-if="value?.text">{{ value.text }}</span>
      <div class="prop-component">
        <component
          :is="value?.component"
          :value="value?.value"
          v-bind="value?.extraProps"
        >
          <template v-if="value?.options">
            <component
              :is="value.subComponent"
              v-for="(option, index) in value.options"
              :key="index"
              :value="option.value"
            >
              {{ option.text }}
            </component>
          </template>
        </component>
      </div>
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
            item.value = item.initalTransform
              ? item.initalTransform(value)
              : value;
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

<style scoped>
.prop-item {
  display: flex;
  margin-bottom: 10px;
  align-items: center;
}
.label {
  width: 28%;
}
.prop-component {
  width: 70%;
}
</style>
