// 原型继承
// 原型继承的特点：既继承了父类的模板，又及继承了父类的原型对象
/*
//父类
function Person(name, age) {
  this.name = name;
  this.age = age;
}
//父类的原型对象属性
Person.prototype.id = 10;

//子类
function Boy(sex) {
  this.sex = sex;
}

//继承已经实现了
Boy.prototype = new Person("z3");

var b = new Boy();
alert(b.name);
alert(b.id);
*/

// 借用构造函数的方式继承
// 只继承模板，不继承原型对象
/*
//父类
function Person(name, age) {
  this.name = name;
  this.age = age;
}
//父类的原型对象属性
Person.prototype.id = 10;

//子类
function Boy(name, age, sex) {    //添加参数
  //使用 call 或者 apply
  Person.call(this, name, age);
  this.sex = sex;
}

var b = new Boy("张三", 20, "男");
// alert(b.name);
// alert(b.age);
// alert(b.sex);

alert(b.id);    //无法输出，也就是说没有继承到父类的原型对象
*/

// 原型继承+借用构造函数继承 = 混合继承
function Person(name, age) {
  this.name = name;
  this.age = age;
}
Person.prototype.id = 10;
Person.prototype.sayName = function() {alert(this.name);};
function Boy(name, age, sex) {
  Person.call(this, name, age);   // 1 借用构造函数继承   继承父类的模板
  this.sex = sex;
}
 // 2 原型继承（不传参数）
Boy.prototype = new Person();   //继承父类的原型对象

var b = new Boy("李四", 20, "男");
alert(b.name);    //说明实现了模板继承
alert(b.sex);
b.sayName();    //说明实现了原型继承
