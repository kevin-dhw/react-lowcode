import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // 配置scss
  css: {
    preprocessorOptions: {
      scss: {
        // 这里需要改，引入自己想要的
        // additionalData: `$injectedColor: orange;`,
        // additionalData: '@import "./src/styles/sassConfig.scss";',
      },
    },
  },
});
