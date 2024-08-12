/*
  1.文本
  2.图片
  3.形状
  ---------------------------------------------------
  通用属性
  这些组件都有拥有的属怀，分为几组
  尺寸:
   * 长度 - 输入数字（同下面5项）
   * 宽度
   * 左边距
   * 右边距
   * 上边距
   * 下边距
  边框:
   * 边框类型 - 无 ｜ 实线 ｜ 破折线 ｜ 点状线 下拉菜单
   * 边框颜色 - 颜色选择
   * 边框宽度 - 滑动选择
   * 边框圆角 - 滑动选择
  阴影与透明度:
   * 透明度 - 滑动选择 100 - 0 倒排
   * 阴影 - 滑动选择
  位置:
   * X 坐标 - 输入数字
   * Y 坐标 - 输入数字
  事件功能
   * 事件类型 - 无 ｜ 跳转 URL 下拉菜单
   * url 地址 - 输入框
  --------------------------------------------------------
  特有属性
  文本
    * 文字内容 - 多行输入框
    * 字与 - 输入数字
    * 字体 - 宋体 ｜ 黑体 ｜ 楷体 ｜ 仿宋 ...下拉菜单
    * 加粗 - 特殊 checkbox
    * 斜体 - 同上
    * 下划线 - 同上
    * 行高 - slider
    * 对齐 - 左 ｜ 中 ｜ 右 radio group
    * 文字颜色 - 颜色选择
    * 背景颜色 - 颜色选择
  

*/
// 通用业务组件属性
import { mapValues, without } from "lodash-es";

export interface CommonComponentProps {
  // actions
  actionType: string;
  url: string;
  // size
  height: string;
  width: string;
  paddingLeft: string;
  paddingRight: string;
  paddingTop: string;
  paddingBottom: string;
  // border type
  borderStyle: string;
  borderColor: string;
  borderWidth: string;
  borderRadius: string;
  // shadow and opacity
  boxShadow: string;
  opacity: number;
  // position and x,y
  position: string;
  left: string;
  top: string;
  right: string;
}

export const commonDefaultProps: CommonComponentProps = {
  // actions （事件功能）
  actionType: "",
  url: "",
  // size      （尺寸:）
  height: "",
  width: "318px",
  paddingLeft: "0px",
  paddingRight: "0px",
  paddingTop: "0px",
  paddingBottom: "0px",
  // border type （边框:）
  borderStyle: "none",
  borderColor: "#000",
  borderWidth: "0",
  borderRadius: "0",
  // shadow and opacity (阴影与透明度:)
  boxShadow: "0 0 0 #000000",
  opacity: 1,
  // position and x,y  (位置:)
  position: "absolute",
  left: "0",
  top: "0",
  right: "0",
};

// 添加TextDefaultProps 接口
export interface TextComponentProps extends CommonComponentProps {
  text: string;
  fontSize: string;
  fontFamily: string;
  fontWeight: string;
  fontStyle: string;
  textDecoration: string;
  lineHeight: string;
  textAlign: string;
  color: string;
  backgroundColor: string;
}

export const textDefautlProps: TextComponentProps = {
  // basic props - font styles
  text: "正文内容",
  fontSize: "14px",
  fontFamily: "",
  fontWeight: "normal",
  fontStyle: "normal",
  textDecoration: "none",
  lineHeight: "1",
  textAlign: "left",
  color: "#000000",
  backgroundColor: "",
  ...commonDefaultProps,
};

export const textStylePropNames = without(
  Object.keys(textDefautlProps),
  "actionType",
  "url",
  "text"
);
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const transfromToComponentProps = <T extends { [key: string]: any }>(
  props: T
) => {
  return mapValues(props, (item) => {
    return {
      type: item.constructor,
      default: item,
    };
  });
};
