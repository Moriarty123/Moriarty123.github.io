---
slug: ES6
title: ES6
---

# ES6

## let const 声明变量

- let 声明的变量只在 let 命令所在的代码块内有效。
- const 声明一个只读的常量，一旦声明，常量的值就不能改变。
- 声明可变的变量用 let,声明常量用 const
- const 声明的常量对象，修改内部属性是允许的
- 不推荐使用 var 声明变量
- let/const 不存在变量提升
- 如果想要使一个变量完全不能修改，使用 Object.freeze()

## 变量解构赋值

### 语法定义

**解构赋值**语法是一种 Javascript 表达式。可以将数组中的值或对象的属性取出，赋值给其他变量。

```javascript
const [a, b] = array;
const [a, , b] = array;
const [a = aDefault, b] = array;
const [a, b, ...rest] = array;
const [a, , b, ...rest] = array;
const [a, b, ...{ pop, push }] = array;
const [a, b, ...[c, d]] = array;

const { a, b } = obj;
const { a: a1, b: b1 } = obj;
const { a: a1 = aDefault, b = bDefault } = obj;
const { a, b, ...rest } = obj;
const { a: a1, b: b1, ...rest } = obj;
const { [key]: a } = obj;
```

### 默认值

每个解构属性都可以有一个**默认值**。当属性不存在或值为 `undefined` 时，将使用默认值。如果属性的值为 `null`，则不使用它。

```
const [a = 1] = []; // a is 1
const { b = 2 } = { b: undefined }; // b is 2
const { c = 2 } = { c: null }; // c is null
```

### 解构比源更多的元素

在从赋值语句右侧指定的长度为 _N_ 的数组解构的数组中，如果赋值语句左侧指定的变量数量大于 _N_，则只有前 _N_ 个变量被赋值。其余变量的值将是未定义。

```javascript
const foo = ["one", "two"];

const [red, yellow, green, blue] = foo;
console.log(red); // "one"
console.log(yellow); // "two"
console.log(green); // undefined
console.log(blue); //undefined
```

### 交换变量

```javascript
let a = 1;
let b = 3;

[a, b] = [b, a];
console.log(a); // 3
console.log(b); // 1

const arr = [1, 2, 3];
[arr[2], arr[1]] = [arr[1], arr[2]];
console.log(arr); // [1, 3, 2]
```

### 数组解构

数组解构调用右侧的[迭代协议](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Iteration_protocols)。因此，任何可迭代对象（不一定是数组）都可以解构。

```javascript
const [a, b] = new Map([
  [1, 2],
  [3, 4],
]);
console.log(a, b); // [1, 2] [3, 4]
```

## 模板字符串

**模板字面量**是用反引号（```）分隔的字面量，允许[多行字符串](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Template_literals#多行字符串)、带嵌入表达式的[字符串插值](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Template_literals#字符串插值)和一种叫[带标签的模板](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Template_literals#带标签的模板)的特殊结构。

```javascript
`string text ${expression} string text`;
```

## 对象简化写法

允许省略同名属性的赋值

```javascript
const name = "张三";
const person = {
  name,
  age: 18,
};
console.log(person); // {name:'张三', age: 18}
```

## 箭头函数

- 箭头函数没有独立的 `this`、`arguments`和 `super`绑定，并且不可被用作`方法`。
- 箭头函数不能用作构造函数。使用 `new` 调用它们会引发 `TypeError`。它们也无法访问 `new.target` 关键字。
- 箭头函数不能在其主体中使用 `yield`，也不能作为生成器函数创建。
- 箭头函数允许是异步函数，在表达式前加上 `async` 关键字
- 箭头函数中的 this 变量始终指向全局变量 globalThis

## 函数参数默认值设置

函数参数支持默认值

```javascript
function add(a = 1, b = 2) {
  return a + b;
}
add(); // 3
```

## rest 剩余参数

**剩余参数**语法允许我们将一个不定数量的参数表示为一个数组。

### 剩余参数和 `arguments`对象的区别

- 剩余参数只包含那些没有对应形参的实参，而 `arguments` 对象包含了传给函数的所有实参。
- `arguments`对象不是一个真正的数组，而剩余参数是真正的 `Array`实例，也就是说你能够在它上面直接使用所有的数组方法，比如 [`sort`](https://developer.mozilla.org/zh-CN/docs/JavaScript/Reference/Global_Objects/Array/sort)，[`map`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/map)，[`forEach`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach)或[`pop`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/pop)。
- `arguments`对象还有一些附加的属性（如`callee`属性）。

### 解构剩余参数

```javascript
function f(...[a, b, c]) {
  return a + b + c;
}

