---
title: 常见javascript函数
slug: common-javascript-methods
---

# 常见javascript函数

<!-- truncate -->

## 防抖
```
const debounce = (fn, delay) => {
  let timer = null;
  return function(...args) {
     if (timer) clearTimeout(timer);
     timer = setTimeout(()=> {
       fn.apply(this, args)
     }, delay)
  }
}
```

## 节流
```
const throttle = (fn, delay) => {
  let lastTime = 0;
  return function(...args) {
    let now = new Date().getTime();
    if (now > lastTime + delay) {
      fn.apply(this, args);
      lastTime = now;
    }
  }
}
```

## apply
将方法绑定到Function原型链上再解绑
```
Function.prototype.myApply = function(context, args) {
  context = context ?? globalThis;
  context = Object(context);
  args = args ?? [];
  const fnKey = Symbol(‘fn’)
  context[fnKey] = this;
  const result = context[fnKey](...args);
  delete context[fnKey];
  return result;
}
```

## call

将方法绑定到Function原型链上再解绑,与apply区别是接受的是不固定的参数
```
Function.prototype.myCall = function(context, ...args) {
  context = context ?? globalThis;
  context = Object(context);
  const fnKey = Symbol(‘fn’)
  context[fnKey] = this;
  const result = context[fnKey](...args);
  delete context[fnKey];
  return result;
}
```

## bind
bind方法不立即执行，等调用时再执行
```
Function.prototype.myBind = function(context, ...callArgs) {
  const self = this;
  const bind = function(...preArgs) {
    const finalContext = this instanceof bind ? this : context ?? globalThis;
    return self.apply(finalContext, [...callArgs, ...preArgs])
  }
  bind.prototype = Object.create(self.prototype);
  return bind;
}
```

## 深拷贝
```
const deepClone = (obj, map = new WeakMap()) => {
  if (obj === null || typeof obj !== 'object') return obj;
  if(map.has(obj)) return map.get(obj);
  const copy = Array.isArray(obj)?[]:{}
  map.set(obj, copy);
  for(const key of Reflect.ownKeys(obj)) {
    copy[key] = deepClone(obj[key], map)
  }
  return copy
}
```

## 柯里化
将多参数函数转为嵌套的一元函数链，直到参数收集完毕才执行
```
const curry = (fn, ...args) => {
  if (args.length >= fn.length) return fn(...args)
  return (...args2) => curry(fn, ...args, ...args2)
}
```

## 偏函数
固定一部分参数，返回接收剩余参数的新函数，不关心参数总数，调用时立即执行
```
const partial = (fn, ...args) => {
  return (...args2) => fn(...args, ...args2)
}
```