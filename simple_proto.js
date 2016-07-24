//简单原型的实现
/*
function Person() {}
Person.prototype = {
  constructor : Person,       //手动将 构造函数 指向改回 Person
  name : 'z3',
  age : 20,
  job : '程序员',
  say : function() {
    alert('我是原型的函数！');
  }
};

var p1 = new Person();
*/
// alert(p1.name);
// p1.say();

//alert(Person.prototype.constructor);

// for (var attr in p1) {
//   console.log(attr);
// }
/*
  虽然成功将构造函数的指向改回了Person
  但是构造函数却变成了可枚举的属性
  这时候需要使用 ECMAScript 5 中的 defineProperty来修正
*/
// ECMA5给原型对象重新设置构造器的方法：Object.defineProperty()
// FF4+ IE8+
// 3 个参数，参数 1：要定义的对象，参数 2：属性名，参数 3：options 配置项
/*
Object.defineProperty(Person.prototype, "constructor", {
  enumerable : false,     //将枚举属性设置回false
  value : Person
});

for (var attr in p1) {      //枚举对象的所有keys
  console.log(attr);
}
*/

//原型的动态特性
function Person() {}
var p1 = new Person();    //在修改原型之前实例化
Person.prototype = {
  constructor : Person,
  say : function() {
    alert("我是原型的函数！");
  }
};
var p2 = new Person();     //在修改原型之后实例化
//p1.say();   //p1.say is not a function
// p2.say();
alert(Object.getOwnPropertyNames(Object.getPrototypeOf(p1)));
alert(Object.getOwnPropertyNames(Object.getPrototypeOf(p2)));
alert(Object.getPrototypeOf(p1) === Object.getPrototypeOf(p2));
