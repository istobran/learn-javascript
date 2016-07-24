// 求和函数
function sum_v1(a, b) {    //两个参数
  return a + b;
}
function sum_v2(a, b, c) {    //两个参数
  return a + b + c;
}
function sum_v3() {
  //长度为 0 时
  if (arguments.length === 0) {
    return "no arg!";
  } else if (arguments.length === 1) {
    return arguments[0];
  } else {
    var sum = 0;
    //因为arguments不是数组，而是对象，所以这种方法行不通
    // arguments.reduce(function(prev, cur, index, array) {
    //   prev += cur;
    // });
    for (var index in arguments) {
      sum += arguments[index];
    }
    return sum;
  }
}
//alert(sum_v1(10, 20));
//alert(sum_v2(10, 20, 30));
alert(sum_v3(10, 20, 30, 40, 50));