f(1); // NaN (b and c are undefined)
f(1, 2, 3); // 6
f(1, 2, 3, 4); // 6 (the fourth parameter is not destructured)
```

## 拓展运算符

### 语法

函数调用

```javascript
myFunction(...iterableObj);
```

字面量数组构造或字符串

```javascript
[...iterableObj, "4", ..."hello", 6];
```

数组拷贝，浅拷贝

```javascript
var arr = [1, 2, 3];
var arr2 = [...arr]; // like arr.slice()
arr2.push(4);

// arr2 此时变成 [1, 2, 3, 4]
// arr 不受影响
```

## Symbol

**symbol** 是一种原始数据类型。`Symbol()` 函数会返回 **symbol** 类型的值

### 语法

description 用于调试而不是访问 symbol 本身

```javascript
Symbol([description]);
```

### 静态方法

#### Symbol.for(key)

查找关联的键，如果没有会创建再返回

与 Symbol()不同之处在于 Symbol.for()，不一定会创建新的 Symbol，如果在 symbol 注册表中已存在关联键，则返回上次存储的值。

#### Symbol.keyFor(sym)

传入的参数 sym 为需要查找键值的 symbol

```javascript
let a = Symbol("a");
let b = Symbol("b");
let symA = Symbol.for("a");
let symB = Symbol.for("b");
console.log(Symbol("a") === Symbol("a")); // false
console.log(symA === Symbol.for("a")); // true
console.log(Symbol.keyFor(symA) === Symbol.keyFor(symB)); // false
```

### 静态属性

#### Symbol.hasInstance

用于判断某对象是否为某构造器的实例

##### 自定义 instanceof 操作符在类上的行为

```javascript
class Array1 {
  static [Symbol.hasInstance](instance) {
    console.log("自定义instanceof行为");
    return Array.isArray(instance);
  }
}

console.log([] instanceof Array1);
```

#### Symbol.iterator

##### 迭代器，用于自定义迭代方法

```javascript
const iterable1 = {};

iterable1[Symbol.iterator] = function* () {
  yield 1;
  yield 2;
  yield 3;
};

console.log([...iterable1]); // [1,2,3]
```

### 实例方法

#### Symbol.prototype.toString()

**`toString()`** 方法返回当前 symbol 对象的字符串表示。

symbol 原始值不能转换为字符串，所以只能先转换成它的包装对象，再调用 `toString()` 方法

```javascript
Symbol("foo") + "bar";
// TypeError: Can't convert symbol to string
Symbol("foo").toString() + "bar";
// "Symbol(foo)bar"，就相当于下面的：
Object(Symbol("foo")).toString() + "bar";
// "Symbol(foo)bar"
```

### 实例属性

#### Symbol.prototype.description

**`description`** 是一个只读属性，它会返回`Symbol`对象的可选描述的字符串。

## 迭代器和生成器

**迭代器**是一个对象，它定义一个序列，并在终止时可能附带一个返回值

迭代器需要实现一个 next()方法， 该方法返回一个具有两个属性的对象,重复调用 `next()` 显式地迭代，通常一个迭代器只能迭代一个

```javascript
class Student {
  constructor(score) {
    this.score = score;
    this.index = 0;
  }

  next() {
    if (this.index < this.score.length) {
      const result = { value: this.score[this.index], done: false };
      this.index++;
      return result;
    }
    return { value: undefined, done: true };
  }
}

const student = new Student([1, 2, 3, 4]);
let result = student.next();
while (!result.done) {
  console.log(result.value);
  result = student.next();
}
```

### 数组迭代器

```javascript
function makeRangeIterator(start = 0, end = Infinity, step = 1) {
  let nextIndex = start;
  let iterationCount = 0;

  const rangeIterator = {
    next() {
      let result;
      if (nextIndex < end) {
        result = { value: nextIndex, done: false };
        nextIndex += step;
        iterationCount++;
        return result;
      }
      return { value: iterationCount, done: true };
    },
  };
  return rangeIterator;
}
let it = makeRangeIterator(1, 10, 2);

