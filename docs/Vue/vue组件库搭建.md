---
sidebar_position: 2
sidebar_label: vue组件库搭建
title: vue组件库搭建
---

# vue组件库搭建

## 生成vue项目

### 使用vue create

vue3推荐使用vue create创建项目，安装vue后，在想要创建项目的目录下在终端执行

```bash
vue create custom-ui
```

这里custom-ui是项目名称，回车后选择需要的功能添加，如router/typescript等

### 调整项目目录

刚创建的项目目录不合适开发组件，想要进行一些调整：

1. 将components提到根目录下，作为组件存放的目录
2. 删除原没有用的组件代码

3. 把src改名为examples，避免误认为是重要代码

4. 将vue.config.js中添加已修改的入口文件

### 引入自定义组件

引入组件时通常使用app.use()来引入，像app.use(router)，而app.use实际上是调用了组件中的install方法，全局绑定组件的方法为app.component(),所以在components中组件的目录下增加index.js来定义组件的install，组件目录下定义其功能。

### 实现card组件

此步骤可以替换为业务代码中的其他组件，这里仅举一个例子

设计如下的课程公共组件

#### 组件分析

组件分为上面的图片，中间的概要描述，下面的footer

需要传入的属性有下面这些

| 参数    | 说明     | 类型         | 是否必要 | 默认值 |
| :------ | -------- | ------------ | -------- | ------ |
| width   | 卡片宽度 | String       | false    | ---    |
| imgSrc  | 图片地址 | String       | true     | ---    |
| summary | 卡片概述 | String｜Slot | false    | ---    |
| footer  | 卡片底部 | Slot         | false    | ---    |

#### 代码实现

大概的实现方案如下：

Card.vue

```vue
<template>
  <div class="c-card" :style="{ width: width }">
    <img :src="imgSrc" alt="" />
    <div class="summary">
      {{ summary }}
      <slot></slot>
    </div>
    <slot name="footer"></slot>
  </div>
</template>

<script>
export default {
  name: "c-card",
  props: {
    width: { type: String, default: "270px" },
    imgSrc: { type: String, default: "" },
    summary: { type: String, default: "" },
  },
};
</script>

<style lang="css" scoped>
.c-card {
  width: 270px;
  height: 250px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0px 6px 10px 0 rgba(95, 101, 105, 0.15);
  padding-bottom: 8px;
}
img {
  width: 100%;
}
.summary {
  padding: 10px;
  font-size: 14px;
  color: #333;
  text-align: left;
  height: 50px;
}
</style>
```

App.vue

```vue
<template>
  <div id="app" class="flex">
    <c-card
      imgSrc="/card1.jpg"
      summary="SpringCloud+Netty集群实战千万级 IM系统"
    >
      <template v-slot:footer>
        <div class="footer">
          {{ "￥" + 1000 }}
        </div>
      </template>
    </c-card>
    <c-card imgSrc="/card2.png" summary="AIGC实战 -人人必修的人工智能课">
      <template v-slot:footer>
        <div class="footer">
          {{ "￥" + 1000 }}
        </div>
      </template></c-card
    >
    <c-card
      imgSrc="/card3.jpg"
      summary="Springboot+ChatGLM 实战AI数字人面试官系统"
    >
      <template v-slot:footer>
        <div class="footer">
          {{ "￥" + 1000 }}
        </div>
      </template></c-card
    >
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.flex {
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  box-sizing: border-box;
}
.footer {
  font-size: 16px;
  color: #f00;
  font-weight: bold;
  text-align: left;
  padding-left: 8px;
}
</style>
```

#### 界面展示

## 模块化打包

### 为什么需要模块化

前端模块化是为了解决js代码太过复杂的问题，有以下方案：

#### 使用全局函数

问题：污染全局命名空间，模块之间看不出直接关系

#### 命名空间

问题：内部状态可以被外部改写

#### 匿名函数自调用

问题：模块之间有依赖关系时不好处理，闭包不好理解

#### 模块化

以文件为模块，有自己的作用域，变量私有，解决了以上问题

### 模块化规范

#### CommonJS

有以下特点：

1. 文件作用域
2. 支持缓存
3. 同步加载，会带来阻塞脚本的运行，不适用于浏览器，适用于服务端

#### AMD

Asynchronous Module Definition 异步模块定义

有以下特点：

1. 文件作用域
2. 异步加载，适用于浏览器

