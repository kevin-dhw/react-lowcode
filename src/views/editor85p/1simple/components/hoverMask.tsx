import React, { useEffect, useMemo } from "react";
import { createPortal } from "react-dom";

interface HoverMaskProps {
  portalClassName: string;
  componentId: number;
}

const HoverMask: React.FC<HoverMaskProps> = (props) => {
  const { portalClassName, componentId } = props;
  const [position, setPosition] = React.useState({
    top: 0,
    left: 0,
    width: 0,
    height: 0,
  });
  const handlePosition = () => {
    if (!componentId) return;
    const container = document.querySelector(`.${portalClassName}`);
    if (!container) return;
    const node = document.querySelector(`[data-component-id="${componentId}"]`);
    if (!node) return;
    const { top, left, width, height } = node.getBoundingClientRect();
    const { top: containerTop, left: containerLeft } =
      container.getBoundingClientRect();
    setPosition({
      width,
      height,
      top: top - containerTop + container.scrollTop,
      left: left - containerLeft + container.scrollLeft,
    });
  };
  useEffect(() => {
    handlePosition();
  }, [componentId]);

  const el = useMemo(() => {
    const el = document.createElement("div");
    el.className = `wrapper`;
    const container = document.querySelector(`.${portalClassName}`);
    container!.appendChild(el);
    return el;
  }, [componentId]);

  return createPortal(
    <div
      style={{
        position: "absolute",
        left: position.left,
        top: position.top,
        backgroundColor: "rgba(0, 0, 255, 0.1)",
        border: "1px dashed blue",
        pointerEvents: "none",
        width: position.width,
        height: position.height,
        zIndex: 12,
        borderRadius: 4,
        boxSizing: "border-box",
      }}
    ></div>,
    el!
  );
};

export default HoverMask;
