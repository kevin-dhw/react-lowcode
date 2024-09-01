import { MaterialItem } from "../MaterialItem";
import { useComponentConfigStore } from "../../stores/component-config";
import { useMemo } from "react";

export function Material() {
  const { componentConfig } = useComponentConfigStore();
  const components = useMemo(() => {
    return Object.values(componentConfig);
  }, [componentConfig]);

  console.log(components);

  return (
    <div>
      {components.map((item, index) => {
        return <MaterialItem name={item.name} key={item.name + index} />;
      })}
    </div>
  );
}
