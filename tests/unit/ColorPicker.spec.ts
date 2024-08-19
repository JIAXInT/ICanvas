import { mount, VueWrapper } from "@vue/test-utils";
import rgbHex from "rgb-hex";
import ColorPicker from "../../src/components/ColorPicker.vue";
const defaultColors = [
  "#ffffff",
  "#f5222d",
  "#fa541c",
  "#fadb14",
  "#52c41a",
  "#1890ff",
  "#722ed1",
  "#8c8c8c",
  "#000000",
  "",
];
let wrapper: VueWrapper<any>;

describe("ColorPicker component", () => {
  beforeAll(() => {
    wrapper = mount(ColorPicker, {
      props: {
        value: "#ffffff",
      },
    });
  });
  it.only("should render the correrct interface", () => {
    // <div><input></div>
    // <ul class="picked-color-list">
    //    <li class="item-0 or class="transparent-back">
    //        <div></div>
    //    </li>
    // </ul>

    // 1.测试左侧是否为input, 类型和值是否正确
    expect(wrapper.find("input").exists()).toBeTruthy();
    const input = wrapper.get("input").element;
    expect(input.type).toBe("color");
    expect(input.value).toBe("#ffffff");
    // 2.测试右侧是否有颜色的表列
    expect(wrapper.findAll(".picked-color-list li").length).toBe(
      defaultColors.length
    );
    // 3.检查第一个元素的css backgroupndColor属性是否相等对应的颜色
    const firstItem = wrapper.get("li:first-child div").element as HTMLElement;
    expect("#" + rgbHex(firstItem.style.backgroundColor)).toBe(
      defaultColors[0]
    );
    // 4.测试最后一个元素是否有特殊的类名
    const lastItem = wrapper.get("li:last-child div").element as HTMLElement;
    expect(lastItem.classList.contains("transparent-back")).toBeTruthy();
  });
  it.only("should send the correct event when change input", async () => {
    // 测试input 修改以后，是否发送对应的事件和对应的值
    const blackHex = "#000000";
    const input = wrapper.get("input");
    await input.setValue(blackHex);
    expect(wrapper.emitted()).toHaveProperty("change");
    const events = wrapper.emitted("change");
    console.log(events);
    // expect(events[0]).toEqual([blackHex]);
  });
  it("should send the correct ervent when clicking the color list", async () => {
    // 测试点击右侧颜色列表以后，是否发送对应的值
    const firstItem = wrapper.get("li:first-child div");
    firstItem.trigger("click");
    const events = wrapper.emitted("change");
    expect([events]).toEqual([defaultColors[0]]);
  });
});
