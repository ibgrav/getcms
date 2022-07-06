import { resolve } from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [{ find: "src", replacement: resolve(process.cwd(), "src") }],
  },
  build: {
    outDir: "dist",
    sourcemap: true,
    minify: false,
    lib: {
      name: "GetCMS",
      entry: "/src/index.ts",
      formats: ["es", "umd"],
      fileName: (format) => `[name].${format}.js`,
    },
    rollupOptions: {
      external: ["react", "react/jsx-runtime", "react-dom/client"],
      output: {
        globals: {
          react: "React",
          "react/jsx-runtime": "jsxRuntime",
          "react-dom/client": "ReactDOMClient",
        },
      },
    },
  },
});
