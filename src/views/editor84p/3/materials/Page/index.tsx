import { CommonComponentsProps } from "../../interface";
import useMaterialDrop from "../../hooks/useMaterailDrop";

function Page({ children, id }: CommonComponentsProps) {
  const { canDrop, drop } = useMaterialDrop(["Button", "Container"], id);

  return (
    <div
      ref={drop}
      style={{ border: canDrop ? "1px solid red" : "" }}
      className="p-[20px] h-[100%] box-border"
    >
      {children}
    </div>
  );
}

export default Page;
