// js中怎么去实现继承：采用原型链的概念

// 构造函数 原型对象 实例对象 的关系
// 1 构造函数.prototype = 原型对象
// 2 原型对象.constructor = 构造函数模板
// 3 原型对象.isPrototypeOf(实例对象)   判断实例对象的原型，是不是当前对象
// 4 构造函数 实例对象 （相当于类和实例对象的关系）

// 父类构造函数 sup
function Sup(name) {
  this.name = name;
}

Sup.prototype = {
  constructor : Sup,
  sayName : function() {
    alert(this.name);
  }
};

// 子类构造函数 sub
function Sub(age) {
  this.age = age;
}

// 如果我们让子类的原型对象 等于父类的实例，结果会怎么样呢？（实现了 js 的继承）
// 1 显然此时的原型对象将包含指向另一个原型的指针
// Sup 的实例对象和 Sup 的原型对象有一个属性映射的关系
// 2 相应的另一个原型中也包含着指向另一个构造函数的指针

//Sub.prototype = new Sup();
Sub.prototype = new Sup("张三");    //若要设定 name，则需要在继承的时候设定
//alert(Sub.prototype.constructor);
// var p1 = new Sub("张三");   //无法设置 name
var p1 = new Sub(12);         //只能设置age
p1.sayName();
alert(p1.age);

// 以下代码说明，当修改prototype属性的指向实现继承时，原型会发生特殊的变化
// alert(Object.getOwnPropertyNames(Object.getPrototypeOf(p1)));
// alert(Object.getOwnPropertyNames(Sub.prototype));
// alert(Object.getOwnPropertyNames(p1));
// 参考资料：http://stackoverflow.com/questions/9267157/why-is-it-impossible-to-change-constructor-function-from-prototype

/*
  由以上内容可知，事实上，无论prototype.constructor怎么改，都不会影响到构造函数的调用
  所以使用 new 关键字调用构造函数时，一定会去调用与构造函数同名的函数，而不是prototype.constructor
  也就是说，使用 new 关键字创建对象的时候，底层创建过程并不依赖prototype.constructor
  所以 prototype.constructor 只是一个用于给用户方便的指针，默认指向它的构造函数罢了
*/
