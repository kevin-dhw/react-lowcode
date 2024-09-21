import { CommonComponentsProps } from "../../interface";
import useMaterialDrop from "../../hooks/useMaterailDrop";

const Container = ({ children, id }: CommonComponentsProps) => {
  console.log(id);
  const { canDrop, drop } = useMaterialDrop(["Button", "Container"], id);

  return (
    <div
      ref={drop}
      style={{ border: canDrop ? "1px solid red" : "" }}
      className="border-[1px] border-[#000] min-h-[100px] p-[20px]"
    >
      {children}
    </div>
  );
};

export default Container;
