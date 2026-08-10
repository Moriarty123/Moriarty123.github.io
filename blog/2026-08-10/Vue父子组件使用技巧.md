# Vue父子组件数据流架构

<!-- truncate -->

> 一个父组件包含两个子组件，子组件各自需要不同接口的数据——该怎么组织数据获取？

* * *

## 目录

* [1. 问题背景](#1-问题背景)
* [2. 两种方案对比](#2-两种方案对比)
* [3. 推荐方案：Composable 分层模式](#3-推荐方案composable-分层模式)
* [4. 架构流程图](#4-架构流程图)
* [5. 最佳实践](#5-最佳实践)

* * *

## 1. 问题背景

假设有一个用户详情页：

    UserDashboard（父组件）
    ├── ProfileCard（子组件 A）  ← 需要 /api/users/:id
    └── OrderTable（子组件 B）   ← 需要 /api/users/:id/orders

核心问题：**谁来发请求、谁存数据、谁控制 loading/error 状态？**

* * *

## 2. 两种方案对比

### 方案 A：子组件自治

每个子组件各自 fetch 各自的数据。

    ProfileCard.vue          OrderTable.vue
        │                        │
        ▼                        ▼
     /api/users/:id        /api/users/:id/orders

**优点：**

* 子组件完全自包含，可在任意页面复用
* 支持按需加载（懒加载时才发请求）
* 父组件零负担

**缺点：**

* 无法统一控制 loading/error/empty 状态
* 子组件之间难以做数据协调
* 多个请求各自跑，没有编排能力

### 方案 B：父组件容器

父组件统一请求所有数据，通过 props 下发给子组件。

             UserDashboard
            ╱   fetch all   ╲
           ▼                 ▼
     /api/users/:id    /api/users/:id/orders
           │                 │
           ▼                 ▼
      ProfileCard        OrderTable
      (props.user)       (props.orders)

**优点：**

* 统一 loading/error 状态管理
* 可做数据协调（B 依赖 A 的返回值）
* 子组件变成纯展示，易于测试

**缺点：**

* 父组件容易臃肿（"上帝组件"）
* 子组件失去自包含能力
* 任一数据变化触发父组件重渲染

### 决策依据

| 场景  | 推荐方案 |
| --- | --- |
| 子组件数据完全独立，需跨页面复用 | 方案 A |
| 子组件数据强关联，需要全局一致状态 | 方案 B |
| **大多数实际项目** | **方案 C：Composable 分层** |

* * *

## 3. 推荐方案：Composable 分层模式

核心思想：**把数据获取逻辑抽到 composable 中，父组件调用 composable，子组件通过 props 消费数据。**

```text
    ┌─────────────────────────────────┐
    │         数据源 (API)             │
    │   /api/users/:id                │
    │   /api/users/:id/orders         │
    └──────────────┬──────────────────┘
                   │ fetch
                   ▼
    ┌─────────────────────────────────┐
    │   useUserDashboard() composable  │  ← 逻辑层
    │   - 发起请求                      │
    │   - 合并 loading / error         │
    │   - 缓存 & 去重                  │
    └──────────────┬──────────────────┘
                   │ return { profile, orders, ... }
                   ▼
    ┌─────────────────────────────────┐
    │   DashboardPage (父组件)          │  ← 编排层
    │   - isLoading → Skeleton         │
    │   - error → ErrorBlock           │
    │   - 渲染子组件                    │
    └──────┬──────────────┬───────────┘
           │ user         │ orders[]
           ▼              ▼
    ┌────────────┐  ┌──────────────┐
    │ ProfileCard│  │ OrderTable   │  ← 展示层
    │ (纯展示)    │  │ (纯展示)      │
    └────────────┘  └──────────────┘
```

**为什么这样分层？**

| 层   | 职责  | 改动影响范围 |
| --- | --- | --- |
| Composable | 请求逻辑、状态合并 | 只改这里 |
| 父组件 | 编排渲染（条件分支） | 只改这里 |
| 子组件 | 纯展示 | 只改这里 |

* * *

## 4. 架构流程图

```text
        ┌──────────────────────────────────────┐
        │            数据源 (API)               │
        │   /api/users/:id                     │
        │   /api/users/:id/orders              │
        └──────────────────┬───────────────────┘
                           │
                           ▼
        ┌──────────────────────────────────────┐
        │     useUserDashboard() composable     │
        │                                       │
        │  · fetch profile + orders            │
        │  · merge loading / error state        │
        │  · cache & deduplicate (vue-query)    │
        └──────────────────┬───────────────────┘
                           │
                           │ return { profile, orders, isLoading, ... }
                           ▼
        ┌──────────────────────────────────────┐
        │      DashboardPage (Parent)           │
        │                                       │
        │  isLoading  → <AppSkeleton />         │
        │  error      → <ErrorBlock />          │
        │  success    → render children         │
        └──────┬──────────────────────┬────────┘
               │                      │
          props.user            props.orders
               │                      │
               ▼                      ▼
        ┌──────────────┐     ┌──────────────┐
        │ ProfileCard  │     │ OrderTable   │
        │              │     │              │
        │  纯展示组件   │     │  纯展示组件   │
        │  无请求逻辑   │     │  无请求逻辑   │
        └──────────────┘     └──────────────┘
```

* * *

## 5. 最佳实践

### 5.1 什么时候用 composable 分层

* 子组件数据有关联性（B 依赖 A 的某个字段）
* 需要统一的 loading / error / empty 状态
* 多个子组件的数据需要协调

### 5.2 什么时候让子组件自治

* 子组件数据完全独立
* 子组件需要在不同页面复用
* 支持懒加载/按需请求

### 5.3 性能优化

* 用 `shallowRef` 替代 `ref` 处理大对象，避免深度追踪的性能开销
* 子组件用 `v-memo` 绑定关键依赖，避免无关重渲染
* 配合 `@tanstack/vue-query` 自动去重和缓存，相同 queryKey 共享数据

### 5.4 TypeScript 类型建议

* 为 composable 的返回值定义清晰的接口类型
* 使用 `MaybeRef<T>` 让参数同时支持 ref 和普通值
* 子组件 props 用 `defineProps<T>()` 泛型定义，获得类型推导

### 5.5 错误处理增强

* 区分不同接口的错误来源，提供针对性的重试策略
* 用 computed 合并多个 error，返回结构化的错误信息（type + message + retry）
* 父组件根据 error.type 决定展示局部重试还是整体错误页

* * *

## 总结

> **数据关联度高 → 父组件管理。数据独立 → 子组件自治。大多数场景 → composable 分层，两者兼得。**
> 
> 核心原则：composable 管数据获取，父组件管编排分发，子组件管展示。改需求时边界清晰——加骨架屏只改父组件，换接口只改 composable，调样式只改子组件。