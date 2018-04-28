var p1 = new Promise((done, fail) => {
  console.log("promise log -- 1");
  done();
});
setTimeout(function() {
  console.log("log in timeout -- 2");
  p1.then(() => {
    console.log("promise log -- 3");
  });
  console.log("log in timeout -- 4")
}, 0);
setTimeout(function() {
  console.log("log in timeout -- 5");
}, 0);
console.log("log -- 6");
p1.then(() => {
  console.log("promise log -- 7");
  setTimeout(function() {
    console.log("log in timeout -- 8");
  }, 0);
}).then(() => {
  console.log("promise log -- 9");
});
console.log("log -- 10");

/*
浏览器中的执行结果：
promise log -- 1
log -- 6
log -- 10
promise log -- 7
promise log -- 9
log in timeout -- 2
log in timeout -- 4
promise log -- 3
log in timeout -- 5
log in timeout -- 8

node 中的执行结果（v7.10.0）
promise log -- 1
log -- 6
log -- 10
promise log -- 7
promise log -- 9
log in timeout -- 2
log in timeout -- 4
log in timeout -- 5
promise log -- 3
log in timeout -- 8
或者：
promise log -- 1
log -- 6
log -- 10
promise log -- 7
promise log -- 9
log in timeout -- 2
log in timeout -- 4
log in timeout -- 5
log in timeout -- 8
promise log -- 3

总结：
1、promise 构造器内的函数是立即执行的
2、then 内的内容会滞后调用
3、setTimeout 回调函数内的内容，会按照 timeout 的定义顺序依次执行
4、在 node 中，setTimeout 中的 promise 链可能会在其他 setTimeout 后执行
*/
