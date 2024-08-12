<template>
  <div class="create-component-list">
    <div
      v-for="(item, index) in list"
      :key="index"
      class="component-item"
      @click="onItemClick(item)"
    >
      <l-text v-bind="item" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import LText from "../components/LText.vue";

export default defineComponent({
  props: {
    list: {
      type: Array,
      required: true,
    },
  },
  emits: ["on-item-click"],
  name: "components-list",
  components: {
    LText,
  },
  setup(props, ctx) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const onItemClick = (data: any) => {
      ctx.emit("on-item-click", data);
    };
    return {
      onItemClick,
    };
  },
});
</script>
<style>
.component-item {
  width: 100px;
  margin: 0 auto;
  margin-bottom: 15px;
}
</style>
