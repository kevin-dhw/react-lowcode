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
  addComponent?: (component: Component, parentId: number) => void;
  deleteComponent?: (componentId: number) => void;
  updateComponentProp?: (componentId: number, props: any) => void;
}

const useComponentsStore = create<State & Action>((set) => ({
  components: [
    {
      id: 1,
      name: "Page",
      props: {},
      component: [],
      parentId: 123,
    },
  ],
  addComponent: (component, parentId) => {
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
        return { ...state, components: [...state.components] };
      }
      return { ...state, components: [...state.components, component] };
    });
  },
  deleteComponent: (componentId) => {
    if (!componentId) return null;
    set((state) => {
      const component = getComponentById(componentId, state.components);
      if (component?.parentId) {
        const parentComponent = getComponentById(
          component.parentId,
          state.components
        );
        if (parentComponent) {
          parentComponent.children = parentComponent?.children?.filter(
            (item) => item.id !== componentId
          );
        }
      }
      return { ...state, components: [...state.components] };
    });
  },
  updateComponentProp: (componentId, props) => {
    set((state) => {
      const component = getComponentById(componentId, state.components);
      if (component) {
        component.props = { ...component.props, ...props };
      }
      return { ...state, components: [...state.components] };
    });
  },
}));

export const getComponentById = (
  id: number | null,
  components: Component[]
): Component | null => {
  if (!id) return null;
  for (const component of components) {
    if (component.id === id) return component;
    if (component.children && component.children.length) {
      const res = getComponentById(id, component.children);
      if (res) return res;
    }
  }
  return null;
};
export default useComponentsStore;
