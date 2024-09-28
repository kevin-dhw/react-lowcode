import { Segmented } from "antd";
import { useState } from "react";
import { useComponetsStore } from "../../stores/components";
import ComponentAttr from "./ComponentAttr";
import ComponentEvent from "./ComponentEvent";
import ComponentStyle from "./ComponentStyle";

export function Setting() {
  const { curComponentId } = useComponetsStore();
  if (!curComponentId) return null;

  const [key, setKey] = useState<string>("属性");

  const renderContent = (key: string) => {
    if (key === "属性") {
      return <ComponentAttr />;
    } else if (key === "样式") {
      return <ComponentEvent />;
    } else if (key === "事件") {
      return <ComponentStyle />;
    }
  };

  return (
    <div>
      <Segmented
        value={key}
        onChange={setKey}
        block
        options={["属性", "样式", "事件"]}
      ></Segmented>
      {renderContent(key)}
    </div>
  );
}
