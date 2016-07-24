// call 和 apply 的区别
function sum(x, y) {
  return x + y;
}
function call1(x, y) {
  return sum.call(this, num1, num2);    //可变参数形式
}
function apply1(x, y) {
  return sum.apply(this, [num1, num2]);   //数组形式
}
// alert(call1(10, 20));
// alert(apply1(20, 40));
/*
  可见，二者从语义上没有任何区别，都是调用指定函数，并改变函数执行时this的指向
  区别在于形式：
  call可以直接传递任意多个实际参数
  而apply则将多个实参组合成数组，作为第二个实参
*/

// 改变作用域（也就是this）
window.color = "red";
var obj = {color : "blue"};
function showColor() {
  alert(this.color);
}

// showColor.call(this);     //这里的this指向window
// showColor.call(obj);      //这里的this指向obj

// 模拟实现 call 方法
function test1() {
  return this.x + this.y;
}
function Obj(x, y) {
  this.x = x;
  this.y = y;
}

var o = new Obj(10, 20);
//外部模拟
o.method = test1;
alert(o.method());
delete o.method;

//alert(test1.call(o, o.x, o.y))