let result = it.next();
while (!result.done) {
  console.log(result.value); // 1 3 5 7 9
  result = it.next();
}
```

### 生成器函数

自定义迭代器需要显式维护内部状态，创建时需要谨慎

生成器允许定义一个非连续执行的函数作为迭代算法，自动生成具有 next 方法的迭代器

语法

```javascript
function* gen() {}
```

函数内允许使用 yield，yield 起到一个‘分割代码’，三个 yield 将代码分割为 4 个部分，每次调用迭代器的 next()执行一部分，yield 后面表达式的值作为 next 函数返回值的 value

```javascript
function* gen2() {
  console.log("第一部分");
  yield 111;
  console.log("第二部分");
  yield 222;
  console.log("第三部分");
  yield 333;
  console.log("第四部分");
}

const it = gen2();
console.log(it.next());
console.log(it.next());
console.log(it.next());
console.log(it.next());
```

![image-20240724230019418](C:\Users\tyt\AppData\Roaming\Typora\typora-user-images\image-20240724230019418.png)

### 带参数的 next 函数调用

gen 函数和 next 函数允许传入参数

```
function* gen3(args) {
  console.log(args);
  const a = yield 111;
  console.log(a);
  const b = yield 222;
  console.log(b);
  const c = yield 333;
  console.log(c);
}

const it = gen3("args");
console.log(it.next());
console.log(it.next("a"));
console.log(it.next("b"));
console.log(it.next("c"));

```

![image-20240724230528000](C:\Users\tyt\AppData\Roaming\Typora\typora-user-images\image-20240724230528000.png)

用迭代器实现异步编程

迭代器由于需要显式调用 next 函数来执行下一步，可以作为异步编程的一种解决方式

举个例子

```javascript
function synca() {
  setTimeout(() => {
    console.log("异步方法a");
    const data = [1, 2, 3];
    it.next(data);
  }, 3000);
}

function syncb() {
  setTimeout(() => {
    console.log("异步方法b");
    const data = [2, 4, 6];
    it.next(data);
  }, 2000);
}

function syncc() {
  setTimeout(() => {
    console.log("异步方法c");
    const data = [3, 6, 9];
    it.next(data);
  }, 1000);
}

function getData(data) {
  console.log(data);
}

function* gen() {
  const a = yield synca();
  const b = yield syncb(a);
  const c = yield syncc(b);
  console.log(c);
}

let it = gen();
const res = it.next();
```

![image-20240725222740297](C:\Users\tyt\AppData\Roaming\Typora\typora-user-images\image-20240725222740297.png)

## Promise

### Promise 有什么

先打印到控制台上
console.dir(Promise)
![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/ab845b0a2f64625c62be70bcb492a194.png)
可以看到原型有构造函数、catch、then、finally、Symbol(ES6 原始数据类型，解决命名冲突问题)，本身有 all、reject、resolve、race 函数，与其他构造函数没什么大的区别

new 个实例看看

```javascript
var p = new Promise((resolve, reject) => {
  // 模拟调用接口
  setTimeout(() => {
    console.log("调用接口");
    resolve("返回数据");
  }, 2000);
});
```

看到 Promise 需要传入 resolve,reject 两个回调函数，用于执行执行成功和执行失败两种情况

### Promise 可以做什么

#### Promise 的异步操作

Promise 可以用来执行异步操作，这是 Promise 最常见的用法，比如上面的 setTimeout,在实际的开发中可以替换为下发到后台的接口，调用接口成功回调 resolve,调用接口失败回调 reject

#### Promise 的链式调用

原型中有 then，catch 这些函数，所以可以执行链式调用
举个栗子

```javascript
var p = new Promise((resolve, reject) => {
  // 模拟调用接口
  setTimeout(() => {
    console.log("调用接口");
    resolve("返回数据");
  }, 2000);
})
  .then(() => {
    console.log("调用接口后");
  })
  .finally(() => {
    console.log("调用接口完成");
  });
```

#### Promise 简化回调

先看下面的代码

```javascript
function runAsync(resolve) {
  // 模拟调用接口
  setTimeout(() => {
    console.log("调用接口");
    resolve("返回数据");
  }, 2000);
}

