import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// import path from "path";

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  // outputDir: path.resolve(__dirname, "../server/public"),
  // devServer: {
  //   proxy: {
  //     target: "http://localhost:3000",
  //   },
  // },
});
