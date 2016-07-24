// 主流高级后端编程语言，如 java php 等，都有 for if 块级作用域的概念
// 但是 javascript 没有块级作用域的概念
function test() {
  for (var i = 1; i <= 5; i++) {
    alert(i);
  }
  alert(i);    // 输出 6
}
//test();

// javascript 的作用域是函数级别的
// 使用立即执行的函数表达式来模拟块级作用域

function test2() {
  (function() {       //构造匿名函数块级作用域
    for (var i = 1; i <= 5; i++) {
      alert(i);
    }
  })();
  alert(i);    // 无法输出，报错 ReferenceError: i is not defined
}
test2();
