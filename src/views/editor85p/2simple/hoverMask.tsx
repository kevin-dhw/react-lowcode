import React, { useState, useEffect, useMemo } from "react";
import { createPortal } from "react-dom";

export interface HoverMaskProps {
  componentId: number;
  containerClass: string;
}

const HoverMask: React.FC<HoverMaskProps> = (props) => {
  const { componentId, containerClass } = props;
  const [position, setPosition] = useState({
    top: 0,
    left: 0,
    width: 0,
    height: 0,
    labelTop: 0,
    labelLeft: 0,
  });

  useEffect(() => {
    updatePosition();
  }, [componentId]);

  const updatePosition = () => {
    const container = document.querySelector(`.${containerClass}`);
    if (!container) return;
    const node = document.querySelector(`[data-component-id="${componentId}"]`);
    if (!node) return;
    const { top, left, width, height } = node.getBoundingClientRect();
    console.log(node.getBoundingClientRect(), "666666");
    const { top: containerTop, left: containerLeft } =
      container.getBoundingClientRect();
    // 获取组件名字的一些宽高属性, 这里把高亮组件的top, left增高一点 来放组件名
    let labelTop = top - containerTop + container.scrollTop;
    const labelLeft = left - containerLeft + width;

    if (labelTop <= 0) {
      labelTop -= -20;
    }

    setPosition({
      top: top - containerTop + container.scrollTop,
      left: left - containerLeft + container.scrollLeft,
      width,
      height,
      labelTop,
      labelLeft,
    });
  };

  const el = useMemo(() => {
    const el = document.createElement("div");
    el.className = "wrapper";
    const container = document.querySelector(`.${containerClass}`);
    container?.appendChild(el);
    return el;
  }, []);

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
          组件名
        </div>
      </div>
    </>,
    el
  );
};

export default HoverMask;
