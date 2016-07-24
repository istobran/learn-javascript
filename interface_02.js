// javascript 定义接口有三种方式
// interface_01.js 演示注解描述方式
// interface_02.js 演示属性检测方式
// interface_03.js 演示鸭式辩型方式

// 属性检测的方式
// 优点：不再是简单的文档叙述，多了对接口名字的检测，使用IsImplements降低了耦合
// 缺点：不能检测接口中的方法的实现情况，就算有方法没有被实现，也能检测通过
/*
 * interface Composite() {
 *   function add(obj);
 *   function remove(obj);
 *   function update(obj);
 * }
 *
 * interface FormItem() {
 *   function select(obj);
 * }
 */

// 配置构造函数
// CompositeImpl implements Composite, FormItem
var CompositeImpl = function() {
  // 显示在类的内部，接收所实现的接口
  // 一般来说是一个规范：我们的项目经理：在类的内部定义一个数组（名字要固定）
  this.implementsInterface = ['Composite', 'FormItem'];
};

CompositeImpl.prototype.add = function() {
  alert("add...");
  //do something
};
CompositeImpl.prototype.remove = function() {
  //do something
};
CompositeImpl.prototype.update = function() {
  //do something
};
CompositeImpl.prototype.select = function() {
  //do something
};

// 定义一个用于检测实现情况的函数
function checkCompositeImpl(instance) {
  // 判断当前对象是否实现了所有的接口
  if (!IsImplements(instance, "Composite", "FormItem")) {
    throw new Error("Object does not implement a required interface!");
  }
}

// 检测过程的核心函数
// 这个方法的主要目的：就是判断实例对象有没有实现相关接口
function IsImplements(object) {
  // 先判断一下参数数量
  if (arguments.length < 2) {
    return false;
  }
  // 借助 arguments 对象获得函数的实际参数
  for (var i = 1; i < arguments.length; i++) {
    // 接收所需要判断的每一个接口的名字
    var interfaceName = arguments[i];
    // 声明一个 flag，用于标记是否找到对应的 interface
    var interfaceFound = false;
    for (var j = 0; j < object.implementsInterface.length; j++) {
      if (object.implementsInterface[j] === interfaceName) {
        interfaceFound = true;
        break;
      }
    }
    if (!interfaceFound) {
      return false;
    }
  }
  return true;
}

var c1 = new CompositeImpl();
checkCompositeImpl(c1);
c1.add();
