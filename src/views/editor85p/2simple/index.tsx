import React, { useState, MouseEventHandler } from "react";
import { Button } from "antd";
import HoverMask from "./hoverMask";

const Editr: React.FC = () => {
  const [hoverComponentId, setComponentId] = useState<number | undefined>();
  const handleMOuseOver: MouseEventHandler = (e) => {
    const path = e.nativeEvent.composedPath();
    for (let i = 0; i < path.length; i++) {
      const ele = path[i] as HTMLElement;
      const componentId = ele.dataset.componentId;
      if (componentId) {
        console.log(componentId);
        setComponentId(+componentId);
        return;
      } else {
        return;
      }
    }
  };
  return (
    <div>
      <div
        data-component-id={111}
        onMouseOver={handleMOuseOver}
        onMouseLeave={() => {
          setComponentId(undefined);
        }}
        className=" h-[400px] w-[600px] border-2 border-red-200 container"
      >
        <div
          data-component-id={222}
          className=" mt-7 ml-7 h-[300px] w-[500px] border-2 border-red-200"
        >
          <Button data-component-id={333} className=" mt-7 ml-7">
            按钮
          </Button>
        </div>
      </div>
      {hoverComponentId && (
        <HoverMask
          containerClass={"container"}
          componentId={hoverComponentId}
        ></HoverMask>
      )}
    </div>
  );
};
export default Editr;
