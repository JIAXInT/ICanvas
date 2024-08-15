import { Module } from "vuex";
import { v4 as uuidv4 } from "uuid";
import { GlobalDataProps } from "./index";
import { TextComponentProps } from "../defaultProps";

export interface EditorProps {
  // 供中间编辑渲染的数组
  components: ComponentData[];
  // 当前编辑器是那个元素,uuid
  currentElement: string;
  // 当然最后保存的时候还有一些项目信息，这里并没有写出，等做到时候再补充
}

export interface ComponentData {
  // 这个元素的属性，属性的详情见下面
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  props: { [key: string]: any };
  // id uuid v4 生成
  id: string;
  // 业务组件库名称 l-text, l-image 等等
  name: string;
}

// 测试数据
export const testComponentds: ComponentData[] = [
  {
    id: uuidv4(),
    name: "l-text",
    props: {
      text: "hello",
      fontSize: "20px",
      color: "red",
      lineHeight: "1.5",
      textAlign: "left",
      fontFamily: "Arial",
    },
  },
  { id: uuidv4(), name: "l-text", props: { text: "hello2", fontSize: "10px" } },
  {
    id: uuidv4(),
    name: "l-text",
    props: {
      text: "hello3",
      fontSize: "15px",
      actionType: "url",
      url: "https://www.baidu.com",
    },
  },
];

const editor: Module<EditorProps, GlobalDataProps> = {
  state: {
    components: testComponentds,
    currentElement: "",
  },
  mutations: {
    addComponent(state, props: Partial<TextComponentProps>) {
      const newComponent: ComponentData = {
        id: uuidv4(),
        name: "l-text",
        props,
      };
      state.components.push(newComponent);
    },
    setActive(state, currentId: string) {
      state.currentElement = currentId;
    },
  },
  getters: {
    getCurrentElement: (state) => {
      return state.components.find(
        (component) => component.id === state.currentElement
      );
    },
  },
};

export default editor;
