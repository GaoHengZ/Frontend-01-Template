# 第二周总结

> ## [乔姆斯基谱系](https://zh.wikipedia.org/wiki/%E4%B9%94%E5%A7%86%E6%96%AF%E5%9F%BA%E8%B0%B1%E7%B3%BB)
* 0 无限制文法
* 1 上下文相关文法
* 2 上下文无关文法
* 3 正则文法

## [BNF](https://zh.wikipedia.org/wiki/%E5%B7%B4%E7%A7%91%E6%96%AF%E8%8C%83%E5%BC%8F)
> BNF 规定是推导规则(产生式)的集合，写为：
> 
> <符号> ::= <使用符号的表达式>
> 
> 这里的 <符号> 是非终结符，而表达式由一个符号序列，或用指示选择的竖杠 '|' 分隔的多个符号序列构成，每个符号序列整体都是左端的符号的一种可能的替代。从未在左端出现的符号叫做终结符。
 
### 使用BNF定义一个加法
```
// 0-9
<Number> = "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9";
    
// 十进制整数
<DecimalNumber> = "0" |(("1" | "2" | "3" |"4" | "5" | "6" | "7" | "8" | "9") <Number>*);
    
// 十进制加法
<Expression> = <DecimalNumber> "+" <DecimalNumber>;
    
// 多个十进制加法(递归)
<Expression> = <Expression> "+" <DecimalNumber>;
    
// 累加
<Expression> = <DecimalNumber> | <Expression> "+" <DecimalNumber>;
```

## inputElement (JavaScript词法)
* WhiteSpace 空格
  * TAB/HT
  * VT
  * FF 分页符
  * SP
  * NBSP
  * ZWNBSP/BOM
  * USP
* LineTerminator 换行符
  * LF 分页符
  * CR 换行符
  * LS 分行符
  * PS 分段符
* Comment 注释
  * 单行注释 //
  * 多行注释 /**/
* Token (有效的)
  * punctuation 符号(如 小于)
  * identifierName
    * identifier 标识符
        * 变量名
        * 属性
    * keywords 关键字
    * future reserved keywords
  * Literal 字面量/直接量 (具体的值)

### Literal、类型
> type是运行时

####  Number
* 语法
  * 整数语法
    * 十进制 12.3e10 (大E小e都可以)
        * 科学计数法
        * 小数
    * 二进制 0b开头
    * 八进制 0o开头
    * 十六进制 0x开头
  * 小数
    * 小数点前后都可以省略
* 最佳实践
  * 安全整数范围
  ```javascript
  Number.MAX_SAFE_INTEGER.toString(16)
  ```
  * 比较浮点数
  ```javascript
  // Number.EPSILON 属性表示 1 与Number可表示的大于 1 的最小的浮点数之间的差值。
  Math.abs(0.1+0.2-0.3)<=Number.EPSILON // true
  ```

####  String
* 字符集
  * ASCII
  * Unicode (最流行)
      *  UCS （unicode的BMP范围)  U+0000(0x0000--0)  - U+FFFF(0xffff--65535)
  * GB 国标，汉字
    * GB2312
    * GBK(GB13000)
    * GB18030
  * ISO-8859 欧洲
  * BIG5 台湾、繁体
* Encoding：
  * UTF
    * UTF8
    * UTF16
    * UTF 32
  * method
    * charCodeAt
    * codePointAt
* 语法：
  * 单引号
    * 里面可以写 \u转义（四位）和 \x转义（2位）
    * 可以被反斜杠转义的有  ' '' t n v b f r \ 
  * 双引号
  * 反引号
    * template 字符串模板
  
####  正则表达式