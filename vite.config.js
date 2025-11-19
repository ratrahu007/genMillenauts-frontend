import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [["babel-plugin-react-compiler"]],
      },
      // 👇 ensures external ESM libs like framer-motion are compiled
      include: [/\.jsx$/, /\.tsx$/, /framer-motion/],
    }),
    tailwindcss(),
  ],
  optimizeDeps: {
    include: ["framer-motion"], // prebundle for Vite’s dependency graph
  },
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
  },
});