runAsync((data) => {
  console.log(data);
});
```

我写了一个回调函数，作为参数传入 runAsync，等接口调用完成后执行，不也可以实现回调？感觉还更简洁，那 Promise 有什么好？

但其实这只是一种特殊情况，如果 callback 本身是一个异步操作呢？还要给 callback 传一个 callback2？这样一点也不优雅，代码层层回调也很容易让人看不懂，而 Promise 的优势在于，可以在 then 方法中继续写 Promise 对象并返回，然后继续调用 then 来进行回调操作
像是这样

```javascript
function runAsync1() {
  var p = new Promise((resolve, reject) => {
    // 模拟调用接口
    setTimeout(() => {
      console.log("调用接口1");
      resolve("返回数据");
    }, 2000);
  });
  // 返回的是Promise对象
  return p;
}
function runAsync2() {
  var p = new Promise((resolve, reject) => {
    // 模拟调用接口
    setTimeout(() => {
      console.log("调用接口2");
      resolve("返回数据");
    }, 2000);
  });
  // 返回的是Promise对象
  return p;
}
function runAsync3() {
  var p = new Promise((resolve, reject) => {
    // 模拟调用接口
    setTimeout(() => {
      console.log("调用接口3");
      resolve("返回数据");
    }, 2000);
  });
  // 返回的是Promise对象
  return p;
}

runAsync1()
  .then((data) => {
    console.log(data);
    return runAsync2();
  })
  .then((data) => {
    console.log(data);
    return runAsync3();
  })
  .then(function (data) {
    console.log(data);
  });
```

![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/fb491482e633231ed2bb10e1f922aaa8.png)

这样接口调用能够老老实实地按接口调用的顺序返回，代码更简洁，代码维护起来更方便

#### reject 和 catch

上面说了 resolve，现在讲 reject，then 函数可以传入两个回调函数，像这样

```javascript
getNum().then(
  (data) => {
    console.log(data);
    console.log(aaa);
  },
  (data) => {
    console.log(data);
  }
);
```

和 resolve 用法一样，不多赘述

catch 的用法是作为链式操作，和 then 的第二个参数 reject 作用一样

```javascript
function getNum() {
  var p = new Promise((resolve, reject) => {
    const num = Math.ceil(Math.random() * 10);
    if (num <= 5) {
      resolve("数字=" + num);
    } else {
      reject("数字=" + num + "数字太大了");
    }
  });
  return p;
}

getNum()
  .then(
    (data) => {
      console.log(data);
    }
    // (data) => {
    //     console.log(data);
    // }
  )
  .catch((data) => {
    console.log(data);
  });
```

但 catch 还有另一个用法，就是当代码出错时捕获，reject 无法做到

```javascript
getNum()
  .then(
    (data) => {
      console.log(data);
      console.log(aaa);
    }
    // (data) => {
    //     console.log(data);
    // }
  )
  .catch((error) => {
    console.log(error.message);
  });
```

这里提一个小建议：
能够预判到的异常，如数字超出范围的，用 reject，不能预判的异常，如代码漏洞，接口报 400 的，用 catch

finally 函数不多讲，也提一个小建议：
finally 执行 resolve 和 reject 都要执行的操作，如数据的赋值，接口返回的标志

### Promise 的常用函数

上面说的都是比较常见的函数，下面说下 Promise 的独有的方法

#### Promise.race()

race,意为赛跑，把多个 Promise 的实例做列表，作为参数传入，只要有一个执行完成，就返回
举个栗子

```javascript
var p1 = new Promise((resolve, reject) => {
  // 模拟调用接口
  setTimeout(() => {
    console.log("调用接口1");
    resolve("返回数据1");
  }, Math.random() * 1000);
});

var p2 = new Promise((resolve, reject) => {
  // 模拟调用接口
  setTimeout(() => {
    console.log("调用接口2");
    resolve("返回数据2");
  }, Math.random() * 1000);
});

var p3 = new Promise((resolve, reject) => {
  // 模拟调用接口
  setTimeout(() => {
    console.log("调用接口3");
    resolve("返回数据3");
  }, Math.random() * 1000);
});

Promise.race([p1, p2, p3]).then((data) => {
  console.log(data);
});
```

![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/b369ba76544c8412e271f835048482d8.png)

这里用 random 模拟接口返回的快慢,then 函数 resolve 的参数只有一个，只处理第一个返回的数据，但其他异步操作并没有中断，而是继续执行

#### Promise.all()

和 race 不同，all()需要所有异步操作全部成功完成，才执行 resolve， 只要有一个执行失败就会执行 reject
resolve 返回的也不一样，是每个异步操作调用 resolve 的结果

```javascript
var p1 = new Promise((resolve, reject) => {
  // 模拟调用接口
  setTimeout(() => {
    console.log("调用接口1");
    resolve("返回数据1");
  }, Math.random() * 1000);
});

var p2 = new Promise((resolve, reject) => {
  // 模拟调用接口
  setTimeout(() => {
    console.log("调用接口2");
    resolve("返回数据2");
  }, Math.random() * 1000);
});

