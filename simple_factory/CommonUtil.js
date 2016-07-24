// 创建一个命名空间对象
var BangZ = {};
// 接口的实现
BangZ.Interface = function(name, methods) {
  // 判断参数的个数
  if (arguments.length < 2) {
    throw new Error("this interface constructor must be more than 2 parameters");
  }
  this.name = name;
  //this.methods = methods;
  //必须要检测方法名称的合法性
  this.methods = [];      //定义一个内置的空数组对象，用于接收methods里的元素（方法名字）
  for (var i = 0; i < methods.length; i++) {
    if (typeof methods[i] !== "string") {
      throw new Error("method name must be string !");
    }
    this.methods.push(methods[i]);
  }
};
// 接口的检测方法
BangZ.Interface.ensureImplements = function(object) {
  // 如果检测方法里面的参数小于两个，则检测失败
  if (arguments.length < 2) {
    throw new Error("this method should be passed at least 2 params");
  }
  // 获得接口的实例对象
  for (var i = 1; i < arguments.length; i++) {
    var interfaceIns = arguments[i];
    // 判断参数是否为接口类型
    if (interfaceIns.constructor !== BangZ.Interface) {
      throw new Error("argument "+i+" is not Interface!!!");
    }
    // 循环遍历检测接口中的每一个方法
    for (var j = 0; j < interfaceIns.methods.length; j++) {
      // 用一个临时变量接收方法的名字
      var methodName = interfaceIns.methods[j];
      // object[key] 就是方法
      if (!object[methodName] || typeof object[methodName] !== "function") {
        throw new Error("the method \""+methodName+"\" is not found!");
      }
    }
  }
};
// 继承的实现
BangZ.extend = function(sub, sup) {   //模拟 extjs 底层的继承机制
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
};
