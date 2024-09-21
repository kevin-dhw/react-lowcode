import { useMemo } from "react";
import { useComponentsConfigStore } from "../../stores/component-config";
import { MaterialItem } from "../MaterialItem";

export function Material() {
  const { componentConfig } = useComponentsConfigStore();
  const components = useMemo(() => {
    return Object.values(componentConfig!);
  }, [componentConfig]);
  console.log(components, "components");

  return (
    <div>
      {components.map((item, index) => {
        return <MaterialItem key={index} name={item.name} />;
      })}
    </div>
  );
}
