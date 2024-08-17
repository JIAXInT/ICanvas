import { computed, defineComponent, PropType, VNode } from "vue";

import { mapPropsToForms } from "../propsMap";
import { TextComponentProps } from "../defaultProps";
import { reduce } from "lodash";
import { Input, InputNumber, Slider, Radio, Select } from "ant-design-vue";
const mapToComponent = {
  "a-textarea": Input.TextArea,
  "a-input-number": InputNumber,
  "a-slider": Slider,
  "a-radio-group": Radio.Group,
  "a-radio-button": Radio.Button,
  "a-select": Select,
  "a-select-option": Select.Option,
} as any;

interface FormProps {
  component: string;
  subComponent?: string;
  value: string;
  extraProps?: { [key: string]: any };
  text?: string;
  options?: { text: string | VNode; value: any }[];
  valueProp: string;
  eventName?: string;
  events: { [key: string]: (e: any) => void };
}

// 定义一个函数首字母转换成大写返回
function capitalizeFirstLetter(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export default defineComponent({
  name: "props-table",
  props: {
    props: {
      type: Object as PropType<TextComponentProps>,
      required: true,
    },
  },
  emits: ["change"],
  setup(props, context) {
    const finalProps = computed(() => {
      return reduce(
        props.props,
        (result, value, key) => {
          const newKey = key as keyof TextComponentProps;
          const item = mapPropsToForms[newKey];
          if (item) {
            const {
              valueProp = "value",
              eventName = "change",
              initalTransform,
              afterTransform,
            } = item;
            const newItem: FormProps = {
              ...item,
              value: initalTransform ? initalTransform(value) : value,
              valueProp,
              eventName,
              events: {
                ["on" + capitalizeFirstLetter(eventName)]: (e: any) => {
                  context.emit("change", {
                    key,
                    value: afterTransform ? afterTransform(e) : e,
                  });
                },
              },
            };
            result[newKey] = newItem;
          }
          return result;
        },
        {} as { [key: string]: FormProps }
      );
    });
    return () => (
      <div className="props-table">
        {Object.keys(finalProps.value).map((key) => {
          const value = finalProps.value[key];
          const ComponentName = mapToComponent[value.component];
          const SubComponent = value.subComponent
            ? mapToComponent[value.subComponent]
            : null;
          const props = {
            [value.valueProp]: value.value,
            ...value.extraProps,
            ...value.events,
          };
          return (
            <div key={key} className="prop-item">
              {value.text && <span className="label">{value.text}</span>}
              <div className="prop-component">
                <ComponentName {...props}>
                  {value.options &&
                    value.options.map((option) => {
                      return (
                        <SubComponent value={option.value}>
                          {option.text}
                        </SubComponent>
                      );
                    })}
                </ComponentName>
              </div>
            </div>
          );
        })}
      </div>
    );
  },
});
