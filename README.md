# EventHub
a simple eventhub for vue

# 存在问题：执行off产生数组塌陷
因为每次都是使用splice来切割数组的，所以off之后的事件直接消失，后面的事件就往前补空缺，使得下标index改变
```
const eventHub = new EventHub();
function fn1() {
    console.log(1);
}
function fn2() {
    console.log(2);
}
function fn3() {
    console.log(3);
    eventHub.off("init", fn1);
    eventHub.off("init", fn2);
    eventHub.off("init", fn3);
}
function fn4() {
    console.log(4);
}
function fn5() {
    console.log(5);
}
function fn6() {
    console.log(6);
}
eventHub.on("init", fn1);
eventHub.on("init", fn2);
eventHub.on("init", fn3);
eventHub.on("init", fn4);
eventHub.on("init", fn5);
eventHub.on("init", fn6);
console.log("第一次执行事件");
eventHub.emit("init");
console.log("第二次执行事件");
eventHub.emit("init");
```
# 解决办法
如果有off取消事件，就先将off的事件指向null
在下一次emit触发事件的时候再重构事件数组
