import react from "@vitejs/plugin-react";
import { inspectAttr } from 'kimi-plugin-inspect-react';
import path from "path";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  base: process.env.NODE_ENV === 'production' ? '/Overwatch-2-Hero-Counters/' : './',
  plugins: [inspectAttr(), react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
