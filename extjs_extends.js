// 混合继承
/*
function Person(name, age) {
  this.name = name;
  this.age = age;
}
Person.prototype = {
  constructor : Person,
  sayName : function() {
    alert("hello world!");
  }
};
function Boy(name, age, sex) {
  //Person.call(this, name, age);   //这一句注释掉，依然可以访问b.name
  this.sex = sex;
}
Boy.prototype = new Person();   //继承一定要使用 new 关键字

var b = new Boy("张三", 20, "男");
alert(b.name);    //undefined
alert(b.sex);
*/
/*
  混合继承虽然实现了继承，但是依然存在缺点
  Boy.prototype = new Person() 这一句，再加上 Person.call()
  其实相当于继承了两次父类模板，这样会拖慢执行效率
*/

// 混合继承的缺点： 3件事：继承了 2 次父类的模板，1 次父类的原型对象
// 目标： 2件事，实现仅继承 1 此父类模板，1 次父类的原型对象
// 自定义一个 extend 函数，实现仅继承一次父类原型对象
function extend(sub, sup) {   //模拟 extjs 底层的继承机制
  var F = new Function();   // 1 创建一个空函数用于进行中转（洗掉模板）
  F.prototype = sup.prototype;  // 2 实现空函数的原型对象和父类的原型对象的转换
  sub.prototype = new F();    // 3 实现原型继承
  sub.prototype.constructor = sub;    // 4 还原子类的构造器
  // 保存一下父类的原型对象：一方面能够方便解耦，另一方面能够方便获得父类的原型对象
  sub.superClass = sup.prototype;   //自定义一个子类的静态属性，接受父类原型对象
  //判断父类的原型对象的构造器（加保险）
  if (sup.prototype.constructor == Object.prototype.constructor) {
    sup.prototype.constructor = sup;    //手动还原父类原型对象的构造器
  }
}
function Person(name, age) {
  this.name = name;
  this.age = age;
}
Person.prototype = {
  constructor : Person,
  sayHello : function() {
    alert("hello world!");
  }
};
function Boy(name, age, sex) {
  //将Person修改为superClass
  Boy.superClass.constructor.call(this, name, age);
  this.sex = sex;
}
// 只继承一遍父类的原型对象
extend(Boy, Person);

//给子类添加一个原型对象方法
Boy.prototype.sayHello = function() {
  alert("hi javascript");
}

var b = new Boy("张三", 20, "男");
alert(b.name);
alert(b.sex);
b.sayHello();

//若想调用父类的 sayHello 则只需进行如下操作
Boy.superClass.sayHello.call(b);
