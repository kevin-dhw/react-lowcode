import { create } from "zustand";
import Container from "../materials/Container";
import Button from "../materials/Button";
import Page from "../materials/Page";

export interface ConponentConfig {
  name: string;
  defaultProps: Record<string, any>;
  component: any;
}

export interface State {
  componentConfig?: { [key: string]: ConponentConfig };
}

export interface Action {
  registerConfig?: (name: string, componentConfig: ConponentConfig) => void;
}

const useConponentConfigStore = create<State & Action>((set) => ({
  componentConfig: {
    Container: {
      name: "Container",
      defaultProps: {},
      component: Container,
    },
    Button: {
      name: "Button",
      defaultProps: {
        type: "primary",
        text: "按钮",
      },
      component: Button,
    },
    Page: {
      name: "Page",
      defaultProps: {},
      component: Page,
    },
  },
  registerConfig: (name, componentConfig) => {
    set((state) => {
      return {
        ...state,
        componentConfig: {
          ...state.componentConfig,
          [name]: componentConfig,
        },
      };
    });
  },
}));

export default useConponentConfigStore;
