import { useEffect } from "react";
import { useComponentsStore } from "../../stores/components";

export function EditArea() {
  const { addComponent, components } = useComponentsStore();

  useEffect(() => {
    addComponent?.(
      {
        id: 333,
        name: "Video",
        props: {},
        children: [],
      },
      1
    );
    addComponent?.(
      {
        id: 12345,
        name: "Video",
        props: {},
        children: [],
      },
      333
    );
  }, []);
  console.log(components, "components");

  return (
    <div className="h-[100%]">
      edit
      <br />
      <pre>{JSON.stringify(components, null, 2)}</pre>
    </div>
  );
}
