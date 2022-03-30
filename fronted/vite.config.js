import { defineConfig } from "vite";
import path, { resolve } from "path";
import vue from "@vitejs/plugin-vue";

// element-plus
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";

function pathResolve(dir) {
  return resolve(process.cwd(), dir);
}
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({ resolvers: [ElementPlusResolver()] }),
    Components({ resolvers: [ElementPlusResolver()] }),
  ],
  build: {
    outDir: pathResolve("../vueDjango/dist"),
  },
  server: {
    proxy: {
      "/api": {
        target: "http://127.0.0.1:8000/",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
  resolve: {
    alias: [
      {
        find: /\/@\//,
        replacement: pathResolve("src") + "/",
      },
    ],
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData:
          '@import "./src/assets/scss/_mixins.scss"; @import "./src/assets/scss/_variables.scss";', // 引入全局的css
      },
    },
  },
});
