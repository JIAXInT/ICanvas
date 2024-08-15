<template>
  <div class="editor" id="editor-layout-main">
    <a-layout style="background: red; height: 85vh">
      <a-layout-sider width="300" style="background: white">
        <div class="sidebar-container">
          <components-list
            :list="defaultTextTemplates"
            @on-item-click="addItem"
          ></components-list>
        </div>
      </a-layout-sider>
      <a-layout style="padding: 0 24px 24px">
        <a-layout-content class="preview-container">
          <p>画布区域</p>
          <div class="preview-list" id="canvas-area">
            <edit-wrapper
              v-for="component in components"
              :key="component.id"
              :id="component.id"
              @setActive="setActive"
              :active="component.id === currentElement?.id"
            >
              <component :is="component.name" v-bind="component.props" />
            </edit-wrapper>
          </div>
        </a-layout-content>
      </a-layout>
      <a-layout-sider
        width="300"
        style="background: white; padding: 10px"
        class="settings-panel"
      >
        组件属性
        <props-table
          v-if="currentElement && currentElement.props"
          :props="currentElement.props"
          @change="handleChange"
        />
        <pre>{{ currentElement?.props }}</pre>
      </a-layout-sider>
    </a-layout>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { useStore } from "vuex";
import { GlobalDataProps } from "../store/index";
import { ComponentData } from "../store/editor";
import defaultTextTemplates from "../defaultTemplates";
import ComponentsList from "../components/ComponentsList.vue";
import LText from "../components/LText.vue";
import EditWrapper from "../components/EditWrapper.vue";
import PropsTable from "../components/PropsTable.vue";
export default defineComponent({
  components: {
    ComponentsList,
    LText,
    EditWrapper,
    PropsTable,
  },
  setup() {
    const store = useStore<GlobalDataProps>();
    const components = computed(() => store.state.editor.components);
    const currentElement = computed<ComponentData | null>(
      () => store.getters.getCurrentElement
    );
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const addItem = (props: any) => {
      store.commit("addComponent", props);
    };
    const setActive = (id: string) => {
      console.log(id);
      store.commit("setActive", id);
    };

    const handleChange = (e: any) => {
      console.log("event", e);
      store.commit("updateComponent", e);
    };

    return {
      components,
      defaultTextTemplates,
      addItem,
      setActive,
      currentElement,
      handleChange,
    };
  },
});
</script>
<style>
.editor {
  min-height: 100vh;
}
.preview-container {
  padding: 24px;
  margin: 0;
  min-height: 85vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
}
.preview-list {
  padding: 0;
  margin: 0;
  min-width: 375px;
  min-height: 200px;
  border: 1px solid #efefef;
  background: #fff;
  overflow-x: hidden;
  overflow-y: auto;
  position: fixed;
  margin-top: 50px;
  max-height: 80vh;
}
</style>
