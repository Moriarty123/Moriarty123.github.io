---
sidebar_position: 2
sidebar_label: Axios
title: Axios
---

# Axios

Axios 是一个基于 Promise 的 HTTP 客户端库，用于浏览器和 Node.js，通常需要二次封装,可以设置超时设置，设置通用的baseurl和headers,支持请求拦截器和响应拦截器

## 正常请求

支持多种请求方式，get/post/put/delete

## 请求拦截器

用于在请求前做一些操作，如在headers中增加token，没有token跳转到登陆页

## 响应拦截器

用于对响应进行处理，如统一错误处理，token超时跳转到登陆页，404跳转到异常页；以及对数据进行解析

## 取消请求

AbortController 是浏览器 Web 标准 API，提供一个"信号"机制，需要取消的接口在options中增加signal: abortController.signal,axios会监听这个信号。使用AbortController调用abort（）方法，调用 abort() 后，没有任何网络请求被发送到服务端，整个取消过程都在浏览器本地完成，浏览器立即触发 signal 的 abort 事件，axios 收到事件会终止底层连接，客户端不等待响应，接口Promise.reject进入catch分支