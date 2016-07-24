// javascript 定义接口有三种方式
// interface_01.js 演示注解描述方式
// interface_02.js 演示属性检测方式
// interface_03.js 演示鸭式辩型方式

// 注解描述的方式
// 优点：程序员可以有一个参考
// 缺点：还是属于文档的范畴，这种方式约束太松了，没有检查接口的方法是否完全被实现

/*
 * interface Composite() {
 *   function add(obj);
 *   function remove(obj);
 *   function update(obj);
 * }
 */

// CompositeImpl implements Composite
var CompositeImpl = function() {};

CompositeImpl.prototype.add = function() {
  //do something;
};
CompositeImpl.prototype.remove = function() {
  //do something
};
CompositeImpl.prototype.update = function() {
  //do something
};
var c1 = new CompositeImpl();
var c2 = new CompositeImpl();
alert(c1.add == c2.add);
