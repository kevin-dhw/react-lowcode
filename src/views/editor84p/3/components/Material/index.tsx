import React from "react";
import { MaterialItem } from "../MaterialItem";
import { useComponentConfigStore } from "../../stores/component-config";

export function Material() {
  const { componentConfig } = useComponentConfigStore();
  const components = React.useMemo(() => {
    return Object.values(componentConfig);
  }, [componentConfig]);

  return (
    <div>
      material
      <br />
      {components.length &&
        components.map((item, index) => {
          return <MaterialItem key={index} name={item.name} />;
        })}
    </div>
  );
}
