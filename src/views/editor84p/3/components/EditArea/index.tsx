import React from "react";
import { useComponetsStore, Component } from "../../stores/components";
import { useComponentConfigStore } from "../../stores/component-config";

export function EditArea() {
  const { components, addComponent } = useComponetsStore();
  const { componentConfig } = useComponentConfigStore();

  React.useEffect(() => {
    addComponent(
      {
        id: 33345,
        name: "Container",
        props: {},
        children: [],
      },
      1
    );
    addComponent(
      {
        id: 33345444,
        name: "Container",
        props: {},
        children: [],
      },
      33345
    );
    addComponent(
      {
        id: 3334544455,
        name: "Button",
        props: {},
        children: [],
      },
      33345444
    );
  }, []);

  const renderComponent = (components: Component[]): React.ReactNode => {
    return components.map((component) => {
      const config = componentConfig[component.name];
      if (!config) return;
      return React.createElement(
        config.component,
        {
          key: component.id,
          id: component.id,
          ...component.props,
          ...config.defaultProps,
        },
        renderComponent(component.children || [])
      );
    });
  };
  return (
    <div className="h-[100%]">
      edit
      <br />
      {renderComponent(components)}
    </div>
  );
}
