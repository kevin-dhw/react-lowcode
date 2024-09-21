import { CommonComponentsProps } from "../../interface";
import useMaterialDrop from "../../hooks/useMaterailDrop";
import { pageAcceptData } from "../../../3/asset/data";

function Page({ children, id }: CommonComponentsProps) {
  const allType = pageAcceptData;
  const { canDrop, drop } = useMaterialDrop(allType, id);

  return (
    <div
      style={{ border: canDrop ? "1px solid red" : "" }}
      ref={drop}
      className="p-[20px] h-[100%] box-border"
    >
      {children}
    </div>
  );
}

export default Page;
