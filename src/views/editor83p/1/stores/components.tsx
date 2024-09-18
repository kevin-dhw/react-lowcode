import { create } from "zustand";

export interface Component {
  id: number;
  name: string;
  props: any;
  children?: Component[];
  parentId?: number;
  desc?: string;
}

interface State {
  components: Component[];
}

interface Action {
  addComponent?: (component: Component, parentId: number) => void;
  deleteComponent?: (componentId: number) => void;
  updateComponentProps?: (componentId: number, props: any) => void;
}

export const useComponentsStore = create<State & Action>((set) => ({
  components: [
    {
      id: 1,
      name: "page",
      props: {},
      desc: "页面",
    },
  ],
  addComponent: (component: Component, parentId: number) => {
    set((state) => {
      component.parentId = parentId;
      const parentComponent = getComponentById(parentId, state.components);
      if (parentComponent) {
        if (parentComponent.children) {
          parentComponent.children.push(component);
        } else {
          parentComponent.children = [component];
        }
      }
      return { ...state, components: [...state.components] };
    });
  },
  deleteComponent: (componentId: number) => {
    set((state) => {
      const component = getComponentById(componentId, state.components);
      if (component?.parentId) {
        const parentComponent = getComponentById(
          component?.parentId,
          state.components
        );
        if (parentComponent) {
          if (parentComponent?.children) {
            parentComponent.children = parentComponent.children.filter(
              (item) => item.id !== componentId
            );
          }
        }
      }
      return { ...state, components: [...state.components] };
    });
  },
  updateComponentProps: (componentId: number, props: any) => {
    set((state) => {
      const component = getComponentById(componentId, state.components);
      if (component) {
        component.props = { ...component.props, ...props };
      }
      return { ...state, components: [...state.components] };
    });
  },
}));

// 返回忘了写类型  类型会是never
export const getComponentById = (
  id: number,
  components: Component[]
): Component | null => {
  let res = null;
  if (!id) return res;
  const dfs = (components: Component[]) => {
    for (let i = 0; i < components.length; i++) {
      const n = components[i];
      if (n.id === id) {
        res = n;
      }
      if (n.children) {
        dfs(n.children);
      }
    }
  };
  dfs(components);
  return res;
};
