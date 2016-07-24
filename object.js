// 简单的创建对象的方式
/*
var obj = new Object();     //var obj = {};
obj.name = "z3";
obj.gender = "男";
boj.sayName = function() {alert("我是张三");};
*/

// 使用类的概念来创建对象
// 第一种形式 工厂模式
function createPerson(name, gender, age) {
  var obj = {};
  obj.name = name;
  obj.gender = gender;
  obj.age = age;
  obj.sayName = function() {
    alert(this.name);
  };
  return obj;
}
var p1 = createPerson("z3", "男", 20);
var p2 = createPerson("z4", "女", 25);

//alert(p1.gender);
//p1.sayName();

// 第二种形式 构造函数
// 函数的第一个字母要大写，表示这是类的构造函数（类的模板）
function Person(name, gender, age) {
  this.name = name;
  this.gender = gender;
  this.age = age;
  this.sayName = function() {
    alert(this.name);
  };
}

// 构造一个对象 使用new关键字， 传递参数，执行模板代码 返回对象
// var p1 = new Person("小1", "男", 20);
// var p2 = new Person("小2", "女", 21);
//注意，这里必须使用new关键字，如果不使用new，则会被当成函数来执行
//alert(p1.name);
//p1.sayName();
//alert(p1 == p2);     //类的概念，使用模板创建出不同的实例对象

// alert(p1.constructor === Person);
// alert(p2.constructor === Person);

// alert(p1 instanceof Person);
// alert(p1 instanceof Object);

//创建对象的方式
//var p1 = new Person("小1", "男", 20);

//不能直接使用Person()
// Person("小1", "男", 20);
// alert(name);

//使用 call 的话，会不支持instanceof
var o = new Object();
Person.call(o, "小4", 12, "女");
// alert(o.name);
// o.sayName();
alert(o instanceof Person);   //false
