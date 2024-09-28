import React, { useEffect } from "react";
// import React from "react";
import { Form, Input, Select } from "antd";
import {
  ComponentConfig,
  ComponentSetter,
  useComponentConfigStore,
} from "../../../stores/component-config";
import { useComponetsStore } from "../../../stores/components";

const ComponentAttr: React.FC = () => {
  const [form] = Form.useForm();
  const { curComponent, curComponentId, updateComponentProps } =
    useComponetsStore();
  const { componentConfig } = useComponentConfigStore();

  useEffect(() => {
    const data = form.getFieldsValue();
    form.setFieldsValue({ ...data, ...curComponent?.props });
  }, [curComponent]);

  if (!curComponent || !curComponentId) return null;

  function renderFormElememt(setteing: ComponentSetter) {
    const { type, options } = setteing;
    if (type === "select") {
      return <Select options={options} />;
    } else if (type === "input") {
      return <Input />;
    }
  }

  function valueChange(changeValue: ComponentConfig) {
    console.log(changeValue, "changeVakue");

    if (curComponentId) {
      updateComponentProps(curComponentId, changeValue);
    }
  }

  return (
    <div className=" mt-[20px]">
      <Form
        form={form}
        onValuesChange={valueChange}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 14 }}
      >
        <Form.Item label="组件id">
          <Input value={curComponent.id} disabled />
        </Form.Item>
        <Form.Item label="组件名称">
          <Input value={curComponent.name} disabled />
        </Form.Item>
        <Form.Item label="组件描述">
          <Input value={curComponent.desc} disabled />
        </Form.Item>
        {componentConfig[curComponent.name]?.setter?.map((setter) => {
          return (
            <Form.Item
              key={setter.name}
              name={setter.name}
              label={setter.label}
            >
              {renderFormElememt(setter)}
            </Form.Item>
          );
        })}
      </Form>
    </div>
  );
};

export default ComponentAttr;
