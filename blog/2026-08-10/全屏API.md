# 浏览器全屏 API 

<!-- truncate -->

## 概述

浏览器原生 Fullscreen API 允许网页中的任意元素（或整个页面）进入全屏模式，常用于视频播放器、演示文稿、游戏、图表可视化等场景。

* * *

## 核心 API 一览

| API | 作用  |
| --- | --- |
| `element.requestFullscreen()` | 让指定 DOM 元素进入全屏 |
| `document.exitFullscreen()` | 退出当前全屏状态 |
| `document.fullscreenElement` | 只读属性，返回当前全屏元素（无则返回 null） |
| `document.fullscreenEnabled` | 只读属性，判断浏览器是否支持全屏 |

* * *

## 使用流程

### 进入全屏

1. 获取目标 DOM 元素（如一个 `<div>`、`<video>` 或 `canvas`）
2. 在用户交互事件（点击、按键等）的回调中调用该元素的 `requestFullscreen()` 方法
3. 该方法返回 Promise：成功则元素进入全屏，失败则 reject

### 退出全屏

* 调用 `document.exitFullscreen()` 即可退出
* 用户也可以直接按 `Esc` 键退出，效果相同

### 切换全屏

* 通过 `document.fullscreenElement` 判断当前是否已全屏
* 若值为 null → 进入全屏
* 若值不为 null → 退出全屏

* * *

## 事件

### fullscreenchange

全屏状态发生任何变化时触发（进入、退出、按 Esc 等）。在 `document` 上监听即可。

典型用途：

* 进入全屏时隐藏工具栏、显示特定 UI
* 退出全屏时恢复界面布局

### fullscreenerror

全屏请求失败时触发。常见失败原因：

* 请求不是在用户手势回调中发起的
* 元素被 iframe 策略阻止
* 浏览器不支持全屏

* * *

## CSS 适配

可以使用 `:fullscreen` 伪类为全屏状态下的元素编写专属样式，例如：

* 调整布局为居中、填充视口
* 增大字体
* 隐藏或显示特定子元素

* * *

## 关键注意事项

### 1. 必须由用户手势触发

全屏请求**不能**在页面加载时自动调用，**必须**在用户交互事件（click、touch、keydown 等）的回调中执行。这是浏览器的安全策略，无法绕过。

### 2. iframe 需要额外声明

如果被全屏的页面运行在 iframe 中，父页面的 iframe 标签必须添加 `allow="fullscreen"` 属性，否则全屏请求会被拒绝。

### 3. 移动端兼容性差异

* **iOS Safari**：只支持 `<video>` 元素的全屏，其他元素调用全屏 API 无效或行为异常
* **Android**：不同浏览器厂商实现有差异，Chrome 支持较好
* 视频场景建议直接用 `<video>` 元素调用全屏，兼容性最优

### 4. 退出后的状态恢复

用户按 Esc 退出和你调用 exitFullscreen 退出都会触发 `fullscreenchange` 事件，所以不需要区分退出方式，统一在事件中处理恢复逻辑即可。

### 5. 多个元素嵌套全屏

Fullscreen API 以元素为单位，同一时刻只有一个元素处于全屏。如果 A 已全屏，再让 B 全屏，A 会自动退出，B 进入。

### 6. 全屏下的弹窗问题

全屏状态下 `alert()`、`confirm()` 等原生弹窗可能导致浏览器自动退出全屏，应避免在全屏模式下使用。

* * *

## 典型应用场景

| 场景  | 说明  |
| --- | --- |
| 视频播放器 | 点击全屏按钮让 `<video>` 元素全屏，优先选择视频元素而非外层容器，保证移动端兼容 |
| 在线 PPT / 演示 | 让投影片区域全屏，配合键盘翻页实现沉浸式演示 |
| 数据图表 / 可视化 | 让 canvas 或图表容器全屏，最大化展示空间 |
| 在线游戏 | 让游戏 canvas 全屏，提升沉浸感 |
| 图片查看器 | 点击图片后全屏查看大图 |
| 代码编辑器 | 全屏编辑区域，去除干扰 |

* * *

## 代码示例
```
<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

// 全屏状态：同时监听浏览器原生退出（如按 ESC）
const isFullscreen = ref(false)

function syncState() {
  isFullscreen.value = !!document.fullscreenElement
}

async function toggle() {
  try {
    if (!document.fullscreenElement) {
      // 进入全屏：对整个 document 或指定元素。这里对根元素全屏
      await document.documentElement.requestFullscreen()
    } else {
      await document.exitFullscreen()
    }
  } catch (e) {
    console.error('全屏操作失败：', e)
  }
}

onMounted(() => document.addEventListener('fullscreenchange', syncState))
onUnmounted(() => document.removeEventListener('fullscreenchange', syncState))
</script>

<template>
  <button @click="toggle">
    {{ isFullscreen ? '退出全屏' : '进入全屏' }}
  </button>
</template>
```