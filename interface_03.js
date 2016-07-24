// javascript 定义接口有三种方式
// interface_01.js 演示注解描述方式
// interface_02.js 演示属性检测方式
// interface_03.js 演示鸭式辩型方式

// 使用鸭式辩型法实现接口（最完美的 javascript 接口实现方式）
// 鸭式辩型法实现的核心：一个类实现接口的主要目的：把接口里的方法都实现（检测方法）
// 优点：完全面向对象，代码也实现统一，也解耦了

// 定义接口类 Class Interface ==> 实例化N多个接口

/*
 * 接口类需要两个参数
 * 参数1：接口名称
 * 参数2：接收方法名称的集合
 */
var Interface = function(name, methods) {
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

// 实例化接口对象
var CompositeInterface = new Interface("CompositeInterface", ["add", "remove"]);
var FormItemInterface = new Interface("FormItemInterface", ["update", "select"]);

// 具体的实现类
// CompositeImpl implements CompositeInterface, FormItemInterface
var CompositeImpl = function() {};
CompositeImpl.prototype.add = function() {
  alert("add");
};
CompositeImpl.prototype.remove = function() {
  alert("remove");
};
CompositeImpl.prototype.update = function() {
  alert("update");
};
CompositeImpl.prototype.select = function() {
  alert("select");
};

// 检验实例中是否实现了接口里的方法
// 如果检验通过，不做任何操作，如果检验不通过，则抛出Error
// 这个接口的目的，就是检测方法的
Interface.ensureImplements = function(object) {
  // 如果检测方法里面的参数小于两个，则检测失败
  if (arguments.length < 2) {
    throw new Error("this method should be passed at least 2 params");
  }
  // 获得接口的实例对象
  for (var i = 1; i < arguments.length; i++) {
    var interfaceIns = arguments[i];
    // 判断参数是否为接口类型
    if (interfaceIns.constructor !== Interface) {
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

var c1 = new CompositeImpl();
Interface.ensureImplements(c1, CompositeInterface, FormItemInterface);
c1.add();
