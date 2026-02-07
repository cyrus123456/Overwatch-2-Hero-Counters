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
  build: {
    sourcemap: 'hidden', // 隐藏式 source map，不生成独立文件但可用于错误追踪
    // 或者选择以下方式之一：
    // sourcemap: false,      // 不生成 source map
    // sourcemap: true,       // 生成独立的 .map 文件 (最完整，适合生产环境调试)
    // sourcemap: 'inline',   // 生成内联的 source map (会增加打包体积)
    // sourcemap: 'hidden',   // 生成但不引用，适合上传到错误追踪平台
  },
  server: {
    // 开发环境 source map 模式
    // sourcemap: 'eval',     // 使用 eval 快速模式 (默认)
    // sourcemap: 'hidden',   // 不在错误信息中显示 source map
  },
});
