import { CommonComponentProps } from "../../interface";
import { useDrop } from "react-dnd";

function Page({ id, children }: CommonComponentProps) {
  const [{ candrop }, drop] = useDrop({
    accept: ["Button"],
    drop: (item: any, monitor) => {
      console.log(item);
      if (monitor.didDrop()) return;
    },
    collect: (monitor) => {
      return { candrop: monitor.canDrop() };
    },
  });
  return (
    <div
      ref={drop}
      data-component-id={id}
      className="p-[20px] h-[100%] box-border "
      style={{ border: candrop ? "1px solid red" : "" }}
    >
      {children}
    </div>
  );
}

export default Page;
