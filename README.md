<div align="center">

# 📚 Easy Word

### 专为小学生设计的英语单词学习工具

一个简洁、高效的在线单词表应用，帮助孩子轻松查询和记忆每单元的英语单词。

[在线体验](#) | [快速开始](#快速开始) | [功能特点](#功能特点) | [使用指南](#使用指南)

---

</div>

<!--
预留截图位置：在此处添加应用截图
![应用截图](./docs/screenshots/main.png)
-->

## 📋 目录

- [项目简介](#项目简介)
- [核心特性](#核心特性)
- [在线演示](#在线演示)
- [快速开始](#快速开始)
- [功能特点](#功能特点)
- [技术栈](#技术栈)
- [项目结构](#项目结构)
- [使用指南](#使用指南)
- [自定义单词表](#自定义单词表)
- [常见问题](#常见问题)
- [浏览器支持](#浏览器支持)
- [贡献指南](#贡献指南)
- [开源协议](#开源协议)

## 🎯 项目简介

Easy Word 是一个专为小学生打造的英语单词学习工具，通过简洁直观的界面和科学的学习模式，帮助孩子更高效地掌握每单元的英语单词。无需注册登录，打开即用，学习进度自动保存。

### 为什么选择 Easy Word？

- ✅ **零门槛使用** - 无需注册，打开浏览器即可开始学习
- ✅ **科学记忆法** - 自测模式帮助主动回忆，提高记忆效率
- ✅ **进度可视化** - 实时显示学习进度，完成时有成就感反馈
- ✅ **随时随地学** - 响应式设计，手机、平板、电脑都能用
- ✅ **数据不丢失** - 本地存储，学习进度永久保存
- ✅ **家长可扩展** - 轻松添加自定义单词表

## ✨ 核心特性

<table>
<tr>
<td width="50%">

### 📖 智能单词表管理
- 按单元/主题组织单词
- 下拉选择器快速切换
- 自动记住上次学习位置
- 支持多个单词表并行管理

</td>
<td width="50%">

### 🎯 高效自测模式
- 一键隐藏所有中文释义
- 点击查看答案，自主控制节奏
- 防止被动记忆，提高记忆效率
- 适合考前复习和日常练习

</td>
</tr>
<tr>
<td width="50%">

### 📊 学习进度跟踪
- 实时显示已掌握单词数量
- 进度百分比可视化
- 全部完成时显示庆祝动画
- 激励孩子持续学习

</td>
<td width="50%">

### 💾 自动数据持久化
- 学习进度自动保存
- 已掌握单词标记永久记录
- 自测模式状态记忆
- 无需担心数据丢失

</td>
</tr>
</table>

## 🌐 在线演示

> 📌 **提示**: 如果您已部署此项目，请在此处添加在线演示链接

<!-- [🚀 立即体验](https://your-demo-url.com) -->

## 🚀 快速开始

### 环境要求

- Node.js >= 14.0.0
- npm >= 6.0.0 或 yarn >= 1.22.0

### 一分钟上手

```bash
# 1. 克隆项目
git clone https://github.com/your-username/easy-word.git
cd easy-word

# 2. 安装依赖
npm install

# 3. 启动开发服务器
npm run dev

# 4. 打开浏览器访问 http://localhost:5173
```

就是这么简单！现在您已经可以开始使用了。

### 📦 安装和使用

#### 安装依赖

```bash
npm install
# 或者使用 yarn
yarn install
```

#### 开发模式

启动本地开发服务器，支持热更新：

```bash
npm run dev
```

访问 `http://localhost:5173` 即可看到应用。

#### 构建生产版本

构建优化后的生产版本：

```bash
npm run build
```

构建产物将输出到 `dist/` 目录。

#### 预览生产版本

在本地预览构建后的生产版本：

```bash
npm run preview
```

## 🎨 功能特点

### 1️⃣ 单词表管理
- 📚 支持多个单词表，按单元/主题分类
- 🔄 下拉选择器快速切换不同单元
- 💡 自动记住上次学习的位置
- 📝 每个单词包含：英文、音标、中文释义

### 2️⃣ 智能自测模式
- 🙈 点击「自测模式」按钮，隐藏所有中文释义
- 👆 在自测状态下，点击灰色区域查看答案
- 🧠 通过主动回忆提高记忆效率
- 🔁 再次点击按钮退出自测模式

### 3️⃣ 学习进度跟踪
- ✅ 点击单词行（非释义区域）标记为已掌握
- 📊 顶部实时显示「已掌握 X / 总数 Y」
- 🎉 完成全部单词时显示庆祝动画
- 🔄 已掌握的单词会有视觉标识

### 4️⃣ 数据持久化
- 💾 使用浏览器 localStorage 本地存储
- 📍 自动保存上次打开的单词表
- ✏️ 记录所有已标记掌握的单词
- 🔐 数据仅存储在本地，保护隐私

### 5️⃣ 响应式设计
- 📱 完美适配手机、平板、电脑
- 🎨 简洁美观的用户界面
- ⚡ 流畅的交互动画
- 🌓 适合长时间学习使用

## 🏗️ 技术栈

### 前端技术

| 技术 | 说明 | 版本 |
|------|------|------|
| HTML5 | 语义化标签，现代化结构 | - |
| CSS3 | Flexbox、Grid 布局，动画效果 | - |
| JavaScript | ES6+ 语法，原生 JS 开发 | ES2015+ |
| Vite | 现代化构建工具，快速热更新 | ^5.0.0 |

### 核心特性

- 📦 **零依赖** - 纯原生 JavaScript，无需框架
- ⚡ **快速构建** - Vite 提供极速的开发体验
- 🎯 **模块化** - ES Modules 组织代码
- 💅 **现代 CSS** - 使用最新的 CSS 特性
- 📱 **响应式** - Mobile First 设计理念

## 📁 项目结构

```
easy-word/
├── index.html              # 应用入口页面
├── package.json            # 项目配置和依赖
├── vite.config.js          # Vite 构建配置
├── README.md               # 项目文档
└── src/                    # 源代码目录
    ├── main.js             # 应用主逻辑入口
    ├── style.css           # 全局样式文件
    └── data/               # 单词数据目录
        ├── index.js        # 数据统一导出
        ├── annie001.json   # Annie 001 单词表
        ├── annie002.json   # Annie 002 单词表
        ├── annie003.json   # Annie 003 单词表
        ├── unit2.json      # Unit 2 单词表
        ├── unit3.json      # Unit 3 单词表
        ├── unit4.json      # Unit 4 单词表
        ├── unit5.json      # Unit 5 单词表
        ├── unit6.json      # Unit 6 单词表
        └── play.json       # Play 主题单词表
```

### 关键文件说明

- `index.html` - 应用的 HTML 入口文件
- `src/main.js` - 包含所有交互逻辑和状态管理
- `src/style.css` - 定义应用的视觉样式和响应式布局
- `src/data/*.json` - 各单元的单词数据文件
- `src/data/index.js` - 集中管理和导出所有单词表

## 📖 使用指南

### 基本操作流程

#### 步骤 1: 选择单词表
点击页面顶部的下拉选择器，从列表中选择您想要学习的单元。

#### 步骤 2: 浏览单词
向下滚动浏览单词列表，每个单词显示：
- 英文单词
- 音标（如果有）
- 中文释义

#### 步骤 3: 标记已掌握
点击任意单词行（非释义区域），该单词会被标记为已掌握：
- 单词行会显示视觉标识
- 顶部进度计数器自动更新
- 数据自动保存到本地

#### 步骤 4: 使用自测模式
点击「自测模式」按钮进入复习状态：
- 所有中文释义会被隐藏
- 尝试回忆每个单词的意思
- 点击灰色区域查看答案
- 再次点击按钮退出自测模式

### 进阶技巧

- 💡 **快速复习**: 使用自测模式检验记忆效果
- 📊 **进度追踪**: 关注顶部的进度显示，设定每日目标
- 🎯 **重点标记**: 未掌握的单词可以重复学习
- 🔄 **定期复习**: 已掌握的单词也建议定期复习巩固

## ➕ 自定义单词表

### 添加新单词表

家长和老师可以轻松添加自定义单词表，只需两步：

#### 第一步：创建 JSON 数据文件

在 `src/data/` 目录下创建新的 JSON 文件（如 `unit7.json`）：

```json
{
  "id": "unit7",
  "name": "Unit 7",
  "description": "第七单元单词表",
  "words": [
    {
      "word": "hello",
      "phonetic": "/həˈləʊ/",
      "meaning": "你好；喂"
    },
    {
      "word": "world",
      "phonetic": "/wɜːld/",
      "meaning": "世界"
    },
    {
      "word": "beautiful",
      "phonetic": "/ˈbjuːtɪfl/",
      "meaning": "美丽的"
    }
  ]
}
```

#### 第二步：注册单词表

编辑 `src/data/index.js`，导入并添加到列表：

```javascript
import unit7 from './unit7.json'

export const wordLists = [
  // ... 其他已有的单词表
  unit7  // 添加新的单词表
]
```

保存后刷新页面，新单词表就会出现在下拉选择器中！

### 数据格式说明

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `id` | String | ✅ | 唯一标识符，建议使用英文 |
| `name` | String | ✅ | 显示名称，会出现在下拉列表中 |
| `description` | String | ⭕ | 单词表描述（可选） |
| `words` | Array | ✅ | 单词列表 |
| `words[].word` | String | ✅ | 英文单词 |
| `words[].phonetic` | String | ⭕ | 音标（可留空） |
| `words[].meaning` | String | ✅ | 中文释义 |

## 💾 数据存储说明

### LocalStorage 数据

应用使用浏览器的 localStorage 本地存储以下数据：

| 键名 | 存储内容 | 说明 |
|------|----------|------|
| `easyword_last_list_id` | 单词表 ID | 记录上次打开的单词表，下次自动打开 |
| `easyword_marked_words` | 已掌握单词列表 | 存储所有标记为已掌握的单词 |
| `easyword_hide_meaning` | 自测模式状态 | 记录是否处于自测模式 |

### 数据管理

- ✅ **自动保存**: 所有操作自动保存，无需手动操作
- 🔒 **本地存储**: 数据仅保存在浏览器本地，不会上传到服务器
- 🗑️ **清除数据**: 清除浏览器数据/缓存会重置所有学习进度
- 📱 **设备独立**: 不同设备/浏览器的数据独立存储

## ❓ 常见问题

### Q: 我的学习进度会丢失吗？
A: 不会。所有学习进度都保存在浏览器的 localStorage 中，除非您主动清除浏览器数据，否则进度会一直保留。

### Q: 可以在手机上使用吗？
A: 可以！应用采用响应式设计，完美支持手机、平板等移动设备。

### Q: 如何重置某个单词表的学习进度？
A: 目前需要通过浏览器开发者工具手动清除 localStorage 中的 `easyword_marked_words` 数据。后续版本会添加重置功能。

### Q: 音标显示为空怎么办？
A: 部分单词表可能没有录入音标信息。您可以手动编辑对应的 JSON 文件添加音标。

### Q: 可以导出学习进度吗？
A: 当前版本暂不支持。如果您需要备份数据，可以在浏览器开发者工具中导出 localStorage 数据。

### Q: 支持多人使用吗？
A: 应用基于浏览器本地存储，同一浏览器的不同用户会共享数据。建议使用不同浏览器或浏览器的用户配置文件来区分不同用户。

### Q: 为什么自测模式下点击某些区域无法查看答案？
A: 自测模式下，需要点击释义区域（灰色区域）才能查看答案。点击单词行的其他位置会触发「标记掌握」功能。

## 🌐 浏览器支持

| 浏览器 | 版本要求 | 推荐 |
|--------|----------|------|
| Chrome | >= 90 | ✅ 推荐 |
| Edge | >= 90 | ✅ 推荐 |
| Safari | >= 14 | ✅ 推荐 |
| Firefox | >= 88 | ✅ 推荐 |
| Safari iOS | >= 14 | ✅ 移动端推荐 |
| Chrome Android | >= 90 | ✅ 移动端推荐 |

### 技术要求

应用依赖以下现代浏览器特性：
- ES6+ JavaScript 支持
- CSS Grid 和 Flexbox
- LocalStorage API
- CSS 动画和过渡效果

## 🤝 贡献指南

欢迎贡献代码、报告问题或提出新功能建议！

### 如何贡献

1. **Fork 本项目**
2. **创建特性分支** (`git checkout -b feature/AmazingFeature`)
3. **提交更改** (`git commit -m 'Add some AmazingFeature'`)
4. **推送到分支** (`git push origin feature/AmazingFeature`)
5. **提交 Pull Request**

### 贡献类型

- 🐛 报告 Bug
- 💡 提出新功能建议
- 📝 改进文档
- ✨ 提交代码补丁
- 📚 添加新的单词表数据
- 🎨 优化 UI/UX 设计

### 代码规范

- 使用有意义的变量和函数名
- 添加必要的注释
- 保持代码简洁清晰
- 遵循现有的代码风格

## 🗺️ 路线图

未来计划添加的功能：

- [ ] 🔊 单词发音功能
- [ ] 📊 学习统计和数据可视化
- [ ] 🎮 单词游戏和测验模式
- [ ] 📤 导出/导入学习进度
- [ ] 🌙 深色模式支持
- [ ] 🔍 单词搜索功能
- [ ] 📱 Progressive Web App (PWA) 支持
- [ ] 🗂️ 单词本分类管理
- [ ] ⚙️ 更多个性化设置选项

## 📄 开源协议

本项目采用 [MIT License](LICENSE) 开源协议。

```
MIT License

Copyright (c) 2025 Easy Word

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
```

## 💬 联系与支持

- 🌟 如果觉得有用，欢迎给项目点个 Star！

---

<div align="center">

**Easy Word** - 让英语学习更简单 📚

Made with ❤️ for students

[返回顶部](#-easy-word)

</div>
