// 函数的三种定义方式

// 1、function 语句式
// function test1() {
//   alert("我是test1");
// }
//test1();

// 2、函数直接量式 （ECMAScript推荐）
// var test2 = function () {
//   alert("我是test2");
// };
// test2();

// 3、function 构造函数式（是一种 eval 的形式，不安全，不推荐）
// var test3 = new Function("a", "b", "return a+b;");
//alert(test3(10, 20));

// 关于不同的定义方式的效率方面
// var before = new Date().getTime();
// for (var i = 0; i < 100000; i++) {
  //function test1() {;}
  //var test2 = function() {;}
  //var test3 = new Function();
// }
// var after = new Date().getTime();
//alert(after - before);
/*
说明：这里面的原理有点类似于 java 创建 String 的方法
当调用 new 关键字的时候每一次都会重新生成一个对象
而对于 test1 来说，它则从对象池中查找，若相同则不用重新声明
所有有人认为，test1 与 test2 都是静态的，test3是动态的

Google V8 引擎在这里做到了很大的效率优化
循环十万次定义 test1 ———— 11ms ~ 15ms -> 5 ~ 8ms
循环十万次定义 test2 ———— 11ms ~ 15ms -> 5 ~ 8ms
循环十万次定义 test3 ———— 1600ms ~ 1700ms -> 50 ~ 55ms （大幅度）
*/

// 关于不同定义方式的解析优先级方面

// test1();    // 成功输出test1
// function test1() {
//   alert("test1");
// }

// alert(test2);   // 返回 undefined
//而不是报错 ReferenceError: test2 is not defined
//表示变量声明了，但是没有被赋值

// test2();    // 报错 TypeError: test2 is not a function
// var test2 = function() {
//   alert("test2");
// };
/*
说明：根据以上的例子，可以说明 function 语句式在运行时会被优先解释
而 test2 虽然它的变量声明会被前置，但是它的赋值不会被优先执行，所以在 test2() 处会发生错误
*/

// 函数不同定义方式的解析顺序
// 输出结果为 4 2 3 3 5 6
// function f() {return 1;}            //函数1
// alert(f());
// var f = new Function("return 2;");  //函数2
// alert(f());
// var f = function() {return 3;}      //函数3
// alert(f());
// function f() {return 4;}            //函数4
// alert(f());
// var f = new Function("return 5;");  //函数5
// alert(f());
// var f = function() {return 6;}      //函数6
// alert(f());
/*
根据以上输出结果，我们可以得到几点结论
1、function语句式绝对会被优先解析
2、var f 这样的定义方式可以重复定义，而且每次重复定义都会覆盖原来的变量

解释过程：
javascript 解释器首先对 function 语句式定义的函数先进行解释
解释器再把全局变量的定义给前置（现在可以不用考虑这一点）
所以第一个 alert(f()) 的结果为4
接着下面 函数2 和 函数3 将函数 f 依次覆盖，所以输出为 2 和 3
执行到 函数4 处时，由于它是语句式function已经被提前解释，所以该语句不再被执行
所以输出依然为 3
接着下面的 函数5 和 函数6 依次覆盖了函数 f ，所以输出为 5 和 6
*/

// 函数不同定义方式的作用域
var k = 1;
function t1() {
  var k = 2;
  // function test() {return k;}         // function 语句式     输出为 2
  // var test = function() {return k;};   // 函数直接量式     输出为 2
  // var test = new Function("return k;");   //构造函数式      输出为 1
  alert(test());
}
t1();
/*
以上的结果说明，使用构造函数式建立函数时，该函数所具有的作用域是全局作用域
而 function 语句式 和 函数直接量式 所构造的函数，作用域属于局部作用域
*/