var p3 = new Promise((resolve, reject) => {
  // 模拟调用接口
  setTimeout(() => {
    console.log("调用接口3");
    resolve("返回数据3");
  }, Math.random() * 1000);
});

Promise.all([p1, p2, p3]).then((data) => {
  console.log(data);
});
```

![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/f27321fc3405e06f89bd18ea6c370883.png)

#### race 和 all 的用法

当有多个异步操作，但只需要一个接口返回时，可以用 race，比如请求一个资源，后台执行时间不确定时，当第一次返回，直接用第一次返回的数据，多次请求没有返回的话，报资源请求超时错误抛出
当有多个异步操作。但需要全部接口返回时，可以用 all，比如请求一个大规模的数据，一个接口携带的数据量不够，可以分批多次下发，接口全部返回才展示到界面上

## 集合 Set

允许存储任何类型的唯一值

### 常用方法

add():插入一个具有指定值的新元素，如果该 `Set` 对象中没有具有相同值的元素

clear():移除该集合中的所有元素

delete():从该集合中删除指定值，如果该值在集合中

has():返回一个布尔值来指示对应的值是否存在于该集合中

### 实例属性

size:该集合中（唯一的）元素的个数

## Map

保存键值对，并且能够记住键的原始插入顺序

### 常用方法

clear()：会移除该 map 中的所有元素

delete()：从该 map 中删除指定键的元素

get()：返回该 map 中的指定元素

set()：会向 `Map` 对象添加或更新一个指定的键值对

### 实例属性

size:返回此 map 中元素的数量

## 继承

### ES5 构造函数继承

es5 使用构造函数实现继承如下：

```javascript
function Parent(name) {
  this.name = name;
  this.getName = function () {
    return this.name;
  };
  this.sayName = function () {
    console.log("name:" + this.name);
  };
}

function Child(name) {
  Parent.call(this, name);
}

const child = new Child("张三");

console.log(child);

child.sayName();
```

### Class 类继承

类实际是特殊的函数，类的写法使 JavaScript 更加接近于面向对象的思想。

使用 extends 关键字实现类之间的继承，以类实现继承如下：

```javascript
class Parent2 {
  constructor(name) {
    this.name = name;
    this.getName = function () {
      return this.name;
    };
    this.sayName = function () {
      console.log("name:" + this.name);
    };
  }
}

class Child2 extends Parent2 {
  constructor(name) {
    super(name);
  }
}

const child2 = new Child2("李四");

console.log(child2);

child2.sayName();
```

与 es5 构造函数继承对比，效果一致

![image-20240726225540189](C:\Users\tyt\AppData\Roaming\Typora\typora-user-images\image-20240726225540189.png)

## 子类对父类方法重写

子类对父类方法重写,会覆盖从父类继承的方法

```javascript
class Parent {
  constructor(name) {
    this.name = name;
  }

  getName = function () {
    return this.name;
  };
  sayName = function () {
    console.log("name:" + this.name);
  };
}

class Child extends Parent {
  constructor(name) {
    super(name);
  }
  sayName = function () {
    console.log("my name is " + this.name);
  };
}

const child = new Child("李四");

console.log(child);

child.sayName();
```

## 数值扩展

### 二进制和八进制表示法

```javascript
const a = 0b1011; // 11
const b = 0o57; // 47
```

### Number 扩展方法

#### isFinite() 判断是否为有限的

#### isNaN() 判断是否为 NaN

```javascript
Number.isFinite(25); // true
Number.isNaN(25); // false
```

#### parseInt():将参数转为 int

#### parseFloat():将参数转为 float

```javascript
const a = Number.parseInt("12.34");
const b = Number.parseFloat("12.34#");
```

## 对象方法扩展

## 模块化

关键字 import 引入 js 模块文件

```javascript
import { getMsg } from "./math.js";
```

关键字 export 导出变量和函数

```javascript
export function add(a, b) {
  return a + b;
}
```

导入全部模块作为对象

```javascript
import * as cal from "./cal.js";
```

as 关键字在导入模块时设置别名

```javascript
import { sum as total } from "./math.js";
```

模块有仅只有一个缺省导出。缺省导出方便导入使用。

```javascript
exprt default function(arr)  {
	return arr.sort();
}

import sort from './sort.js'
```

导入两个绑定可以使用绑定列表，规则如下：

- 确定绑定必须在首位
- 非缺省绑定必须使用花括号

```javascript
import sort, { heapSort } from "./sort.js";
```
