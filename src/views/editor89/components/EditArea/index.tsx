import React, { useState, MouseEventHandler } from "react";
import { useComponentConfigStore } from "../../stores/component-config";
// import { Space, Dropdown } from "antd";
import { Component, useComponetsStore } from "../../stores/components";
import HoverMask from "../HoverMask";
import SelectedMask from "../SelectMask";

export function EditArea() {
  const { components, curComponent, setCurComponentId, curComponentId } =
    useComponetsStore();
  console.log(curComponent, "curComponent");
  const { componentConfig } = useComponentConfigStore();
  const [hoverComponentId, setHoverComponentId] = useState<number>();

  // 容器每个元素的点击事件
  const handleClick: MouseEventHandler = (e) => {
    const path = e.nativeEvent.composedPath();
    for (let i = 0; i < path.length; i++) {
      const ele = path[i] as HTMLElement;
      const componentId = ele.dataset.componentId;
      if (componentId) {
        setCurComponentId?.(+componentId);
        return;
      }
    }
  };

  const handleMouseOver: MouseEventHandler = (e) => {
    const path = e.nativeEvent.composedPath();

    for (let i = 0; i < path.length; i += 1) {
      const ele = path[i] as HTMLElement;

      const componentId = ele.dataset?.componentId;
      if (componentId) {
        setHoverComponentId(+componentId);
        return;
      }
    }
  };

  function renderComponents(components: Component[]): React.ReactNode {
    return components.map((component: Component) => {
      const config = componentConfig?.[component.name];

      if (!config?.dev) {
        return null;
      }

      return React.createElement(
        config.dev,
        {
          key: component.id,
          id: component.id,
          styles: component.styles,
          ...config.defaultProps,
          ...component.props,
        },
        renderComponents(component.children || [])
      );
    });
  }

  return (
    <div
      className="h-[100%] edit-area"
      onMouseMove={handleMouseOver}
      onMouseLeave={() => {
        setHoverComponentId(undefined);
      }}
      onClick={handleClick}
    >
      {hoverComponentId}
      {renderComponents(components)}
      {hoverComponentId && hoverComponentId !== curComponentId && (
        <HoverMask
          portalWrapperClassName="portal-wrapper"
          containerClassName="edit-area"
          componentId={hoverComponentId}
        />
      )}

      {curComponentId && (
        <SelectedMask
          portalWrapperClassName="portal-wrapper"
          containerClassName="edit-area"
          componentId={curComponentId}
        ></SelectedMask>
      )}
      <div className="portal-wrapper"></div>
    </div>
  );
}
