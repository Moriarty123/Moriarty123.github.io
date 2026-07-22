# 使用Proxy和Reflect实现单例模式

## 实现原理

定义一个函数，接受构造器作为参数，在函数中使用Proxy为传进来的构造器进行代理，拦截对应的构造器实现方法，在构造器中，判断是否已存在创建好的实例，有则直接返回创建好的实例，否则返回创建的实例。同时由于传进去的constructor是原型上，需要对proxy代理的对象修改原型上的constructor为自身,避免直接从原型中直接创建实例。

<!-- truncate -->

```javascript
// 单例模式
function singleton(clazz) {
  let instance = null;
  const proxy = new Proxy(clazz, {
    construct(target, args) {
      if (!instance) {
        instance = Reflect.construct(target, args);
      }
      return instance;
    },
  });
  proxy.prototype.constructor = proxy;
  proxy.constructor = proxy;
  return proxy;
}

export default singleton;

```

```javascript
// Person.mjs
import singleton from "./singleton.mjs";

class Person {
  constructor() {
    this.name = "Tom";
    this.age = 18;
  }
}

const MyPerson = singleton(Person);

export { MyPerson as Person };

```

```javascript
// index.mjs
import { Person } from "./person.mjs";

// 使用Person创建实例
const a = new Person();
const b = new Person();

// 使用Person.constructor创建实例
const c = new Person.constructor();
const d = new Person.constructor();

// 使用Person原型链上的constructor创建实例
const e = new Person.prototype.constructor();
const f = new Person.prototype.constructor();

// 不管什么方式创建的实例都是单例
console.log(a === b); // true
console.log(b === c); // true
console.log(c === d); // true
console.log(d === e); // true
console.log(e === f); // true
```



## 代码解释

clazz是传入的构造器，proxy代理的constructor拦截了clazz的constructor，进行了判断，如果存在实例则把之前实例返回，这里需要注意的是，在返回proxy前将proxy原型链上的constructor都改为proxy，这样即使通过Person的constructor来创建实例，得到的实例也会是单例。













