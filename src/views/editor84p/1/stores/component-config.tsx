import { create } from "zustand";

import Container from "../materials/Container";
import Button from "../materials/Button";
import Page from "../materials/Page";

export interface ComponentConfig {
  name: string;
  defaultProps: Record<string, any>;
  component: any;
}

export interface State {
  // 学会 如何这样定义接口类型
  componentConfig?: { [key: string]: ComponentConfig };
}

export interface Action {
  registerComponent?: (name: string, component: ComponentConfig) => void;
}

export const useComponentConfigStore = create<State & Action>((set) => ({
  componentConfig: {
    Page: {
      name: "page",
      defaultProps: {},
      component: Page,
    },
    Container: {
      name: "container",
      defaultProps: {},
      component: Container,
    },
    Button: {
      name: "button",
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
