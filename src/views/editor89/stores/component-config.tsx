import { create } from "zustand";
import Container from "../materials/Container";
import Button from "../materials/Button";
import Page from "../materials/Page";
import ContainerDev from "../materials/Container/dev";
import ContainerProd from "../materials/Container/prod";
import ButtonDev from "../materials/Button/dev";
import ButtonProd from "../materials/Button/prod";
import PageDev from "../materials/Page/dev";
import PageProd from "../materials/Page/prod";

export interface ComponentSetter {
  name: string;
  label: string;
  type: string;
  [key: string]: any;
  options?: any;
}

export interface ComponentConfig {
  name: string;
  defaultProps: Record<string, any>;
  component: any;
  desc?: string;
  setter?: ComponentSetter[];
  stylesSetter?: ComponentSetter[];
  // 预览和编辑是两种状态 需要分开
  dev?: any;
  prod?: any;
}

interface State {
  componentConfig: { [key: string]: ComponentConfig };
}

interface Action {
  registerComponent: (name: string, componentConfig: ComponentConfig) => void;
}

export const useComponentConfigStore = create<State & Action>((set) => ({
  componentConfig: {
    Container: {
      name: "Container",
      defaultProps: {},
      desc: "容器",
      component: Container,
      dev: ContainerDev,
      prod: ContainerProd,
    },
    Button: {
      name: "Button",
      defaultProps: {
        type: "primary",
        text: "按钮",
      },
      desc: "按钮",
      setter: [
        {
          name: "type",
          label: "按钮类型",
          type: "select",
          options: [
            { label: "主按钮", value: "primary" },
            { label: "次按钮", value: "default" },
          ],
        },
        {
          name: "text",
          label: "文本",
          type: "input",
        },
      ],
      stylesSetter: [
        {
          name: "width",
          label: "宽度",
          type: "inputNumber",
        },
        {
          name: "hei=ght",
          label: "高度",
          type: "inputNumber",
        },
      ],
      component: Button,
      dev: ButtonDev,
      prod: ButtonProd,
    },
    Page: {
      name: "Page",
      defaultProps: {},
      desc: "页面",
      component: Page,
      dev: PageDev,
      prod: PageProd,
    },
  },
  registerComponent: (name, componentConfig) =>
    set((state) => {
      return {
        ...state,
        componentConfig: {
          ...state.componentConfig,
          [name]: componentConfig,
        },
      };
    }),
}));
