// 单体模式 (singleton)
// 其实就是单例模式
// 1、简单单体模式
/*
var Singleton = {
  attr1 : true,
  attr2 : 10,
  method1 : function() {
    alert("我是方法1");
  },
  method2 : function() {
    alert("我是方法2");
  }
};
alert(Singleton.attr1);
*/
// 补充：划分命名空间（区分代码），类似Ext.Manager.attr1 / method1
/*
var BHX = {};
BHX.Singleton = {
  attr1 : true,
  attr2 : 10,
  method1 : function() {
    alert("我是方法1");
  },
  method2 : function() {
    alert("我是方法2");
  }
};
BHX.Singleton.method1();
*/

// 2 闭包单体模式
// 借用闭包创建单体，闭包能够保护数据，保护全局命名空间的干净
// 定义命名空间
var BHX = {};
BHX.Singleton = (function() {
  //添加自己的私有成员
  var a1 = true;
  var a2 = 10;

  var f1 = function() {
    alert("f1");
  };

  var f2 = function() {
    alert("f2");
  };

  return {
    attr1 : a1,
    attr2 : a2,
    method1 : function() {
      return f1();    //返回函数的执行结果，而不是直接返回函数
    },
    method2 : function() {
      return f2();
    }
  };
})();

alert(BHX.Singleton.attr1);
BHX.Singleton.method1();
