# grid布局

## 概念

1. 容器：采用网格布局的区域，称为"容器"（container）
2. 项目：容器内部采用网格定位的子元素，称为"项目"（item）
3. 行和列：容器里面的水平区域称为"行"（row），垂直区域称为"列"（column）
4. 单元格：行和列的交叉区域，称为"单元格"（cell）
5. 网格线：划分网格的线，称为"网格线"（grid line）

## 属性

### 容器属性

#### display

指定一个容器采用网格布局

1. display: grid指定一个容器采用网格布局。

2. display：inline-grid,容器为行内元素

#### grid-template-columns/grid-template-rows

定义每一列的列宽和行宽

1. repeat：使用重复函数

   grid-template-columns: repeat(2, 100px 50px);

2. auto-fill:每一行（或每一列）容纳尽可能多的单元格.
   auto-fill会用空格子填满剩余宽度，auto-fit则会尽量扩大单元格的宽度。

   grid-template-columns: repeat(auto-fill, 50px);

3. fr 关键字
   表示比例关系

   grid-template-columns: 1fr 1fr;

4. minmax()

   设置最大最小值

5. auto关键字

   auto关键字表示由浏览器自己决定长度。

6. 网格线的名称

   可以使用方括号，指定每一根网格线的名字

7. 百分比

   grid-template-columns: 70% 30%;

#### row-gap/column-gap/gap

row-gap属性设置行与行的间隔（行间距），column-gap属性设置列与列的间隔（列间距）。gap是简写方式

gap: row-gap column-gap;

#### grid-template-areas

grid-template-areas属性用于定义区域

#### grid-auto-flow

划分网格以后，容器的子元素会按照顺序，自动放置在每一个网格。默认的放置顺序是"先行后列"

grid-auto-flow取值为以下几个值

row: 先行后列
column：先列后行
row dense：表示"先行后列"，并且尽可能紧密填满，尽量不出现空格。
column dense: 表示"先列后行"，并且尽可能紧密填满，尽量不出现空格。

#### justify-items/align-items/place-items

justify-items属性设置单元格内容的水平位置（左中右），align-items属性设置单元格内容的垂直位置（上中下）。place-items属性是align-items属性和justify-items属性的合并简写形式

place-items: align-items justify-items;

取值范围：
start：对齐单元格的起始边缘。
end：对齐单元格的结束边缘。
center：单元格内部居中。
stretch：拉伸，占满单元格的整个宽度（默认值）。

#### justify-content/align-content/place-content

justify-content属性是整个内容区域在容器里面的水平位置（左中右），align-content属性是整个内容区域的垂直位置（上中下）。place-content属性是align-content属性和justify-content属性的合并简写形式。

place-content: align-content justify-content

取值范围：
start - 对齐容器的起始边框。
end - 对齐容器的结束边框。
center - 容器内部居中。
stretch - 项目大小没有指定时，拉伸占据整个网格容器。
space-around - 每个项目两侧的间隔相等。所以，项目之间的间隔比项目与容器边框的间隔大一倍。
space-between - 项目与项目的间隔相等，项目与容器边框之间没有间隔。
space-evenly - 项目与项目的间隔相等，项目与容器边框之间也是同样长度的间隔。

#### grid-auto-columns/grid-auto-rows

设置多余网格的列宽
grid-auto-rows: 50px;

#### grid-template/grid

grid-template属性是grid-template-columns、grid-template-rows和grid-template-areas这三个属性的合并简写形式。

grid属性是grid-template-rows、grid-template-columns、grid-template-areas、 grid-auto-rows、grid-auto-columns、grid-auto-flow这六个属性的合并简写形式。

### 项目属性

#### grid-column-start/grid-column-end/grid-row-start/grid-row-end

指定网格线

使用span关键字，表示"跨越"

grid-column-start: span 2;

使用这四个属性，如果产生了项目的重叠，则使用z-index属性指定项目的重叠顺序。

#### grid-column/grid-row

grid-column属性是grid-column-start和grid-column-end的合并简写形式，grid-row属性是grid-row-start属性和grid-row-end的合并简写形式。

grid-column: start-line / end-line;
grid-row: start-line / end-line;

#### grid-area

grid-area属性指定项目放在哪一个区域。
grid-area: e;

grid-area属性还可用作grid-row-start、grid-column-start、grid-row-end、grid-column-end的合并简写形式，直接指定项目的位置。
grid-area: row-start / column-start / row-end / column-end>

#### justify-self/align-self/place-self

只作用于单个单元格

取值范围：
start：对齐单元格的起始边缘。
end：对齐单元格的结束边缘。
center：单元格内部居中。
stretch：拉伸，占满单元格的整个宽度（默认值）。

## 高级用法

## 参考

阮一峰的网络日志/CSS Grid 网格布局教程

https://ruanyifeng.com/blog/2019/03/grid-layout-tutorial.html
