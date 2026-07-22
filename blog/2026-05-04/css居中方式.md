# CSS之居中方式

<!-- truncate -->

## 水平居中
### text-align:center

适用范围：容器中都是行内元素
缺点：容器内所有元素都会居中，如果是文本描述需要左对齐，需要增加text-align:left覆盖

### margin: 0 auto

适用范围：容器宽度固定。子元素宽度固定
缺点：对上下居中不适用

## 垂直居中
### table-cell
给容器加上
```
{
    display: table-cell;
    vertical-align: middle;
}
```
缺点：margin属性失效

### 相对定位
父相子绝，原理是子元素相对父容器先向右向下偏移父容器的50%，再向左向上偏移子元素的50%
父容器position属性为relative，子元素加上以下样式
```
{
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
}
```
适用范围：父子元素宽度高度固定，且子元素只有一个
缺点：如果子元素是文本，可能会导致换行

### flex布局
容器加上
```
{
    display: flex;
    align-items: center;
    justify-content: center;
}
```

## 行内元素的垂直居中
html如下:
```
    <div class="container">
      <img src="../img/Karen-Pape-1800x1200.webp" alt="" />
      <span>湖泊</span>
    </div>
```
改变元素的居中方式，设置行高与容器高度一致
```
    img,
    span {
      vertical-align: middle;
      line-height: 500px;
    }
```

缺点：需要改变行高

## 多行文本的垂直居中
给文本增加span，设置span为inline-block,容器本身height与line-height相等

```
.container {
    height: 500px;
    line-height: 500px;
}
  .container {
    span {
      display: inline-block;
      line-height: normal;
      vertical-align: middle;
      margin: 0 20px;
    }
  }
```