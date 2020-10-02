const { EventHub } = require("./eventHub");
const e = new EventHub();

function fn1() {
    console.log(1);
}
function fn2() {
    console.log(2);
    e.off("test", fn1);
    e.off("test", fn2);
}
function fn3() {
    console.log(3);
}
function fn4() {
    console.log(4);
}

e.on("test", fn1);
e.on("test", fn2);
e.on("test", fn3);
e.on("test", fn4);

e.emit("test");
e.emit("test");
