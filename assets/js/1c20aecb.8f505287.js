"use strict";(self.webpackChunkblog=self.webpackChunkblog||[]).push([[112],{2652:(e,n,r)=>{r.r(n),r.d(n,{assets:()=>a,contentTitle:()=>c,default:()=>p,frontMatter:()=>o,metadata:()=>l,toc:()=>i});var s=r(4848),t=r(8453);const o={slug:"ES9",title:"ES9"},c="ES9",l={id:"ECMASCRIPT/ES9",title:"ES9",description:"rest \u548c spread \u8fd0\u7b97\u7b26",source:"@site/docs/ECMASCRIPT/ES9.md",sourceDirName:"ECMASCRIPT",slug:"/ECMASCRIPT/ES9",permalink:"/docs/ECMASCRIPT/ES9",draft:!1,unlisted:!1,tags:[],version:"current",frontMatter:{slug:"ES9",title:"ES9"},sidebar:"tutorialSidebar",previous:{title:"ES8",permalink:"/docs/ECMASCRIPT/ES8"},next:{title:"\u54cd\u5e94\u5f0f\u539f\u7406",permalink:"/docs/Vue/\u54cd\u5e94\u5f0f\u539f\u7406"}},a={},i=[{value:"rest \u548c spread \u8fd0\u7b97\u7b26",id:"rest-\u548c-spread-\u8fd0\u7b97\u7b26",level:2},{value:"\u6b63\u5219\u8868\u8fbe\u5f0f\u547d\u540d\u6355\u83b7\u7ec4",id:"\u6b63\u5219\u8868\u8fbe\u5f0f\u547d\u540d\u6355\u83b7\u7ec4",level:2},{value:"\u6b63\u5219\u8868\u8fbe\u5f0f\u53cd\u5411\u65ad\u8a00",id:"\u6b63\u5219\u8868\u8fbe\u5f0f\u53cd\u5411\u65ad\u8a00",level:2},{value:"\u6b63\u5219\u8868\u8fbe\u5f0f dotAll \u6a21\u5f0f",id:"\u6b63\u5219\u8868\u8fbe\u5f0f-dotall-\u6a21\u5f0f",level:2}];function d(e){const n={code:"code",h1:"h1",h2:"h2",header:"header",p:"p",pre:"pre",...(0,t.R)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(n.header,{children:(0,s.jsx)(n.h1,{id:"es9",children:"ES9"})}),"\n",(0,s.jsx)(n.h2,{id:"rest-\u548c-spread-\u8fd0\u7b97\u7b26",children:"rest \u548c spread \u8fd0\u7b97\u7b26"}),"\n",(0,s.jsx)(n.p,{children:"\u589e\u52a0\u5bf9\u5bf9\u8c61\u7684 rest"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-javascript",children:'function connect({ host, port, ...user }) {\r\n  console.log(host);\r\n  console.log(port);\r\n  console.log(user);\r\n}\r\nconnect({\r\n  host: "127.0.0.1",\r\n  port: 3306,\r\n  username: "root",\r\n  password: "root",\r\n  type: "master",\r\n});\n'})}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-javascript",children:'const a = {\r\n  a: "a",\r\n};\r\nconst b = {\r\n  b: "b",\r\n};\r\nconst c = {\r\n  c: "c",\r\n};\n'})}),"\n",(0,s.jsx)(n.h2,{id:"\u6b63\u5219\u8868\u8fbe\u5f0f\u547d\u540d\u6355\u83b7\u7ec4",children:"\u6b63\u5219\u8868\u8fbe\u5f0f\u547d\u540d\u6355\u83b7\u7ec4"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-javascript",children:'const url = "http://127.0.0.1:8080";\r\nconst reg = /^http:\\/\\/(?<ip>.*):(?<port>.*)/;\r\nconst result = reg.exec(url);\r\nconsole.log(result.groups.ip); // 127.0.0.1\r\nconsole.log(result.groups.port); // 8080\n'})}),"\n",(0,s.jsx)(n.h2,{id:"\u6b63\u5219\u8868\u8fbe\u5f0f\u53cd\u5411\u65ad\u8a00",children:"\u6b63\u5219\u8868\u8fbe\u5f0f\u53cd\u5411\u65ad\u8a00"}),"\n",(0,s.jsx)(n.p,{children:"\u5bf9\u5339\u914d\u7ed3\u679c\u524d\u540e\u7684\u503c\u8fdb\u884c\u5224\u65ad\uff0c\u7b5b\u9009\u7ed3\u679c"}),"\n",(0,s.jsx)(n.p,{children:"\u6b63\u5411\u65ad\u8a00\uff1a"}),"\n",(0,s.jsx)(n.p,{children:"\u53cd\u5411\u65ad\u8a00\uff1a"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-javascript",children:'const teststr = "123456a7890";\r\nconst reg1 = /\\d+(?=a)/;\r\nconsole.log(reg1.exec(teststr)); // \u6355\u83b7a\u4e4b\u524d\u7684\u6570\u5b57 123456\r\nconst reg2 = /(?<=a)\\d+/;\r\nconsole.log(reg2.exec(teststr)); // \u6355\u83b7a\u4e4b\u540e\u7684\u6570\u5b57 7890\n'})}),"\n",(0,s.jsx)(n.h2,{id:"\u6b63\u5219\u8868\u8fbe\u5f0f-dotall-\u6a21\u5f0f",children:"\u6b63\u5219\u8868\u8fbe\u5f0f dotAll \u6a21\u5f0f"}),"\n",(0,s.jsx)(n.p,{children:"\u6b63\u5219\u8868\u8fbe\u5f0f\u540e\u52a0 s,\u4e0d\u9700\u8981\u5728\u8868\u8fbe\u5f0f\u4e2d\u52a0\u6362\u884c\u7b26"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-javascript",children:'const html = `\r\n<li>\r\n    <p>\u8096\u7533\u514b\u7684\u6551\u8d4e</p>\r\n</li>\r\n`;\r\n\r\nconst reg1 = /<li>\\s+<p>(?<name>.*?)<\\/p>\\s+<\\/li>/;\r\nconst res1 = reg1.exec(html);\r\nconsole.log("res1 :>> ", res1.groups.name);\r\n\r\nconst reg2 = /<li>.*?<p>(?<name>.*?)<\\/p>.*?<\\/li>/gs;\r\nconst res2 = reg2.exec(html);\r\nconsole.log("res2 :>> ", res2.groups.name);\n'})})]})}function p(e={}){const{wrapper:n}={...(0,t.R)(),...e.components};return n?(0,s.jsx)(n,{...e,children:(0,s.jsx)(d,{...e})}):d(e)}},8453:(e,n,r)=>{r.d(n,{R:()=>c,x:()=>l});var s=r(6540);const t={},o=s.createContext(t);function c(e){const n=s.useContext(o);return s.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function l(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:c(e.components),s.createElement(o.Provider,{value:n},e.children)}}}]);