---
slug: ES8
title: ES8
---

# ES8

## async 和 await

Async 和 await 关键字使异步函数可以像同步函数执行，是回调地狱的一种解决方案。

1. await 必须写在 async 函数中
2. await 右侧的表达式一般为 promise 对象
3. await 返回的是 promise 成功的值
4. await 的 promise 失败了, 就会抛出异常, 需要通过 try...catch 捕获处理

代码示例：

```javascript
const asyncA = () => {
  setTimeout(() => {
    console.log("asyncA");
  }, 1000);
};

const asyncB = () => {
  setTimeout(() => {
    console.log("asyncB");
  }, 2000);
};

const asyncC = () => {
  setTimeout(() => {
    console.log("asyncC");
  }, 3000);
};

const aysncD = async () => {
  await asyncA();
  await asyncB();
  await asyncC();
};

aysncD();
```

Await 读取文件内容

```javascript
const fs = require("fs");
const { resolve } = require("path");

function methodA() {
  return new Promise((resolve, reject) => {
    fs.readFile("./readFile.js", (error, data) => {
      if (error) reject(error);
      resolve(data);
    });
  });
}

async function methodB() {
  try {
    const data = await methodA();
    console.log(data.toString());
  } catch (error) {
    console.log(error);
  }
}

methodB();
```

## Object.values()和 Object.entries()

1. Object.values() 方法返回一个给定对象的所有可枚举属性值的数组
2. Object.entries() 方法返回一个给定对象自身可遍历属性 [key,value] 的数组
3. Object.getOwnPropertyDescriptors 该方法返回指定对象所有自身属性的描述对象

```
const man = {
    name: '蔡徐坤',
    hobby: ['唱','跳','rap','篮球'],
    age: 18
}

console.log(Object.keys(man));
console.log(Object.values(man));
console.log(Object.entries(man));
console.log(Object.getOwnPropertyDescriptor(man));
```

## 动态属性名

把属性名用[ ]括起来，则括号中就可以引用提前定义的变量。

```javascript
let attrName = "name";

const person = {
  [attrName]: "Mike",
  age: 18,
};

console.log(person[attrName]); // Mike
```
