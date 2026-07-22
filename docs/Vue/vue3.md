---
sidebar_position: 1
sidebar_label: vue3基本概念
title: vue3基本概念
---

# vue3

## setup

setup函数接受两个参数props/context

如果解构了 `props` 对象，解构出的变量将会丢失响应性。推荐通过 `props.xxx` 的形式来使用其中的 props。可以使用 [toRefs()](https://cn.vuejs.org/api/reactivity-utilities.html#torefs) 和 [toRef()](https://cn.vuejs.org/api/reactivity-utilities.html#toref) 这两个工具函数

context是一个Setup 上下文对象,包含attires/slots/emits,是非响应式的，可以安全解构

expose 函数用于显式地限制该组件暴露出的属性

## 代码分离样例

父组件

```typescript
<template>
  {{ count }}
  <button @click#64;click="add">add</button>
  <HelloWorld id="hello" :propname="count" @minus="minus" />
</template>

<script>
import { defineComponent } from "vue";
import HelloWorld from "./components/HelloWorld.vue";
import useCount from "./utils/useCount.ts";

export default defineComponent({
  components: { HelloWorld },
  setup() {
    return {
      ...useCount(),
    };
  },
});
</script>

```

子组件

```typescript
<template>
  <div>
    <div>{{ propname }}</div>
    <button @click#64;click="minus">minus</button>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  props: ["propname"],
  emits: ["minus"],
  setup(_props, { emit }) {
    const minus = () => {
      emit("minus");
    };
    return {
      minus,
    };
  },
});
</script>

```

utils

```typescript
import { ref } from "vue";

const useCount = () => {
  const count = ref(0);

  const add = () => {
    count.value++;
  };

  const minus = () => {
    count.value--;
  };

  return {
    count,
    add,
    minus,
  };
};

export default useCount;
```

## 条件渲染

### v-if

### v-else

### v-else-if

v-if不要和v-for同时使用

## 列表渲染

### v-for,需要使用key做唯一标识

支持使用范围值，起始位置为1

```html
<div v-for="i in 10" :key="i">{{ i }}</div>
```

### 数组变化监听

使用以下函数会监听到数组变化

- `push()`

- `pop()`

- `shift()`

- `unshift()`

- `splice()`

- `sort()`

- `reverse()`

而使用以下函数需要赋值给原数组

- `filter()`
- `concat()`
- `slice()`

## 事件处理

### 内联事件

### 方法事件

### 原生事件对象

```typescript
<template>
  <div>
    {{ count }}
    <button @click#64;click="count++">内联事件</button>
    <button @click#64;click="add">方法事件</button>
    <button @click#64;click="addWithEvent($event)">原生事件对象</button>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";

export default defineComponent({
  setup() {
    const count = ref(0);

    const add = () => {
      count.value++;
    };
    const addWithEvent = (event) => {
      console.log(event);
      count.value++;
    };
    return {
      count,
      add,
      addWithEvent,
    };
  },
});
</script>

```

### 修饰符

#### 事件修饰符

- `.stop` 停止事件传递
- `.prevent` 阻止事件默认行为
- `.self` 只触发自身元素的事件
- `.capture` 事件冒泡时，优先处理带该修饰符的元素
- `.once` 事件只执行一次
- `.passive` 一般用于触摸事件的监听器，可以用来改善移动端设备的滚屏性能

使用修饰符时需要注意调用顺序，因为相关代码是以相同的顺序生成的。因此使用 `@click#64;click.prevent.self` 会阻止**元素及其子元素的所有点击事件的默认行为**，而 `@click#64;click.self.prevent` 则只会阻止对元素本身的点击事件的默认行为。

请勿同时使用 `.passive` 和 `.prevent`，因为 `.passive` 已经向浏览器表明了你*不想*阻止事件的默认行为。如果你这么做了，则 `.prevent` 会被忽略，并且浏览器会抛出警告。

#### 键盘按键修饰符

- `.enter`
- `.tab`
- `.delete` (捕获“Delete”和“Backspace”两个按键)
- `.esc`
- `.space`
- `.up`
- `.down`
- `.left`
- `.right`

#### 鼠标按键修饰符

- `.left`
- `.right`
- `.middle`

#### 系统按键修饰符

使用以下系统按键修饰符来触发鼠标或键盘事件监听器，只有当按键被按下时才会触发

- `.ctrl`
- `.alt`
- `.shift`
- `.meta`

`.exact` 修饰符允许精确控制触发事件所需的系统修饰符的组合。

## 生命周期

<img src="https://cn.vuejs.org/assets/lifecycle_zh-CN.W0MNXI0C.png" alt="组件生命周期图示" style={{zoom: '50%'}} />

## 事件监听

### watch

副作用清理

onWatcherCleanup

```typescript
<template>
  <div>
    {{ id }}
    <button @click#64;click="click">aa</button>
  </div>
</template>

<script>
import { defineComponent, onWatcherCleanup, ref, watch } from "vue";

export default defineComponent({
  setup() {
    let id = ref(0);
    const click = () => {
      id.value += 100;
    };

    watch(id, (newId) => {
      const controller = new AbortController();

      fetch(`/api/${newId}`, { signal: controller.signal }).then(() => {
        // 回调逻辑
      });

      onWatcherCleanup(() => {
        // 终止过期请求
        controller.abort();
      });
    });

    return {
      id,
      click,
    };
  },
});
</script>

<style lang="scss" scoped></style>

```

作为替代，`onCleanup` 函数还作为第三个参数传递给侦听器回调，以及 `watchEffect` 作用函数的第一个参数

### 回调时机

watch的回调时机在父组件更新之后，Dom更新之前，如果想要在Dom更新之后回调，应修改配置参数`flush: 'post'`

```html
<template>
  <div>
    <button
      id="aa"
      @click#64;click="
        r++;
        s++;
      "
    >
      {{ r }} - {{ s }}
    </button>
  </div>
</template>

<script>
  import { ref, watchEffect } from "vue";
  export default {
    setup() {
      let r = ref(2);
      let s = ref(10);
      watchEffect(
        () => {
          console.log(r.value, s.value);
          console.log(
            document.querySelector("#aa") &&
              document.querySelector("#aa").innerText,
          );
        },
        {
          flush: "post",
        },
      );
      return {
        r,
        s,
      };
    },
  };
</script>
```

watchEffect则有另一个API：watchPostEffect

### 同步监听器

建一个同步触发的侦听器，它会在 Vue 进行任何更新之前触发,`flush: 'sync'`

watchEffect则有另一个API：watchSyncEffect

```typescript
watchSyncEffect(() => {
  console.log("sync");
  console.log(r.value, s.value);
  const aa = document.querySelector("#aa");
  console.log(aa && aa.innerText);
});
```

### 停止监听器

watch方法在异步方法中，监听器不会自动销毁

```typescript
<script setup>
import { watchEffect } from 'vue'

// 它会自动停止
watchEffect(() => {})

// ...这个则不会！
setTimeout(() => {
  watchEffect(() => {})
}, 100)
</script>
```

## 模板引用

使用辅助函数useTemplateRef进行模板引用访问

```typescript
<template>
  <div>
    <input ref="input" />
  </div>
</template>

<script>
import { defineComponent, onMounted, useTemplateRef } from "vue";

export default defineComponent({
  setup() {
    const input = useTemplateRef("input");
    onMounted(() => {
      console.log(input);
      if (input.value) {
        input.value.focus();
      }
    });
    return {};
  },
});
</script>

<style lang="scss" scoped></style>

```

## 透传attrs

使用useAttrs访问透传的attrs

```typescript
<template>
  <div>{{ attrs }}</div>
</template>

<script setup>
import { useAttrs } from "vue";

const attrs = useAttrs();
console.log(attrs);
</script>
```

## 祖孙之间传递数据

祖宗组件使用provide传递数据

```typescript
<template>
  <provideParent></provideParent>
</template>

<script>
import { provide, reactive, toRefs } from "vue";
import provideParent from "./components/provide-parent.vue";

export default {
  components: { provideParent },
  setup() {
    const state = reactive({
      count: 0,
    });
    provide("state", state);

    return {
      ...toRefs(state),
    };
  },
};
</script>

<style lang="scss" scoped></style>

```

孙子组件使用inject接受数据

```typescript
<template>
  <div></div>
</template>

<script>
import { inject } from "vue";

export default {
  setup() {
    const state = inject("state");
    console.log(state);
    return {};
  },
};
</script>

<style lang="scss" scoped></style>

```

**建议尽可能将任何对响应式状态的变更都保持在供给方组件中**

## 异步组件

使用defineAsyncComponent定义异步组件

```typescript
<template>
  <button @click#64;click="show = true">show</button>
  <div class="container">
    <sync-component v-if="show"></sync-component>
  </div>
</template>

<script>
import { defineAsyncComponent, ref } from "vue";

export default {
  components: {
    "sync-component": defineAsyncComponent({
      loader: () => import("./components/sync-component.vue"),
      delay: 2000,
      timeout: 5000,
      loadingComponent: () => import("./components/sync-loading.vue"),
    }),
  },
  setup() {
    const show = ref(false);
    return { show };
  },
};
</script>
```

与同步组件不一样的是，异步组件只在用到了才加载

### 使用Suspense

```
<template>
  <button @click#64;click="show = true">show</button>
  <div class="container">
    <Suspense>
      <template #default>
        <sync-component class="box"></sync-component>
      </template>
      <template #fallback>
        <div class="box">loading</div>
      </template>
    </Suspense>
  </div>
</template>

<script>
import { ref } from "vue";
import SyncComponent from "./components/sync-component.vue";

export default {
  components: {
    SyncComponent,
  },
  setup() {
    const show = ref(false);
    return { show };
  },
};
</script>
```

## 逻辑复用

### 使用组合式API

示例

```javascript
// mouse.js
import { ref, onMounted, onUnmounted } from "vue";

// 按照惯例，组合式函数名以“use”开头
export function useMouse() {
  // 被组合式函数封装和管理的状态
  const x = ref(0);
  const y = ref(0);

  // 组合式函数可以随时更改其状态。
  function update(event) {
    x.value = event.pageX;
    y.value = event.pageY;
  }

  // 一个组合式函数也可以挂靠在所属组件的生命周期上
  // 来启动和卸载副作用
  onMounted(() => window.addEventListener("mousemove", update));
  onUnmounted(() => window.removeEventListener("mousemove", update));

  // 通过返回值暴露所管理的状态
  return { x, y };
}
```

```typescript
<template>
  <div>x: {{ x }} y: {{ y }}</div>
</template>

<script>
import { useMouse } from "./utils/useMouse.ts";

export default {
  setup() {
    return {
      ...useMouse(),
    };
  },
};
</script>
```

### 接口代码复用

整合接口返回的错误及正确结果

```typescript
// fetch.js
import { ref, watchEffect, toValue } from "vue";

export function useFetch(url) {
  const data = ref(null);
  const error = ref(null);

  const fetchData = () => {
    // reset state before fetching..
    data.value = null;
    error.value = null;

    fetch(toValue(url))
      .then((res) => res.json())
      .then((json) => (data.value = json))
      .catch((err) => (error.value = err));
  };

  watchEffect(() => {
    fetchData();
  });

  return { data, error };
}
```

watchEffect监听URL变化，重新下发接口

```typescript
<template>
  {{ fetchData }}
  {{ fetchError }}
  <button @click#64;click="add">add</button>
</template>

<script>
import { watchEffect, ref } from "vue";
import { useFetch } from "./utils/useFetch.ts";

export default {
  setup() {
    let id = 100;
    const url = ref(`/initial/url/${id}`);
    let fetchData = ref();
    let fetchError = ref();

    const add = () => {
      id += 100;
      url.value = `/initial/url/${id}`;
    };

    watchEffect(() => {
      const { data, error } = useFetch(url);
      fetchData.value = data;
      fetchError.value = error;
    });

    return {
      fetchData,
      fetchError,
      add,
    };
  },
};
</script>
```

### 组合式API和其他模式的比较

#### 与mixin的比较

mixin的缺点有

**不清晰的数据来源**：多个mixin时，某个属性来源于哪个mixin不够明确，组合式API通过解构方法，使属性来源比较明确

**命名空间冲突**：多个不同mixin可能造成命名冲突，组合式API在解构式可以重命名，避免重名

**隐式的跨 mixin 交流**：组合式API可以在一个响应式函数作为另一个响应式函数的参数，避免隐形耦合

#### 与无渲染组件的比较

无渲染组件需要vue实例的开销，建议在纯逻辑抽象时使用组合式API，在涉及组件布局和逻辑抽象时使用无渲染组件

## 自定义指令

指令都是v开头，没有使用 `<script setup>` 的情况下，自定义指令需要通过 `directives` 选项注册

v-focus

```typescript
const vFocus = {
  mounted: (el) => el.focus(),
};

export default vFocus;
```

### 指令钩子

自定义指令可以使用以下钩子

```
const myDirective = {
  // 在绑定元素的 attribute 前
  // 或事件监听器应用前调用
  created(el, binding, vnode) {
    // 下面会介绍各个参数的细节
  },
  // 在元素被插入到 DOM 前调用
  beforeMount(el, binding, vnode) {},
  // 在绑定元素的父组件
  // 及他自己的所有子节点都挂载完成后调用
  mounted(el, binding, vnode) {},
  // 绑定元素的父组件更新前调用
  beforeUpdate(el, binding, vnode, prevVnode) {},
  // 在绑定元素的父组件
  // 及他自己的所有子节点都更新后调用
  updated(el, binding, vnode, prevVnode) {},
  // 绑定元素的父组件卸载前调用
  beforeUnmount(el, binding, vnode) {},
  // 绑定元素的父组件卸载后调用
  unmounted(el, binding, vnode) {}
}
```

### 钩子参数

```
el：指令绑定到的元素。这可以用于直接操作 DOM。

binding：一个对象，包含以下属性。

value：传递给指令的值。例如在 v-my-directive="1 + 1" 中，值是 2。
oldValue：之前的值，仅在 beforeUpdate 和 updated 中可用。无论值是否更改，它都可用。
arg：传递给指令的参数 (如果有的话)。例如在 v-my-directive:foo 中，参数是 "foo"。
modifiers：一个包含修饰符的对象 (如果有的话)。例如在 v-my-directive.foo.bar 中，修饰符对象是 { foo: true, bar: true }。
instance：使用该指令的组件实例。
dir：指令的定义对象。
vnode：代表绑定元素的底层 VNode。

prevVnode：代表之前的渲染中指令所绑定元素的 VNode。仅在 beforeUpdate 和 updated 钩子中可用。


```

### 全局定义

可以直接在app定义指令，如果指令只涉及mounted和updated，可以简化为一个箭头函数

```typescript
import { createApp } from "vue";
import App from "./App.vue";

createApp(App)
  .directive("focus", {
    mounted: (el) => el.focus(),
  })
  .directive("color", (el, binding) => {
    // 这会在 `mounted` 和 `updated` 时都调用
    el.style.color = binding.value;
  })
  .mount("#app");
```

## 内置组件

### Transition

用于样式过渡和动画，.v-enter-active,.v-leave-active定义切换前的样式， .v-enter-from,.v-leave-to定义切换后的样式

一共有 6 个应用于进入与离开过渡效果的 CSS class。

![过渡图示](https://cn.vuejs.org/assets/transition-classes.DYG5-69l.png)

```javascript
<template>
  <button @click#64;click="show = !show">Toggle</button>
  <Transition>
    <p v-if="show">hello</p>
  </Transition>
</template>

<script>
import { ref } from "vue";

export default {
  setup() {
    return { show: ref(false) };
  },
};
</script>

<style lang="css" scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}
.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>

```

#### 过渡效果名

可以给 `<Transition>` 组件传一个 `name` prop 来声明一个过渡效果名，将v-改为定义的名称

#### 自定义过渡 class

你也可以向 `<Transition>` 传递以下的 props 来指定自定义的过渡 class：

- `enter-from-class`
- `enter-active-class`
- `enter-to-class`
- `leave-from-class`
- `leave-active-class`
- `leave-to-class`

#### Javascript钩子

transition允许在js中添加钩子函数

```html
<Transition
  @before-enter="onBeforeEnter"
  @enter="onEnter"
  @after-enter="onAfterEnter"
  @enter-cancelled="onEnterCancelled"
  @before-leave="onBeforeLeave"
  @leave="onLeave"
  @after-leave="onAfterLeave"
  @leave-cancelled="onLeaveCancelled"
>
  <!-- ... -->
</Transition>
```

加上:css="false"可以避免css对动画产生干扰

#### 过渡模式

向Transition传入一个mode设置过渡模式

示例：先隐藏之前元素再展示当前元素

```html
<Transition mode="out-in"> ... </Transition>
```

### TransitionGroup

`<TransitionGroup>` 是一个内置组件，用于对 `v-for` 列表中的元素或组件的插入、移除和顺序改变添加动画效果。

### KeepAlive

`<KeepAlive>` 是一个内置组件，它的功能是在多个组件间动态切换时缓存被移除的组件实例。

### Teleport

`<Teleport>` 是一个内置组件，它可以将一个组件内部的一部分模板“传送”到该组件的 DOM 结构外层的位置去。

如果 `<Teleport>` 包含了一个组件，那么该组件始终和这个使用了 `<Teleport>` 的组件保持逻辑上的父子关系。传入的 props 和触发的事件也会照常工作。

### Suspense

`<Suspense>` 是一个内置组件，用来在组件树中协调对异步依赖的处理。它让我们可以在组件树上层等待下层的多个嵌套异步依赖项解析完成，并可以在等待时渲染一个加载状态。

## 工具链

### vite

### devtools

### vitest

### Vue-Router

### pinia

## 测试

编写单元测试是为了验证小的、独立的代码单元是否按预期工作。一个单元测试通常覆盖一个单个函数、类、组合式函数或模块。单元测试侧重于逻辑上的正确性，只关注应用整体功能的一小部分。

推荐方案：vitest/vue-test-utils

组件测试应该捕捉组件中的 prop、事件、提供的插槽、样式、CSS class 名、生命周期钩子，和其他相关的问题。

组件测试不应该模拟子组件，而应该像用户一样，通过与组件互动来测试组件和其子组件之间的交互。例如，组件测试应该像用户那样点击一个元素，而不是编程式地与组件进行交互。

推荐方案：vitest/vue-test-utils

端到端测试通常会捕捉到路由、状态管理库、顶级组件（常见为 App 或 Layout）、公共资源或任何请求处理方面的问题。如上所述，它们可以捕捉到单元测试或组件测试无法捕捉的关键问题。

推荐方案：Cypress

## 代码优化

### 更新优化

vue对props有做了优化，一个子组件只会在其至少一个 props 改变时才会更新

相对与

```html
<ListItem v-for="item in list" :id="item.id" :active-id="activeId" />
```

以下的代码中其他元素的active不会发生改变，不会影响更新

```html
<ListItem v-for="item in list" :id="item.id" :active="item.id === activeId" />
```

### 计算属性稳定性

在 Vue 3.4 及更高版本中，计算属性仅在其计算值较前一个值发生更改时才会触发副作用

## v-model

### 使用defineModel进行双向绑定

const title = defineModel('title’)，定义父组件传递的值

需要额外的 prop 选项，应该在 model 名称之后传递
```
const title = defineModel('title', { required: true })
```

### 自定义v-model修饰符

通过modifiers获取修饰符，在defineModel的set函数修改

```
<MyComponent v-model.capitalize="myText" />

const [model, modifiers] = defineModel({
  set(value) {
    if (modifiers.capitalize) {
      return value.charAt(0).toUpperCase() + value.slice(1)
    }
    return value
  }
})
```

## 透传attribute

父组件调用子组件的元素的class/style/事件会传递给子组件

### 禁用透传

```
<script setup>
defineOptions({
  inheritAttrs: false
})
// ...setup 逻辑
</script>
```

可以通过$attrs获取所有的除props和emit绑定的属性，然后转给下层的元素

```
<div class="btn-wrapper">
  <button class="btn" v-bind="$attrs">Click Me</button>
</div>
```

可以使用useAttrs获取绑定属性
```
<script setup>
import { useAttrs } from 'vue'
const attrs = useAttrs()
</script>
```

## 插槽

通过$slots获取插槽

### 作用域插槽

作用域插槽可以获取父子组件的数据,通过子组件标签上的 v-slot 指令，直接接收到了一个插槽 props 对象

```
<MyComponent v-slot="slotProps">
  {{ slotProps.text }} {{ slotProps.count }}
</MyComponent>
```

插槽上的 name 是一个 Vue 特别保留的 attribute，不会作为 props 传递给插槽

即使是默认插槽，也需要加template

## 依赖注入

建议尽可能将任何对响应式状态的变更都保持在供给方组件中，如果需要在依赖方更新，最好再传递一个更新方法使用Symbol作为注入名，避免重复

## 组合式函数

与Mixin的对比

1. 不清晰的数据来源
2. 命名空间冲突
3. 隐式的跨Mixin交流

与无渲染组件的对比组合式函数相对于无渲染组件的主要优势是：组合式函数不会产生额外的组件实例开销。当在整个应用中使用时，由无渲染组件产生的额外组件实例会带来无法忽视的性能开销。推荐在纯逻辑复用时使用组合式函数，在需要同时复用逻辑和视图布局时使用无渲染组件。

## 内置组件

### transition

使用transition实现动画，将transition包裹组件，使用类名定义动画

```
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
```

通过监听Transition组件事件的方式在过渡过程中挂上钩子函数

```
<Transition
  @before-enter="onBeforeEnter"
  @enter="onEnter"
  @after-enter="onAfterEnter"
  @enter-cancelled="onEnterCancelled"
  @before-leave="onBeforeLeave"
  @leave="onLeave"
  @after-leave="onAfterLeave"
  @leave-cancelled="onLeaveCancelled"
>
  <!-- ... -->
</Transition>
```

### KeepAlive

通过 include 和 exclude控制哪些需要被缓存，通过 max控制最大缓存数

一个持续存在的组件可以通过 onActivated() 和 onDeactivated() 注册相应的两个状态的生命周期钩子

### Suspense

Suspense 组件有两个插槽：#default 和 #fallback。两个插槽都只允许一个直接子节点。在可能的时候都将显示默认插槽中的节点。否则将显示后备插槽中的节点。

Suspense组件会触发三个事件：pending、resolve 和 fallback。pending 事件是在进入挂起状态时触发。resolve 事件是在 default 插槽完成获取新内容时触发。fallback 事件则是在 fallback 插槽的内容显示时触发

## SSR

* 更快的首屏加载
* 统一的心智模型
* 更好的 SEO