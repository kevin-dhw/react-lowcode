import { CommonComponentProps } from "../../interface";
// import { useMaterailDrop } from "../../hooks/useMaterailDrop";

function Page({ id, children, styles }: CommonComponentProps) {
  //  不用带 h-[100%]  drop
  return (
    <div
      data-component-id={id}
      className="p-[20px] box-border"
      style={{ ...styles }}
    >
      {children}
    </div>
  );
}

export default Page;
