import { create } from "zustand";

export interface Component {
  id: number;
  name: string;
  props: any;
  children?: Component[];
  parentId: number;
}

interface State {
  components: Component[];
}

interface Action {
  addComponent: (component: Component, parentId: number) => void;
  deleteComponent: (componentId: number) => void;
  updateComponentProps: (componentId: number, props: any) => void;
}
