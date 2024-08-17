import { h, VNode } from "vue";
import { TextComponentProps } from "./defaultProps";

export interface PropToForm {
  component: string;
  subComponent?: string;
  value?: string | number;
  extraProps?: { [key: string]: any };
  text: string;
  options?: { text: string | VNode; value: any }[];
  initalTransform?: (v: any) => any;
  afterTransform?: (v: any) => any;
  valueProp?: string;
  eventName?: string;
}
export type PropsToForms = {
  [P in keyof TextComponentProps]?: PropToForm;
};

const fontFamilyArr = [
  { text: "宋体", value: '"SimSun","STSong"' },
  { text: "黑体", value: '"SimHei","STHeiti"' },
  { text: "楷体", value: '"KaiTi","STKaiti"' },
  { text: "仿宋", value: '"FangSong","STFangsong"' },
];

// VNode写法
// const fontFamilyOptions = fontFamilyArr.map((item) => {
//   return {
//     text: h("span", { style: { fontFamily: item.value } }, item.text),
//     value: item.value,
//   };
// });

const fontFamilyOptions = fontFamilyArr.map((item) => {
  return {
    value: item.value,
    // text: (
    //   <span style={{ fontFamily: item.value }}>{item.text}</span>
    // ) as VNode,
    text: h("span", { style: { fontFamily: item.value } }, item.text),
  };
});

// 测试数据
export const mapPropsToForms: PropsToForms = {
  text: {
    text: "文本",
    component: "a-textarea",
    extraProps: { rows: 3 },
    afterTransform: (e: any) => e.target.value,
  },
  fontSize: {
    text: "字体大小",
    component: "a-input-number",
    initalTransform: (v: string) => parseInt(v),
    afterTransform: (e: number) => (e ? `${e}px` : ""),
  },
  lineHeight: {
    text: "行高",
    component: "a-slider",
    extraProps: { min: 0, max: 3, step: 0.1 },
    initalTransform: (v: string) => parseFloat(v),
    afterTransform: (e: number) => e.toString(),
  },
  textAlign: {
    component: "a-radio-group",
    subComponent: "a-radio-button",
    text: "对齐",
    options: [
      { text: "左对齐", value: "left" },
      { text: "居中", value: "center" },
      { text: "右对齐", value: "right" },
    ],
    afterTransform: (e: any) => e.target.value,
  },
  fontFamily: {
    component: "a-select",
    subComponent: "a-select-option",
    text: "字体",
    options: [{ value: "", text: "无" }, ...fontFamilyOptions],
  },
};
