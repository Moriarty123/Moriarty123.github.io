# javascript实现函数重载

## 实现原理

使用一个对象，添加不同的参数个数或类型的函数实现到Map，每次执行函数时判断函数参数的个数和类型，从Map中取出对应参数的实现执行。

<!-- truncate -->

```javascript
// overload.mjs
export default function overload() {
  const fns = new Map();
  // 获取参数长度，根据参数长度获取对应的函数
  function fn(...args) {
    // 所有参数类型的字符串
    const key = args.map((a) => typeof a).join(",");
    if (fns.has(key)) {
      return fns.get(key)(...args);
    }
    throw new Error("No matching function found");
  }

  // 添加实现
  fn.add = function (...args) {
    // 最后一个参数为实现函数
    const f = args.pop();
    if (typeof f !== "function") {
      throw new Error("Last argument must be a function");
    }
    const key = args.join(",");
    fns.set(key, f);
  };
  return fn;
}

```



```javascript
// index.mjs
import overload from "./overload.mjs";

const fn = overload();

// 添加不同参数长度的实现
fn.add("", () => "No arguments");
fn.add("number", (a) => `One argument: ${a}`);
fn.add("number", "number", (a, b) => `Two arguments: ${a}, ${b}`);

console.log(fn());
console.log(fn(1));
console.log(fn(1, 2));

```

