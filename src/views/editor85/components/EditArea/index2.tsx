import React, { ReactNode, useEffect } from "react";
import { useComponentConfigStore } from "../../stores/component-config";
import { Component, useComponetsStore } from "../../stores/components";

const EditArea: React.FC = () => {
  const { components, addComponent } = useComponetsStore();
  const { componentConfig } = useComponentConfigStore();

  const renderComponent = (components: Component[]): ReactNode => {
    return components.map((component: Component) => {
      const config = componentConfig?.[component.name];
      if (!config) return null;

      return React.createElement(
        config.component,
        {
          key: component.id,
          id: component.id,
          ...config.defaultProps,
          ...component.props,
        },
        renderComponent(component.children || [])
      );
    });
  };
  useEffect(() => {
    addComponent({
      id: 222,
      name: "Container",
      props: {},
      children: [],
    });
  }, []);

  return (
    <div className="h-[100%]">
      {renderComponent(components)}
      <br />
    </div>
  );
};
export default EditArea;