#### UMD

Universal Module Definition 前后端跨平台模块化解决方案

实现原理：

1. 先判断是否支持Node.js, 支持则使用Node.js模块格式
2. 再判断是否支持AMD，支持则使用AMD方式
3. 两者都不支持，则将模块公开到全局（window/global）

### webpack

使用webpack打包

在项目根目录下增加webpack.config.js文件,使用glob读取components下的组件，并遍历获取list

使用VueLoaderPlugin处理vue文件，babel-loader处理js文件，css-loader处理css文件

Webpack.config.js

```js
const glob = require("glob");
const path = require("path");
const { VueLoaderPlugin } = require("vue-loader");
const list = {};

async function createList(dirPath, list) {
  // 获取所有的文件
  const files = glob.sync(`${dirPath}/**/index.js`);
  // 遍历文件，获取组件名
  files.forEach((file) => {
    const component = file.split("/")[3].split(".")[0];
    list[component] = file;
  });
}

createList("./components/lib", list);

module.exports = {
  entry: list,
  output: {
    filename: "[name].umd.js",
    path: path.resolve(__dirname, "dist"),
    library: "cui",
    libraryTarget: "umd",
  },
  mode: "development",
  plugins: [new VueLoaderPlugin()],
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: "vue-loader",
      },
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ["vue-style-loader", "css-loader"],
      },
    ],
  },
};
```

在components增加index.js,用于添加所有组件，全量加载

Index.js

```js
import Card from "./card";

const components = [Card];

const install = function (Vue) {
  if (install.installed) return;

  for (const component of components) {
    Vue.component(component.name, component);
  }
};

export default {
  install,
};
```

编译后的文件在dist中，支持全量引入或按需引入

## 发布组件库

### 发布到npm

组件库如果要允许其他人使用，需要发布到公共的仓库，这里使用npm做发布途径。

修改原项目的package.json文件,定义入口文件main，搜索的关键字keyword,作者author, 暴露给用户的目录files

首先需要登陆到npm

```bash
npm login
```

这里如果有如下的报错，修改下镜像

登陆后执行发布命令, 会发布到自己的仓库中，注意这里不能用已存在的项目名

```bash
npm publish
```

### 测试组件库

创建一个新的项目demo，引入组件库

```bash
npm i moriarty123-ui -D
```

运行过程中出现以下报错，原因是项目的package.json中的vue版本与node_modules的vue版本不匹配，解决方案：修改package.json的版本

引入后在main.js中使用

Main.js

```js
import { createApp } from "vue";
import App from "./App.vue";

import CUI from "moriarty123-ui/components/lib/index.js";

const app = createApp(App);
app.use(CUI);

app.mount("#myapp");
```

## 搭建组件库文档站点

### vuepress

vue+webpack，支持在markdown文件中使用vue组件，可以在现有的项目中创建站点

根据官方文档指导，创建并运行站点

官方文档：https://vuepress.vuejs.org/zh/guide/getting-started.html

创建docs目录存放文档，在.vuepress目录下config.js配置vuepress

config.js

```js
import { viteBundler } from "@vuepress/bundler-vite";
import { defaultTheme } from "@vuepress/theme-default";
import { defineUserConfig } from "vuepress";

export default defineUserConfig({
  bundler: viteBundler(),
  theme: defaultTheme(),
});
```

创建README.md文档作为默认文档

创建结果

### card组件文档

#### 在md文档中使用vue组件

Vuepress2.x需要进行配置才能使用vue组件，需要安装@vuepress/plugin-register-components

Config.js插件配置文件如下, componentsDir表示.vuepress/components目录下的组件全都注册为全局组件

```js
import { viteBundler } from "@vuepress/bundler-vite";
import { defaultTheme } from "@vuepress/theme-default";
import { defineUserConfig } from "vuepress";

import { registerComponentsPlugin } from "@vuepress/plugin-register-components";
import { getDirname, path } from "vuepress/utils";

const __dirname = import.meta.dirname || getDirname(import.meta.url);

export default defineUserConfig({
  bundler: viteBundler(),
  theme: defaultTheme({
    sidebar: ["/README.md", "/components/card.md"],
  }),

  plugins: [
    registerComponentsPlugin({
      componentsDir: path.resolve(__dirname, "./components"),
    }),
  ],
});
```

.vuepress目录下文件夹

card.md文件中使用card组件
