// obj1.isPrototypeOf(obj2)   //用于判断一个obj1是否为obj2的原型对象

// Object.getPrototypeOf(obj1)    //用于从实例中获取对象原型


function Person() {}

Person.prototype.name = "z3";
Person.prototype.age = 20;
Person.prototype.sayName = function() {alert("我是原型对象的方法");};

// var p1 = new Person();
// alert(p1.name);   //z3
// var prototypeObj = Object.getPrototypeOf(p1);
// alert(prototypeObj === Person.prototype);

/*
  每次读取一个对象的属性的时候，首先会进行一次搜索，搜索实例对象里的 name 属性，看看有没有，
  如果没有，再去p2 的实例所对应的原型对象里面去搜索 name 属性，如果有就返回，没有返回undefined
*/
// var p2 = new Person();
// p2.name = "w5";     // 实例对象的name
// alert(p2.name);
// delete p2.name;
// alert(p2.name);     // 就想获得原型对象的name

//判断一个对象的属性，是属于原型的属性，还是属于自身实例的属性
// 这里需要使用到 hasOwnProperty 方法
// var p3 = new Person();
// // p3.name = "z6";
// alert(p3.name);
// alert(p3.hasOwnProperty("name"));

// in 关键字，判断属性是否存在于实例对象或原型对象中
// var p1 = new Person();
// alert("name" in p1);    //true
// var p2 = new Person();
// p2.name = "w3";
// alert("name" in p2);    //true

//判断一个属性，是否存在于原型对象中
// 在原型对象中，是否存在这个属性
// 第一个参数：当前对象，第二个参数，要判断的属性
// function hasPrototypeProperty(obj, attr) {
//   return !obj.hasOwnProperty(attr) && attr in obj;
// }
// var p3 = new Person();
// // p3.name = "xiao A";
// alert(hasPrototypeProperty(p3, "name"));

// ECMAScript 5 新特性：Object.keys();
// 拿到当前对象里的所有keys，返回一个数组
var p1 = new Person();
p1.name = "z3";
p1.age = 20;
alert(Object.keys(p1));   //name, age
alert(Object.keys(Person.prototype));   //name, age, sayName

// ECMAScript 5 新特性：Object.getOwnPropertyNames()
// 我们知道 constructor 构造函数属性是不能被枚举的
// 但是使用 Object.getOwnPropertyNames 可以列出对象的所有属性，包括不能被枚举的属性
var attributes = Object.getOwnPropertyNames(Person.prototype);
alert(attributes);
