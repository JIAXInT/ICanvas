import { TextComponentProps } from "./defaultProps";

export interface PropToForm {
  component: string;
  value?: string | number;
}
export type PropsToForms = {
  [P in keyof TextComponentProps]?: PropToForm;
};

// 测试数据
export const mapPropsToForms: PropsToForms = {
  text: {
    component: "a-input",
  },
};
