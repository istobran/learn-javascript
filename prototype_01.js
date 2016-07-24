// 构造函数的弊端
/*
function Person(name, age) {
  this.name = name;
  this.age = age;
  this.sayName = function() {
    alert("我是" + this.name);
  };
}
var p1 = new Person("z3", 20);
var p2 = new Person("z4", 21);
alert(p1.sayName == p2.sayName);    //返回false
*/
/*
  也就是说，每创建一个对象，构造函数里面的所有东西都会被重新创建一次
  无论是方法还是变量，各自独立的，无法共享方法和变量
  这会造成空间上的严重浪费，而且创建对象的效率相对会较慢
*/

// 为了解决这个问题，我们可以将共享的资源从构造函数中分离
/*
function sayName() {
  alert("我是" + this.name);
}
function Person(name, age) {
  this.name = name;
  this.age = age;
  this.sayName = sayName;
}
var p1 = new Person("z3", 20);
var p2 = new Person("z4", 21);
alert(p1.sayName == p2.sayName);    //返回 true
*/
/*
  这虽然是一种方法，但这种方法仅限于共享函数，无法实现共享变量
*/

// 使用 prototype 原型来实现共享
// 每一个函数都有一个 prototype 属性，这个属性其实是一个指针，而这个指针总指向一个对象
// 这个对象的用途就是将特定的属性和方法包含在内，起到一个所有实例所共享的的作用
function Person() {}
var obj = Person.prototype;
//alert(typeof obj);    //返回object

Person.prototype.name = "z3";
Person.prototype.age = 20;
Person.prototype.sayName = function() {
  alert(this.name);
};
var p1 = new Person();
var p2 = new Person();
// alert(p1.age);
// alert(p2.age);
// p1.sayName();
// p2.sayName();
// alert(p1.sayName === p2.sayName);

// 构造函数 原型对象 实例对象的关系
// 构造函数.prototype = 原型对象
// 原型对象.constructor = 构造函数
//alert(obj.constructor);

// 注意：无法使用 实例对象.prototype 获得原型对象
// alert(p1.prototype);    //undefined

//要从实例对象处获得原型对象，需要使用 ECMAScript5 中的新特性
alert(Object.getPrototypeOf(p1) === Person.prototype);  //true
//原型的判断方法
alert(obj.isPrototypeOf(p1));   //true
var a = new Object();
alert(obj.isPrototypeOf(a));
