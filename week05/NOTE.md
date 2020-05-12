# 第五周总结
## http报文

* 起始行（start line）
* 请求首部（header）
* 报文主体 (request-body)

### 请求报文首部
* 请求行
    * 请求方法
    * 请求URI
    * HTTP版本
    ```bash
        GET /path HTTP/1.1
    ```
* 请求首部字段
* 通用首部字段
* 实体首部字段
* 其他

常见的首部实例

![首部](./images/header.png)


### 响应报文首部
* 状态行
    * HTTP版本
    * 状态码
    * 原因短语
    ```bash
        HTTP/1.1 200 OK
    ```
* 响应首部字段
* 通用首部字段
* 实体首部字段
* 其他

### 状态码

* 100～199——信息性状态码
* 200～299——成功状态码
* 300～399——重定向状态码     <p65>
* 400～499——客户端错误状态码
* 500～599——服务器错误状态码

## 状态机
* 逻辑分割

> [JavaScript与有限状态机](http://www.ruanyifeng.com/blog/2013/09/finite-state_machine_for_javascript.html)


## DOS
* netstat -a -n  #各个端口占用
* netstat -ano   #各个端口占用和进程PID
* netstat -aon | findstr "8080" 
* tasklist | findstr "8080" 查看端口号所对应的应用程序
* taskkill /pid XXXX /F 终止进程