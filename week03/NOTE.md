# 第三周总结

## Expression 表达式

表达式语句实际上就是一个表达式，它是由运算符连接变量或者直接量构成的。

### Primary Expression 主要表达式

JavaScript中的基本关键字和通用表达式

比如： `this`

### MemberExpression 成员表达式

Member Expression 通常是用于访问对象成员的。它有几种形式：

```javascript
a.b;
a["b"];
new.target;// 是否实例化过
super.b;// super 父属性
f`a${b}c`;
new Cls();
```

### NewExpression NEW 表达式

Member Expression 加上 new 就是 New Expression

### CallExpression 函数调用表达式

基本形式是 `Member Expression` 后加一个括号里的参数列表，或者我们可以用上 super 关键字代替 `Member Expression`。

```javascript
a.b()
super()
```

### LeftHandSideExpression 左值表达式

`New Expression` 和 `Call Expression` 统称 `LeftHandSideExpression`，左值表达式。左值表达式就是可以放到等号左边的表达式。

### AssignmentExpression 赋值表达式

`AssignmentExpression`赋值表达式也有多种形态，最基本的当然是使用等号赋值。还有一些变体：

```
*=、/=、%=、+=、-=、<<=、>>=、>>>=、&=、^=、|=、**=
```

### xpression 表达式

在 JavaScript 中，表达式就是用逗号运算符连接的赋值表达式。

### 右值表达式RightHandSideExpression

对于右值表达式来说，我们可以理解为以左值表达式为最小单位开始构成的。

#### 更新表达式 UpdateExpression

左值表达式搭配 ++ – 运算符，可以形成更新表达式。

#### 一元运算表达式 UnaryExpression

更新表达式搭配一元运算符，可以形成一元运算表达式。

#### 求冪表达式 ExponentiationExpression

求冪表达式也是由更新表达式构成的。它使用**号。

#### 乘法表达式 MultiplicativeExpression

求冪表达式可以构成乘法表达式，用乘号或者除号、取余符号连接。

#### 加法表达式 AdditiveExpression

加法表达式是由乘法表达式用加号或者减号连接构成的。

#### 移位表达式 ShiftExpression

移位表达式由加法表达式构成  ?

移位运算把操作数看做二进制表示的整数，然后移动特定位数。所以左移 n 位相当于乘以 2 的 n 次方，右移 n 位相当于除以 2 取整 n 次。

#### 关系表达式 RelationalExpression

移位表达式可以构成关系表达式，这里的关系表达式就是大于、小于、大于等于、小于等于等运算符号连接，统称为关系运算。

#### 相等表达式 EqualityExpression

相等表达式是由关系表达式用相等比较运算符（如 ==）连接构成的。

==运算符三条规则：

* `undefined` 与`null` 相等
* 字符串和 `bool` 都转为数字再比较
* 对象转换成 `primitive` 类型再比较

#### 位运算表达式

位运算表达式共有三种：

* 按位与表达式 `BitwiseANDExpression`
* 按位异或表达式 `BitwiseANDExpression`
* 按位或表达式 `BitwiseORExpression`

#### 逻辑与表达式和逻辑或表达式

逻辑与表达式由按位或表达式经过逻辑与运算符连接构成，逻辑或表达式则由逻辑与表达式经逻辑或运算符连接构成。逻辑表达式具有短路的特性。

#### 条件表达式 `ConditionalExpression`

条件表达式由逻辑或表达式和条件运算符构成，条件运算符又称三目运算符，它有三个部分，由两个运算符?和:配合使用。

## 语法

### 语句分类

* 简单语句
* 组合语句
* 声明

### Completion Record

Completion Record 表示一个语句执行完之后的结果，它有三个字段：

* [[type]] 表示完成的类型，有 break continue return throw 和 normal 几种类型；
* [[value]] 表示语句的返回值，如果语句没有，则是 empty；
* [[target]] 表示语句的目标，通常是一个 JavaScript 标签。

### 简单语句

* `ExpressionStatement `：普通语句
* `EmptyStatement`：空语句
* `DebuggerStatement`：debugger语句
* `ThrowStatment`：throw语句
* `ContinueStatement`：continue语句
* `BreakStatement`：break语句
* `ReturnStatement`：return语句

### 复合语句

* `BlockStatement `：语句块
* `IfStatement `：if语句
* `SwitchStatement `：switch语句
* `IterationStatement `：循环语句
* `WithStatement `：with语句
* `LabelledStatement `：label语句
* `TryStatement`：try语句

### 声明

* `FunctionDeclaration `：函数声明
* `GeneratorDeclaration` ：生成器函数声明
* `AsyncFunctionDeclaration `：异步函数声明
* `AsyncGeneratorDeclaration `：异步生成器函数声明
* `VariableStatement `：变量声明
* `ClassDeclaration `：class类声明
* `LexicalDeclaration`

### 预处理、变量提升

#### var声明与赋值

