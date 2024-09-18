import { create } from "zustand";

export interface Component {
  id: number;
  name: string;
  props: any;
  children?: Component[];
  parentId?: number;
}

export interface State {
  components: Component[];
}

export interface Action {
  addComponent: (component: Component, parendId?: number) => void;
  deleteComponent: (componentId: number) => void;
  updateComponentsProps?: (componentId: number, props: any) => void;
}

export const useComponentsStore = create<State & Action>((set, get) => ({
  components: [
    {
      id: 1,
      name: "Page",
      props: {},
      desc: "页面",
    },
  ],
  addComponent: (component, parentId) =>
    set((state) => {
      if (parentId) {
        const parentComponent = getComponentById(parentId, state.components);
        if (parentComponent) {
          if (parentComponent.children) {
            parentComponent.children.push(component);
          } else {
            parentComponent.children = [component];
          }
        }
        component.parentId = parentId;
        return { components: [...state.components] };
      }
      return { components: [...state.components, component] };
    }),
  deleteComponent: (componentId) => {
    if (!componentId) return null;
    const component = getComponentById(componentId, get().components);
    if (component?.parentId) {
      const parentComponent = getComponentById(
        component.parentId,
        get().components
      );

      if (parentComponent) {
        parentComponent.children = parentComponent?.children?.filter(
          (item) => item.id !== componentId
        );
      }

      set({ components: [...get().components] });
    }
  },
  updateComponentsProps: (componentId, props) =>
    set((state) => {
      const component = getComponentById(componentId, state.components);
      if (component) {
        component.props = { ...component.props, ...props };
        return { components: [...state.components] };
      }
      return { components: [...state.components] };
    }),
}));

export function getComponentById(
  id: number | null,
  components: Component[]
): Component | null {
  if (!id) return null;
  for (const component of components) {
    if (component.id === id) return component;
    if (component.children && component.children.length > 0) {
      const res = getComponentById(id, component.children);
      if (res) return res;
    }
  }
  return null;
}
