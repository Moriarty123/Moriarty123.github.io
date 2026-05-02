# 使用dataurl和base64实现上传图片预览

## 什么是dataurl

**Data URL**，即前缀为 `data:` 协议的 URL，其允许内容创建者向文档中嵌入小文件。

Data URL 由四个部分组成：前缀（`data:`）、指示数据类型的 MIME 类型、如果非文本则为可选的 `base64` 标记、数据本身



## 什么是base64

**Base64** 是一组相似的[二进制到文本](https://en.wikipedia.org/wiki/Binary-to-text_encoding)（binary-to-text）的编码规则，让二进制数据在解释成 64 进制的表现形式后能够用 [ASCII](https://developer.mozilla.org/zh-CN/docs/Glossary/ASCII) 字符串的格式表示出来.

javascript提供atob/btoa进行文本和base64的转化



## 图片预览流程

上传的图片先上传到服务器，再从服务器获取图片预览，中间需要经过两次网络传输产生延迟。而利用dataurl做预览，直接在浏览器上展示，可以避免网络传输导致的延迟。



## 实现代码



```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>dataurl预览图片</title>
</head>
<body>
    <div>
        <label for="fileInput">Choose a file:</label>
        <input type="file" id="fileInput" title="Choose a file to upload">
    </div>
</body>
</html>

<script>
    document.querySelector('input').addEventListener('change', function(e) {
        var file = e.target.files[0];
        var reader = new FileReader();

        // IO操作，读取文件的信息，并展示到页面上
        reader.onload = function(e) {
            var img = new Image();
            img.src = e.target.result;
            console.log('e.target.result :>> ', e.target.result);
            img.style.width = '300px';
            document.body.appendChild(img);
        }
        // readAsDataUrl将文件按dataurl方式读取
        reader.readAsDataURL(file);
    });
</script>
```



### 代码解释

上传文件触发事件，FileReader.readAsDataURL按dataurl读取文件，在onload方法中获取文件的data url，并添加一个img元素到body，给这个元素的src赋值，作为图片展示的内容



![image-20250104170616687](/Users/yitiantu/Library/Application Support/typora-user-images/image-20250104170616687.png)