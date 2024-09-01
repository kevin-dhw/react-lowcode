import React, { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { getComponentById, useComponetsStore } from "../../stores/components";

export interface HoverMaskProps {
  containerClassName: string;
  componentId: number;
}

const HoverMask: React.FC<HoverMaskProps> = (props) => {
  const { containerClassName, componentId } = props;
  const { components } = useComponetsStore();
  console.log(containerClassName, componentId, "222333");

  const [position, setPosition] = useState({
    left: 0,
    top: 0,
    width: 0,
    height: 0,
    labelTop: 0,
    labelLeft: 0,
  });
  const updatePosition = () => {
    if (!componentId) return;
    const container = document.querySelector(`.${containerClassName}`);
    if (!container) return;
    // querySelector里面一个数组
    const node = document.querySelector(`[data-component-id="${componentId}"]`);
    if (!node) return;

    const { top, left, width, height } = node.getBoundingClientRect();
    // containerTop containerLeft
    const { top: containerTop, left: containerLeft } =
      container.getBoundingClientRect();
    console.log(containerTop, containerLeft, "containerLeft");

    // 获取组件名字的一些宽高属性, 这里把高亮组件的top, left增高一点 来放组件名
    const labelTop = top - containerTop + container.scrollTop;
    const labelLeft = left - containerLeft + width;

    setPosition({
      top: top - containerTop + container.scrollTop,
      left: left - containerLeft + container.scrollTop,
      width,
      height,
      labelTop,
      labelLeft,
    });
  };
  useEffect(() => {
    updatePosition();
  }, [componentId, containerClassName]);

  //  创建元素 高亮的hover
  const el = useMemo(() => {
    const el = document.createElement("div");
    el.className = "wrapper";
    const container = document.querySelector(`.${containerClassName}`);
    container!.appendChild(el);
    return el;
  }, []);

  const curComponent = useMemo(() => {
    return getComponentById(componentId, components);
  }, [componentId]);

  return createPortal(
    <>
      <div
        style={{
          position: "absolute",
          left: position.left,
          top: position.top,
          backgroundColor: "rgba(0, 0, 255, 0.05)",
          border: "1px dashed blue",
          pointerEvents: "none",
          width: position.width,
          height: position.height,
          zIndex: 12,
          borderRadius: 4,
          boxSizing: "border-box",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: position.labelLeft,
          top: position.labelTop,
          fontSize: "14px",
          zIndex: 13,
          display: !position.width || position.width < 10 ? "none" : "inline",
          transform: "translate(-100%, -100%)",
        }}
      >
        <div
          style={{
            padding: "0 8px",
            backgroundColor: "blue",
            borderRadius: 4,
            color: "#fff",
            cursor: "pointer",
            whiteSpace: "nowrap",
          }}
        >
          {curComponent?.name}
        </div>
      </div>
    </>,
    el
  );
};

export default HoverMask;
