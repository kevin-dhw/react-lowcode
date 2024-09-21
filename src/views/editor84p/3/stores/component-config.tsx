import { create } from "zustand";

import Page from "../materials/Page";
import Container from "../materials/Container";
import Button from "../materials/Button";

export interface ComponentConfig {
  name: string;
  defaultProps: Record<string, any>;
  component: any;
}

export interface State {
  componentConfig: { [key: string]: ComponentConfig };
}

export interface Action {
  registerComponent?: (name: string, component: ComponentConfig) => void;
}

export const useComponentConfigStore = create<State & Action>((set) => ({
  componentConfig: {
    Page: {
      name: "Page",
      defaultProps: {},
      component: Page,
    },
    Container: {
      name: "Container",
      defaultProps: {},
      component: Container,
    },
    Button: {
      name: "Button",
      defaultProps: { type: "primary", text: "按钮" },
      component: Button,
    },
  },
  registerComponent: (name, component) => {
    set((state) => {
      return {
        ...state,
        componentConfig: { ...state.componentConfig, [name]: component },
      };
    });
  },
}));
