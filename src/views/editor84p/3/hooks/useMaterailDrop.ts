import { useDrop } from "react-dnd";
import { useComponetsStore } from "../stores/components";

const useMaterialDrop = (accept: string[], id: number) => {
  const { addComponent } = useComponetsStore();
  console.log(id);

  const [{ canDrop }, drop] = useDrop(() => ({
    accept,
    drop: (item: { type: string }, monitor) => {
      if (monitor.didDrop()) return;
      console.log(item);
      addComponent(
        {
          id: new Date().getTime(),
          name: item.type,
          props: {},
        },
        id
      );
    },
    collect: (monitor) => ({
      canDrop: monitor.canDrop(),
    }),
  }));
  return { canDrop, drop };
};

export default useMaterialDrop;
