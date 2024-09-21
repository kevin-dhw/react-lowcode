import useMaterialDrop from "../../hooks/useMaterailDrop";
import { CommonComponentsProps } from "../../interface";
import { containerAcceptData } from "../../../3/asset/data";

const Container = ({ children, id }: CommonComponentsProps) => {
  // canDrop
  const { drop, canDrop } = useMaterialDrop(containerAcceptData, id);
  return (
    <div
      ref={drop}
      style={{
        backgroundColor: canDrop ? "2px solid blue" : "none",
      }}
      className="border-[1px] border-[#000] min-h-[100px] p-[20px]"
    >
      {children}
    </div>
  );
};

export default Container;
