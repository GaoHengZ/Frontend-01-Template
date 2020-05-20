# 第六周总结

## 有限状态机

* 每一个状态都是一个机器
	* 正在每一个机器里，我们可以做计算，存储，输出...
	* 所有的这些机器接受的输入都是一致的
	* 状态机的每一个机器本身没有状态，如果我们用函数来表示的话，它应该是一个纯函数(无副作用)
* 每一个机器都知道下一个状态
	* 每个机器都有确定的下一个状态(Moore-摩尔状态机)
	* 每个机器根据输入决定下一个状态(Mealy-米莉状态机)
### JS中的有限状态机
```
// 每个函数式一个"状态"
function state(input) {  
	// 函数参数就是'输入'
    // 在函数中，可以自由的编写代码，处理每个状态的逻辑
    return next; // 返回值作为下一个状态
}
// 调用方式
while (input) {
    // 获取输入
    state = state(input); // 把状态机的返回值作为下一个状态
}
```
## HTML的解析-词法分析
### 第一步-拆分文件
* 为了方便文件管理，把parser拆分到单独的文件中
* parser接受HTML文本作为参数，返回一颗DOM树
### 第二步-创建状态机

>JavaScript的词法在标准中都是通过产生式进行定义。
>
>html的词法却在 HTML标准中 直接写出伪代码(在状态机中在定义了各种状态)

* 使用FSM实现HTML的分析
* 在HTML标准中，已经规定了HTML的状态
### 第三步-解析标签
* 主要的标签有: 开始标签，结束标签，自封闭标签

### 第四步-创建元素
* 在状态机中，除了状态迁移，我们还会要加入业务逻辑
* 我们在标签结束状态提交标签token
### 第五步-处理属性
* 属性值分为 单引号，双引号，无引号三种写法，因此需要较多的状态处理
* 处理属性的方式跟标签类似
* 属性结束时，把属性加到标签token上
### 第六步-构建DOM树
* 从标签构建DOM树的基本技巧是使用栈
* 遇到开始标签时创建元素并入栈，遇到结束标签时出栈
* 自封闭节点可视为入栈后立即出栈
* 任何元素的父元素是它入栈前的栈顶
### 第七步-处理文本节点
* 文本节点与自封闭节点处理类似
* 多个文本节点需要合并

## CSS规则与html标签进行匹配
### 第一步-收集CSS规则

* 遇到style标签的时候，把CSS规则保存起来
* 代码中通过 CSS parser库来分析CSS规则
* 需要仔细研究 CSS parser库解析CSS后生成的格式
### 第二步-添加调用
* 当我们创建一个元素后，必须立即计算CSS
* 理论上，当我们分析一个元素时，所有CSS规则已经收集完毕
* 在真是浏览器汇总，可能遇到下载body的style标签，需要重新CSS计算的情况，在玩具浏览器中我们忽略
>回流必将引起重绘，重绘不一定会引起回流。

[浏览器的回流与重绘](https://juejin.im/post/5a9923e9518825558251c96a)

>如果把style标签写在了 元素标签之后，就会导致 重新计算CSS，导致界面闪动。因此最好把 style放在所有标签之前
### 第三步-获取父元素序列
* 在computeCSS函数中，我们必须知道元素的所有父元素才能判断元素与规则是否匹配
* 我们从上一步骤的stack，可以获取本元素所有的父元素
* 因为我们首先获取的是"当前元素"，所以我们获得和计算父元素匹配的顺序是从内向外

>CSS规则的最后一项一定是匹配当前元素，因此最后一项一定是优先处理
先计算 #myid,然后一级一级往上找，  
### 第四步-拆分选择器
* 选择器也要从当前元素向外排列
* 复杂选择器拆成针对单个元素的选择器，用循环匹配父元素队列
#### 选择器分类
* 简单选择器
* 复合选择器
* 父子选择器
* 子孙选择器
* 兄弟选择器
* 伪类选择器
* 伪元素选择器
* 原子选择器

>行内样式如何匹配
行内样式已经存在当前元素上了，我们只需要匹配style标签中的样式， 最后再把 style标签内的样式与行内样式进行合并
>
>react最终把css都解析到了 行内样式上，因此是没有 CSScomput的阶段的，从这一方面来说，性能是很好的
### 第五步-计算选择器与元素匹配
* 根据选择器的类型和元素属性，计算是否与当前元素匹配
* 这里仅仅实现了三种基本选择器，实际的浏览器中药处理复合选择器
### 第六步-生成computed属性
* 一旦选择匹配，就应用选择器到元素上，形成computedStyle
### 第七步-确认覆盖关系```Specificity```
* CSS 规则根据 specificity 和后来优先规则覆盖
* specificity 是个四元组，越左边权重越高
* 一个 CSS 规则的 specificity 根据包含的简单选择器相加而成

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        div a {
            color: green;
        }
        a {
            color: red;
        }
        /*这个是最高的额*/
        a#y {
            color: yellow;
        }
        a.x {
            color: palevioletred
        }
    </style>
</head>
<body>
    <div>
        <a href="" class='x' id="y">name</a>
    </div>
</body>
</html>
```
#### 简单选择器的优先级(从高到低)

* 行内
* id
* Class
* 标签

>当我们用一个非常复杂的规则去选择元素时，最终优先级可以用一个"四元组"来表示
[tag个数,class个数,id个数,inline(最高)]   结果从后往前数(因为最后一位是inline,优先级最高)

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        /* [3,2,1,0]  123  优先级更高*/
        body div.container a.x#y {
            color: yellow;
        }
        /* [3,1,1,0]  113 */
        body div a.x#y {
            color: green;
        }
    </style>
</head>
<body>
    <div class='container'>
        <a href="" class='x' id="y">name</a>
    </div>
</body>
</html>
```