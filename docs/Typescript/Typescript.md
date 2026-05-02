# Typescript

## tuple

## enum

## interface

### 类型合并

```typescript
interface Mytype  {
    a: number,
    b: number
}

interface Mytype {
    c: number
}

const t:Mytype = {a: 1, b: 2} // 报错
```



### 类型扩展

```typescript
interface A {
 id: number
}

interface B extends A {
    num: number
}

const b: B = {
    id: 1,
    num: 1
}
console.log(b);
```





### 函数定义

```typescript
interface Func {
    (num1: number, num2: number): number
}

const fn :Func = (args1, args2) => args1 + args2

console.log(fn(1,2));
```



### 索引定义

定义了索引类型后，Array原型链上的方法和属性不存在

```typescript
interface Role {
    [id:number]: string
}

const role1:Role = ['admin', 'user', 'touist']

const role2 : Role = {
    0: 'admin',
    1: 'user',
    2: 'touist'
}

console.log(role1);
console.log(role2);
```



### 绕过类型检查

类型断言和索引签名

```typescript
interface MyType {
    id: number
    [prop: string]:any
}


const getType = (type: MyType) => {
    console.log(type);
}

// 1.类型断言
getType({id: 1,num: 1} as MyType)

// 2.索引签名
getType({id: 1,num: 1})

```



## class

### 修饰符

public 允许其他类访问，默认值

protected 允许自身及子类对象访问

private 只允许自身访问 

```typescript
class Person {
    // public 允许其他类访问，默认值
    // protected 允许自身及子类对象访问
    // private 只允许自身访问 
    name = '张三';
    getName() {
        return this.name;
    }
}

const p: Person = new Person();
console.log(p.getName());
```



### 类扩展

extends扩展类，子类实现constructor方法需要调用super方法相当于调用父类的构造方法

```typescript
class Person {
    name = '张三';
    getName() {
        return this.name;
    }
}
class Man extends Person {
    constructor() {
        super();
        this.name = '李四'
    }
}

const m: Man = new Man()
console.log(m.getName());
```



### 类继承接口

```typescript
interface FoodInterface {
    type: string;
}

class FoodClass implements FoodInterface {
 type: string;
 constructor(args: string) {
    this.type = args
 }
}

const food: FoodClass = new FoodClass('apple')
console.log(food);
```





### 接口继承类

1.接口继承类，会继承类的成员，但不包括实现

2.接口可继承类的protected/private成员，但该接口只能被该类及子类实现

```typescript
class Person {
    protected name: string;
    constructor(name: string) {
        this.name = name
    }
    getName() {
        return this.name;
    }
}

interface I extends Person {

}

class C extends Person implements I {

}
const c:C = new C('张三');
console.log(c.getName());
```



## 范型

在定义时不指定类型，而在使用时才指定类型，可以提高代码的复用性

类型T通常为大写

```typescript
const pushNum = (arr: number[], a: number) => {
    arr.push(a)
    return arr
}

const pushStr = (arr: string[], a: string) => {
    arr.push(a)
    return arr
}

const pushType = <T>(arr: T[], a: T) => {
    arr.push(a)
    return arr
}

const arr1:number[] = [];
console.log(pushNum(arr1, 1));
const arr2: string[] = [];
console.log(pushStr(arr2, '张三'));

const arr3: string[] = [];
console.log(pushType<string>(arr3,'李四'));
```















