import React, { MouseEventHandler, useState } from "react";
import { Button } from "antd";
import HoverMask from "./components/hoverMask";

const EditorSimple: React.FC = () => {
  const [hoverComponentId, setHoverComponentId] = useState<
    number | undefined
  >();
  const [componentName, setComponentName] = useState<string>("");
  const handleMouseOver: MouseEventHandler = (e) => {
    const path = e.nativeEvent.composedPath();
    for (let i = 0; i < path.length; i++) {
      const ele = path[i] as HTMLElement;
      if (!ele.dataset.componentId) return;
      const componentId = ele.dataset.componentId;
      const componentName = ele.dataset.componentName;
      if (componentId && componentName) {
        setHoverComponentId(+componentId);
        setComponentName(componentName!);
        return;
      }
    }
  };

  return (
    //  mt-[100px] ml-[100px]
    <div
      className="edit-area"
      onMouseOver={handleMouseOver}
      onMouseLeave={() => {
        setHoverComponentId(undefined);
      }}
    >
      {hoverComponentId} {componentName}
      <div
        data-component-id={1111}
        data-component-name="container"
        className=" w-[600px] h-[400px] border-2 rounded-md "
      >
        {/* mt-[30px] ml-[30px] */}
        <div className=" ">
          <Button data-component-name="button" data-component-id={2222}>
            按钮
          </Button>
        </div>
        {/*  mt-[50px] ml-[50px] */}
        <div
          data-component-id={3333}
          data-component-name="container"
          className=" w-[400px] 
                h-[200px] border-2 rounded-md"
        >
          11
        </div>
      </div>
      {hoverComponentId && (
        <HoverMask
          portalClassName="edit-area"
          componentId={hoverComponentId!}
        ></HoverMask>
      )}
    </div>
  );
};

export default EditorSimple;
