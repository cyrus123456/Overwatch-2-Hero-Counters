![alt text](image-1.png)
# 守望先锋英雄克制关系可视化

一个基于 React + TypeScript + Vite 的交互式可视化应用，用于展示《守望先锋 2》中英雄之间的克制关系。

## 在线演示

**[点击查看已部署的 GitHub Pages](https://cyrus123456.github.io/Overwatch-2-Hero-Counters/)**

你可以直接在线访问上面的链接，无需本地安装即可体验完整的英雄克制关系可视化功能！

## 🎮 功能特性

- **交互式力导向图**：使用 D3.js 实现英雄克制关系的动态可视化
- **实时搜索**：快速查找和筛选英雄
- **完整英雄库**：包含所有守望先锋 2 英雄及其职业分类（坦克、输出、支援）
- **克制关系展示**：清晰显示英雄之间的克制关系及强度等级
- **地图数据**：包含游戏中所有地图的相关信息
- **多语言支持**：内置国际化框架
- **深色/浅色主题**：现代化的 UI 设计配合主题切换

## 🚀 快速开始

### 环境要求

- Node.js >= 18
- npm 或 yarn 或 pnpm

### 安装依赖

```bash
npm install
# 或
yarn install
# 或
pnpm install
```

### 开发模式

```bash
npm run dev
```

应用将在 `http://localhost:5173` 启动，支持热重载 (HMR)。

### 生产构建

```bash
npm run build
```

### 预览构建结果

```bash
npm run preview
```

## 📦 项目结构

```
src/
├── components/          # React 组件
│   ├── ForceGraph.tsx   # 力导向图可视化组件
│   └── ui/              # UI 组件库（Radix UI 基础）
├── data/                # 数据定义
│   ├── heroData.ts      # 英雄数据和图片配置
│   ├── counterReasons.ts # 克制原因说明
│   └── mapData.ts       # 地图数据
├── hooks/               # 自定义 React Hooks
├── i18n/                # 国际化配置
└── lib/                 # 工具函数库
```

## 🛠️ 技术栈

- **框架**：React 19 + TypeScript
- **构建工具**：Vite
- **数据可视化**：D3.js 7
- **UI 组件**：Radix UI + TailwindCSS
- **主题切换**：next-themes
- **国际化**：i18n 支持

## 💡 使用指南

### 查看英雄克制关系

1. 应用启动后，会显示一个交互式力导向图
2. 每个节点代表一个守望先锋英雄
3. 节点之间的连线表示克制关系（从克制方指向被克制方）
4. 不同的英雄角色用不同的颜色区分

### 交互操作

- 点击英雄：展示其专属克制网并放大图标
- 拖拽图标：长按并移动英雄可手动调整位置
- 滚轮缩放：在画布滚动鼠标中键可放大缩小
- 悬停预览：移动鼠标到头像上可查看高亮并微缩无关项
- 移动画板：按住并拖拽空白处可平移整个关系图

### 克制强度说明

- ★★★ 绝对克制 (职业天敌)
- ★★ 明显克制 (强势压制)
- ★ 轻微克制 (博弈优势)

## 🔗 相关资源

- [守望先锋官方网站](https://overwatch.blizzard.com/)
- [React 官方文档](https://react.dev)
- [D3.js 文档](https://d3js.org)
- [Vite 文档](https://vitejs.dev)

## 📝 许可证

本项目仅供学习和参考使用。

## 👥 贡献

欢迎提交 Issue 和 Pull Request！

---

**注意**：《守望先锋》及其相关资源为暴雪娱乐公司 (Blizzard Entertainment) 的商标和知识产权。
