---
sidebar_position: 1
sidebar_label: CustomRef
title: CustomRef
---

# 自定义 Ref--CustomRef

vue3 提供的对 Ref 的自定义 api，方便实现在双向绑定时进行其他操作的功能

创建一个自定义的 ref，显式声明对其依赖追踪和更新触发的控制方式。

## 以常见的方式实现防抖

输入框输入值，绑定 input 方法对 text 进行更新，input change 方法中 setTimeout 延时 1 秒赋值

```vue
<template>
  <div>
    <input type="text" @input="inputChange" />
    <div>{{ text }}</div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const text = ref("");
let timer;

const inputChange = (e) => {
  clearTimeout(timer);
  timer = setTimeout(() => {
    text.value = e.target.value;
  }, 1000);
};
</script>

<style lang="scss" scoped></style>
```

如果使用 lodash 的 debounce 函数可以这样实现

```vue
<template>
  <div>
    <input type="text" @input="debounceInput" />
    <div>{{ text }}</div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { debounce } from "lodash";

const text = ref("");

const inputChange = (e) => {
  text.value = e.target.value;
};

const debounceInput = debounce(inputChange, 1000);
</script>

<style lang="scss" scoped></style>
```

## 以自定义 Ref 实现防抖

```javascript
// customRef.js
import { customRef } from "vue";

const debounceRef = (value, delay = 1000) =>
  customRef((track, trigger) => {
    let timer;
    return {
      get() {
        track();
        return value;
      },
      set(newValue) {
        clearTimeout(timer);
        timer = setTimeout(() => {
          value = newValue;
          trigger();
        }, delay);
      },
    };
  });

export default debounceRef;
```

```
// vue
<template>
  <div>
    <input type="text" v-model="text" />
    <div>{{ text }}</div>
  </div>
</template>

<script setup>
import debounceRef from "../custom/debounceRef";

const text = debounceRef("");
</script>

<style lang="scss" scoped></style>

```

代码解释：

customRef 接受一个工厂函数，入参是 trace 和 trigger，trace 表示收集变量的依赖，trigger 表示触发模板的更新，把上面的代码拆成两部分看,customRef 代码和 ref 的逻辑基本一样, debounce 代码接受两个参数 value，delay，在 value 的 set 方法中设置 aetTimeout,延时 delay（ms），从而实现防抖，customRef 的使用方法跟 ref 一样，直接使用 v-model 绑定 customeRef 就可以,减少了代码量。

```javascript
customRef((track, trigger) => {
  return {
    get value() {
      // 依赖收集
      track();
      return value;
    },
    set value(newValue) {
      value = newValue;
      // 触发更新
      trigger();
    },
  };
});
```

## 总结

customeRef 本质上是对 trace，trigger 两个方法的调用时机自定义，对 trigger 延时更新就是防抖，如果不对 trace 和 trigger 修改，效果就和 ref 是一样的。通过 customRef,可以对很多重复的代码进行复用，减少代码维护。
