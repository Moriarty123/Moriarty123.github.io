# 使用css属性实现抛物线运动

## 实现原理

抛物线可以分为水平方向的匀速运动和垂直方向的匀加速运动，一个元素的位置不能同时进行两个方向的运动，需要多元素协助。

创建一个父元素和一个子元素，父元素带着子元素向右水平运动，子元素本身向下运动，这样叠加起来就是抛物线运动。



```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>多元素动画</title>
</head>

<style>
    .box {
        width: 50px;
        height: 50px;
        animation: moveX .5s linear forwards ;
    }

    .inner {
        width: 50px;
        height: 50px;
        background-color: blue;
        border-radius: 50%;
        animation: moveY .5s cubic-bezier(.11,-0.33, .55, .11) forwards;
    }

    /* 定义动画 */
    @keyframes moveX {
        to {
            transform: translateX(400px);
        }
    }

    @keyframes moveY {
        to {
            transform: translateY(400px);
        }
    }
</style>

<body>
    <div class="box">
        <div class="inner"></div>
    </div>
</body>
</html>
```

