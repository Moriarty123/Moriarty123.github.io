---
slug: ES9
title: ES9
---

# ES9

## rest 和 spread 运算符

增加对对象的 rest

```javascript
function connect({ host, port, ...user }) {
  console.log(host);
  console.log(port);
  console.log(user);
}
connect({
  host: "127.0.0.1",
  port: 3306,
  username: "root",
  password: "root",
  type: "master",
});
```

```javascript
const a = {
  a: "a",
};
const b = {
  b: "b",
};
const c = {
  c: "c",
};
```

## 正则表达式命名捕获组

```javascript
const url = "http://127.0.0.1:8080";
const reg = /^http:\/\/(?<ip>.*):(?<port>.*)/;
const result = reg.exec(url);
console.log(result.groups.ip); // 127.0.0.1
console.log(result.groups.port); // 8080
```

## 正则表达式反向断言

对匹配结果前后的值进行判断，筛选结果

正向断言：

反向断言：

```javascript
const teststr = "123456a7890";
const reg1 = /\d+(?=a)/;
console.log(reg1.exec(teststr)); // 捕获a之前的数字 123456
const reg2 = /(?<=a)\d+/;
console.log(reg2.exec(teststr)); // 捕获a之后的数字 7890
```

## 正则表达式 dotAll 模式

正则表达式后加 s,不需要在表达式中加换行符

```javascript
const html = `
<li>
    <p>肖申克的救赎</p>
</li>
`;

const reg1 = /<li>\s+<p>(?<name>.*?)<\/p>\s+<\/li>/;
const res1 = reg1.exec(html);
console.log("res1 :>> ", res1.groups.name);

const reg2 = /<li>.*?<p>(?<name>.*?)<\/p>.*?<\/li>/gs;
const res2 = reg2.exec(html);
console.log("res2 :>> ", res2.groups.name);
```
