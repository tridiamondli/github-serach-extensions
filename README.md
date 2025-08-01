# GitHub 高级搜索助手 🔍

<div align="center">

![GitHub Advanced Search Helper](assets/icons/icon128.png)

**一个功能强大的Chrome浏览器扩展，让GitHub搜索变得简单而高效**

[![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)](https://github.com/tridiamondli/github-serach-extensions)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![Language](https://img.shields.io/badge/Language-中文%20/%20English-yellow.svg)](#语言支持)

</div>

GitHub高级搜索助手是一款专为开发者打造的Chrome扩展，提供直观的可视化界面来构建复杂的GitHub搜索查询。无需记忆复杂的搜索语法，通过简单的勾选和填写即可精确定位到您需要的开源项目。

## ✨ 核心特性

### 📊 **多维度搜索范围**
- **项目名称** (`in:name`) - 在仓库名称中精确搜索
- **项目描述** (`in:description`) - 在项目描述中查找关键词
- **README文件** (`in:readme`) - 搜索项目文档内容
- **代码文件** (`in:file`) - 深入搜索源代码内容

### ⭐ **数量指标筛选**
- **Star数量范围** - 按星标数量精确筛选（支持最小值/最大值）
- **Fork数量范围** - 按分支数量筛选项目活跃度
- **热门项目模式** - 一键筛选高星级项目（>1000 stars）

### 📅 **时间维度筛选**
- **创建时间范围** - 按仓库创建时间筛选
- **最后更新时间** - 按最近推送时间筛选
- **灵活日期选择** - 支持起止日期自定义
- **相对时间快选** - 快速选择"最近一年"、"最近半年"等

### 🌍 **作者与组织筛选**
- **特定用户** - 搜索指定用户的所有仓库
- **组织筛选** - 搜索特定组织的项目
- **地区筛选** - 按开发者地理位置筛选

### 🚀 **特殊搜索模式**
- **Awesome项目** - 专门搜索awesome系列精选项目
- **热门趋势** - 自动应用热门项目筛选条件
- **文件名搜索** - 按特定文件名查找项目

### � **增强功能**
- **自动保存** - 智能记忆用户搜索偏好
- **中英双语** - 完整的国际化支持，一键切换

## 🚀 快速开始

### 💡 基础使用流程

1. **打开搜索助手**
   - 点击浏览器工具栏中的扩展图标

2. **输入搜索条件**
   - 在搜索框中输入关键词
   - 选择需要的搜索范围和筛选条件
   - 实时预览生成的搜索查询

3. **执行搜索**
   - 点击"搜索"按钮

### 📋 实用搜索示例

#### 🔥 寻找热门Vue.js项目
```
关键词: vue
搜索范围: ✓ 项目名称
编程语言: JavaScript
Stars: 最小值 5000
最后更新: 2023-01-01 到 现在
```

#### 📚 查找机器学习教程
```
关键词: machine learning tutorial
搜索范围: ✓ README文件 ✓ 项目描述
编程语言: Python
许可证: MIT
特殊模式: ✓ Awesome项目
```

#### 🛠️ 搜索React组件库
```
关键词: react component library
搜索范围: ✓ 项目名称 ✓ 项目描述
Stars: 最小值 1000
Forks: 最小值 100
编程语言: TypeScript
```

### 🎨 界面预览

#### 弹窗主界面
- 🎯 **简洁直观** - 分组清晰的搜索选项
- 💾 **智能记忆** - 自动保存上次搜索条件
- 🌐 **双语切换** - 一键中英文界面切换
- 📱 **响应式设计** - 适配不同屏幕尺寸


## � 安装指南


### 🔧 开发者模式安装

如果您想要体验最新功能或参与开发，可以通过开发者模式安装：

1. **下载项目**
   - 下载压缩包解压

2. **打开Chrome扩展管理**
   - 地址栏输入：`chrome://extensions/`
   - 或：菜单 → 更多工具 → 扩展程序

3. **启用开发者模式**
   - 右上角开启"开发者模式"开关

4. **加载扩展**
   - 点击"加载已解压的扩展程序"
   - 选择下载的项目文件夹
   - 确认扩展图标出现在工具栏


## � 高级搜索语法参考

### 🔤 基础语法
| 语法 | 说明 | 示例 |
|------|------|------|
| `keyword` | 基础关键词搜索 | `react hooks` |
| `in:name` | 在仓库名称中搜索 | `in:name vue` |
| `in:description` | 在项目描述中搜索 | `in:description "web framework"` |
| `in:readme` | 在README文件中搜索 | `in:readme installation` |
| `in:file` | 在代码文件中搜索 | `in:file useState` |

### 📊 数量筛选语法
| 语法 | 说明 | 示例 |
|------|------|------|
| `stars:>n` | 星标数大于n | `stars:>1000` |
| `stars:n..m` | 星标数在n到m之间 | `stars:100..500` |
| `forks:>n` | 分支数大于n | `forks:>50` |
| `size:>n` | 仓库大小（已弃用） | - |

### 📅 时间筛选语法
| 语法 | 说明 | 示例 |
|------|------|------|
| `created:>YYYY-MM-DD` | 创建时间晚于指定日期 | `created:>2023-01-01` |
| `created:YYYY-MM-DD..YYYY-MM-DD` | 创建时间范围 | `created:2022-01-01..2023-12-31` |
| `pushed:>YYYY-MM-DD` | 最后推送晚于指定日期 | `pushed:>2024-01-01` |

### 🛠️ 技术栈语法
| 语法 | 说明 | 示例 |
|------|------|------|
| `language:lang` | 指定编程语言 | `language:JavaScript` |
| `license:license` | 指定许可证 | `license:mit` |
| `extension:ext` | 指定文件扩展名 | `extension:js` |

### 👥 作者与组织语法
| 语法 | 说明 | 示例 |
|------|------|------|
| `user:username` | 指定用户的仓库 | `user:facebook` |
| `org:orgname` | 指定组织的仓库 | `org:microsoft` |
| `location:location` | 按地理位置筛选 | `location:china` |

### 🔍 复合搜索示例

#### 热门Vue.js项目
```
vue language:JavaScript stars:>5000 pushed:>2023-01-01
```

#### 机器学习Python库
```
"machine learning" language:Python license:mit stars:>1000
```

#### 微前端相关项目
```
"micro frontend" OR microfrontend in:name,description stars:>100
```

#### React TypeScript组件库
```
react component language:TypeScript stars:>500 in:name,description
```


## �️ 技术架构

### 💻 技术栈
- **前端技术**：HTML5、CSS3、原生JavaScript
- **扩展架构**：Chrome Extension Manifest V3
- **存储方案**：Chrome Storage API
- **国际化**：Chrome i18n API

### 📁 项目结构
```
github-search-extensions/
├── manifest.json           # 扩展配置文件
├── popup/                  # 弹窗界面
│   ├── popup.html         #   主界面HTML
│   ├── popup.css          #   样式文件
│   └── popup.js           #   交互逻辑
├── background/             # 后台服务
│   └── background.js      #   后台脚本
├── content/               # 内容脚本
│   ├── content.js        #   页面增强脚本
│   └── content.css       #   页面样式
├── utils/                 # 工具模块
│   ├── search.js         #   搜索构建器
│   ├── storage.js        #   存储管理
│   └── i18n.js           #   国际化工具
├── _locales/             # 多语言支持
│   ├── zh_CN/           #   中文语言包
│   └── en_US/           #   英文语言包
└── assets/              # 静态资源
    └── icons/           #   扩展图标
```


## 📄 许可证

本项目基于 [MIT License](LICENSE) 开源协议发布。

```
MIT License

Copyright (c) 2025 GitHub Search Extension Team

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
```