* var 声明作用域函数执行的作用域。也就是说，var 会穿透 for 、if 等语句
* 立即执行的函数表达式（`IIFE`），通过创建一个函数，并且立即执行，来构造一个新的域，从而控制 var 的范围，形成块级作用域。

```javascript
void function(){
    var a
}()// 推荐的IIFE函数写法
```

* with会改变作用域

```javascript
var b
void function(){
    var env={b:1}
    b=2
    console.log('in function b:',b)// 2
    with(env){
        console.log('in with b:',b)// 1
    }
}()
console.log('in golbal b:',b)// 2
```

#### let声明

产生let块级作用域语句：

* for、if、switch、try、catch、finally

#### Realm

在最新的标准（9.0）中，JavaScript 引入了一个新概念 Realm，它的中文意思是“国度”“领域”“范围”。Realm 中包含一组完整的内置对象，而且是复制关系。

浏览器环境中获取来自两个 Realm 的对象，它们跟本土的 Object 做 `instanceOf` 时会产生差异：

```javascript
var iframe = document.createElement('iframe')
document.documentElement.appendChild(iframe)
iframe.src="javascript:var b = {};"
var b1 = iframe.contentWindow.b;
var b2 = {};
console.log(typeof b1, typeof b2); //object object
console.log(b1 instanceof Object, b2 instanceof Object); //false true
```

## JavaScript对象

### 对象的概念

* 一个可以触摸或者看见的东西
* 人的智力可以理解的东西
* 可以指导思考或行动的东西

### 对象的特征

* 对象具有唯一标识性：即使完全相同的两个对象，也并非同一个对象
* 对象具有状态：同一个对象可能处于不同状态
* 对象具有行为：对象的状态，可能因为它的行为产生变迁
* 在`JavaScript`中，将状态和行为统一抽象为“属性”

### JavaScript 对象的两类属性

`JavaScript`对象具有高度的动态性，这是因为 `JavaScript`赋予了使用者在运行时为对象添改状态和行为的能力。

#### 数据属性

数据属性有四个特征：

* `value`：属性值
* `writeable`：属性能否被赋值
* `enumerable`：属性是否可枚举
* `configurable`：属性是否可删除或者改变特征值

#### 访问器属性

访问器属性也有四个特征：

* `getter`：取值时调用
* `setter`：设置值时调用
* `enumerable`：属性是否可枚举
* `configurable`：属性是否可删除或者改变特征值

查看对象属性特征：`Object.getOwnPropertyDescripter`

改变对象属性的特征：`Object.defineProperty`

```javascript
Object.defineProperty(o, "b", {
    value: 2, 
    writable: false, 
    enumerable: false, 
    configurable: true
});
```

### 特殊行为的对象

* `Array`：`Array`的`length`属性根据最大的下标自动发生变化
* `Object.prototype`：作为所有正常对象的默认原型，不能再给它设置原型
* `String`：为了支持下标运算，`String`的正整数属性访问会去字符串里查找
* `Arguments`：`arguments`的非负数整型下标属性跟对应的变量联动
* 模块的`nameSpace`对象：尽量只用于`import`
* 类数组和数组缓冲区：根内存块关联，下标运算比较快
* `bind`后的`function`：跟原来的函数相关联

----
# JavaScript 标准里所有的对象

## Built-in Exotic Object Internal Methods and Slots

### Bound Function Exotic Objects

* [[BoundTargetFunction]]
* [[BoundThis]]
* [[BoundArguments]]
* [[Call]]
* [[Construct]]
* [[BoundFunctionCreate]]

### Array Exotic Objects

* [[DefineOwnProperty]] 
* [[ArrayCreate]] 
* [[ArraySpeciesCreate]] 
* [[ArraySetLength]] 

### String Exotic Objects

### [[GetOwnProperty]]
* [[DefineOwnProperty]]
* [[OwnPropertyKeys]]
* StringCreate
* StringGetOwnProperty

### Arguments Exotic Objects

* [[GetOwnProperty]]
* [[DefineOwnProperty]]
* [[Get]]
* [[Set]]
* [[Delete]]
* CreateUnmappedArgumentsObject

### CreateMappedArgumentsObject

*  MakeArgGetter
*  MakeArgSetter

### Integer-Indexed Exotic Objects

* [[GetOwnProperty]]
* [[HasProperty]]
* [[DefineOwnProperty]]
* [[Get]]
* [[Set]]
* [[OwnPropertyKeys]] 
* IntegerIndexedObjectCreate 
* IntegerIndexedElementGet
* IntegerIndexedElementSet

### Module Namespace Exotic Objects

* [[Module]]
* [[Exports]]
* [[Prototype]]
* [[SetPrototypeOf]]
* [[IsExtensible]
* [[PreventExtensions]]
* [[GetOwnProperty]]
* [[DefineOwnProperty]] 
* [[HasProperty]]
* [[Get]]
* [[Set]]
* [[Delete]]
* [[OwnPropertyKeys]]
* ModuleNamespaceCreate
* [[Delete]]

### Immutable Prototype Exotic Objects

* [[SetPrototypeOf]]
* SetImmutablePrototype
