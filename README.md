# Easy Word

一个专为小学生设计的英语单词学习工具，帮助孩子随时查询和记忆每单元的单词表。

## 功能特点

- **单词表管理** - 按单元组织单词，下拉选择器快速切换
- **自测模式** - 隐藏中文释义，点击查看答案，方便背诵检验
- **学习进度** - 显示已掌握单词数量，全部完成时显示庆祝动画
- **标记掌握** - 点击单词行标记为已掌握，进度自动更新
- **数据持久化** - 使用 localStorage 保存学习进度和上次打开的列表
- **响应式设计** - 支持桌面端和移动端，适配各种屏幕尺寸

## 技术栈

- HTML5
- CSS3 (Flexbox, Grid, 动画)
- Vanilla JavaScript (ES6+)
- Vite (构建工具)

## 安装和使用

### 安装依赖

```bash
npm install
```

### 开发模式

```bash
npm run dev
```

### 构建生产版本

```bash
npm run build
```

### 预览生产版本

```bash
npm run preview
```

## 项目结构

```
easy-word/
├── index.html              # 主页面
├── package.json            # 项目配置
├── vite.config.js          # Vite 配置
└── src/
    ├── main.js             # 主逻辑
    ├── style.css           # 样式文件
    └── data/
        ├── index.js        # 数据导出
        ├── annie001.json   # 单词表：Annie001
        ├── annie002.json   # 单词表：Annie002
        ├── annie003.json   # 单词表：Annie 003
        ├── unit2.json      # 单词表：Unit 2
        ├── unit3.json      # 单词表：Unit 3
        ├── unit4.json      # 单词表：Unit 4
        ├── unit5.json      # 单词表：Unit 5
        ├── unit6.json      # 单词表：Unit 6
        └── play.json       # 单词表：Play
```

## 添加新单词表

1. 在 `src/data/` 目录下创建新的 JSON 文件，格式如下：

```json
{
  "id": "unit7",
  "name": "Unit 7",
  "description": "单词表描述",
  "words": [
    {
      "word": "hello",
      "phonetic": "",
      "meaning": "你好"
    },
    {
      "word": "world",
      "phonetic": "",
      "meaning": "世界"
    }
  ]
}
```

2. 在 `src/data/index.js` 中导入并添加到列表：

```javascript
import unit7 from './unit7.json'

export const wordLists = [
  // ... 其他列表
  unit7
]
```

## 使用说明

1. **选择单词表** - 点击顶部下拉选择器，选择要学习的单元
2. **自测模式** - 点击「自测模式」按钮隐藏所有释义
3. **查看答案** - 在自测模式下，点击灰色区域查看释义
4. **标记掌握** - 点击单词行（非释义区域）标记为已掌握
5. **查看进度** - 顶部显示已掌握单词数量

## 数据存储

应用使用浏览器 localStorage 存储以下数据：

- `easyword_last_list_id` - 上次打开的单词表 ID
- `easyword_marked_words` - 已标记掌握的单词
- `easyword_hide_meaning` - 自测模式状态

清除浏览器数据会重置学习进度。

## 浏览器支持

- Chrome (推荐)
- Safari
- Firefox
- Edge

## License

MIT
