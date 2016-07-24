// 关于 javascript 中的 arguments对象

function test(a, b, c, d) {

  // alert(test.length);   //获得形参个数    4
  // alert(arguments.length);    //获得实参个数    2
  // 注：实际应用中，为避免发生闭包以及递归出错等问题，一般不使用test.length
  // 要获得形参个数，一般使用以下方式获得
  // alert(arguments.callee.length);

  // 获取 arguments 中的参数
  // alert(arguments[0]);
  // alert(arguments[1]);
  // 注：根据前面 sum.js 得出来的结论，arguments 不是数组，而是对象
  // 只是它的 key 是数字而已，若要遍历 arguments，需要使用 for in 语句

  //参数个数判断的一般方法
  if (arguments.length === arguments.callee.length) {
    return a + b;
  } else {
    return "参数不正确！";
  }
}
//test(10, 20);   //就算形参有四个，但只传递两个实参，也不会报错

// 使用 callee 进行递归阶乘
function fact(num) {
  if (num <= 1) return 1;
  // else return num * fact(num - 1);  // TypeError: fact is not a function
  else return num * arguments.callee(num - 1);
}

//alert(fact(5));
//下面演示为什么上面必须使用arguments.callee，而不能使用fact
var F = fact;
fact = null;
alert(F(5));
// 根据上面的例子，同时可知将fact赋值给F时，实质上是浅克隆了一份fact函数给F
