// 实现简单的函数链式调用

function Dog() {
  this.run = function() {
    alert("running...");
    return this;    // 实现链式调用
  };
  this.eat = function() {
    alert("eating...");
    return this;
  };
  this.sleep = function() {
    alert("sleeping...");
    return this;
  };
}

var d1 = new Dog();
// d1.run();
// d1.eat();
// d1.sleep();
d1.run().eat().sleep();
