import { createStore } from "vuex";
import templates, { TemplatesProps } from "./templates";
import user, { UserProps } from "./user";
import editor, { EditorProps } from "./editor";

// 全局应用接口
export interface GlobalDataProps {
  user: UserProps;
  templates: TemplatesProps;
  editor: EditorProps;
}

const store = createStore({
  modules: {
    user,
    templates,
    editor,
  },
});

export default store;
