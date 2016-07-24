/*
var name = "xiao A";
var obj = {
  name : "xiao B",
  getName : function() {
    return function() {
      return this.name;
    };
  }
};
*/
//alert(obj.getName()());   //输出 xiao A
//var k = obj.getName();    //返回一个函数
//alert(typeof k);    // function 类型
//alert(k());     //相当于window.k()，函数中的this指向全局window

/*
var name = "xiao A";
var obj = {
  name : "xiao B",
  getName : function() {
    // this 在这里指向的是调用者 obj
    var o = this;
    return function() {
      return o.name;
    };
  }
};
// alert(obj.getName()());   //输出 xiao B

var k = obj.getName();
alert(k());
*/


//闭包： 一个函数 可以访问另外一个函数作用域中的变量
// 封闭性： private 起到一个保护变量的作用
function f(x) {
  var temp = x;
  return function(x) {
    temp += x;
    alert(temp);
  };
}

var a = f(50);
a(5);   //55
a(10);    //65
a(20);    //85
/*
可见，temp并没有在函数执行完毕后自动销毁
这是因为，在返回的function中，temp被标记为引用，所以不会被垃圾回收机制回收
*/
