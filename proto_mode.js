// 使用原型共享变量的时候会遇到的问题
/*
function Person() {}
Person.prototype = {
  constructor : Person,
  name : "z3",
  age : 20,
  job : "程序员",
  friends : ["李四", "王五"] ,
  sayName : function() {alert("我的名字");}
};
var p1 = new Person();
var p2 = new Person();
p1.friends.push("赵六");

alert(p1.friends);
alert(p2.friends);
*/
/*
  根据以上例子，可以发现，prototype原型中的属性都会被所有实例共享
  这样子看的话，原型中的属性就相当于java中的静态变量
*/

// 为了解决以上问题，我们可以考虑组合使用原型和构造函数式
// （定义一个类，开发时常用的方式）
/*
function Person(name, age, friends, job) {
  this.name = name;
  this.age = age;
  this.friends = friends;
  this.job = job;
}
Person.prototype = {
  constructor : Person,
  sayName : function() {
    alert(this.name);
  }
};
var p1 = new Person("z3", 20, ["王五", "赵六"], "技术总监");
var p2 = new Person("李四", 25, ["王五", "赵六", "赵7"], "boss");
alert(p1.friends);
p1.sayName();
alert(p2.friends);
p2.sayName();
*/

// 其他的几种原型模式：
// 动态原型模式
/*
function Person(name, age, friends, job) {
  this.name = name;
  this.age = age;
  this.friends = friends;
  this.job = job;

  if (typeof this.sayName != "Function") {
    Person.prototype.sayName = function() {
      alert(this.name);
    };
  }
}
var p1 = new Person("z3", 20, ["王五", "赵六"], "技术总监");
var p2 = new Person("李四", 25, ["王五", "赵六", "赵7"], "boss");
p1.sayName();
p2.sayName();
*/

// 稳妥构造函数式：durable object（稳妥对象）非常安全的环境中
// 1、没有公共属性 ， 2、不能使用this对象
function Person(name, age, job) {
  // 创建一个要返回的对象
  var obj = new Object();
  // 可以定义一下私有的变量和函数 private
  var name = name;
  // var sex = "男";
  // var saySex = function() {};
  // 添加一个方法
  obj.sayName = function() {
    alert(name);
  }
  return obj;
}
var p1 = new Person("张三");
p1.sayName();
