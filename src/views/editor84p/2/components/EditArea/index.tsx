import React, { useEffect } from "react";
import { useComponetsStore, Component } from "../../stores/components";
import { useComponentsConfigStore } from "../../stores/component-config";

export const EditArea: React.FC = () => {
  const { addComponent, components } = useComponetsStore();
  const { componentConfig } = useComponentsConfigStore();

  useEffect(() => {
    addComponent(
      {
        id: 333,
        name: "Container",
        props: {},
        children: [],
      },
      1
    );
  }, []);

  const renderConponents = (components: Component[]): React.ReactNode => {
    return components.map((component: Component) => {
      const config = componentConfig?.[component.name];
      if (!config) return;
      console.log(component.id, "component.id");

      return React.createElement(
        config.component,
        {
          key: component.id,
          id: component.id,
          ...component.props,
          ...config.defaultProps,
        },
        renderConponents(component.children || [])
      );
    });
  };
  return (
    <div className="h-[100%]">
      edit
      <br />
      {renderConponents(components)}
    </div>
  );
};

// export default EditArea;
