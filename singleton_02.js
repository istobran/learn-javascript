// 惰性单体（懒汉式单例模式）
// 定义命名空间
/*
var Ext = {};
Ext.Base = (function() {
  // 定义私有变量，控制返回的单体对象
  var uniqInstance;   // undefined，不实例化

  // 需要一个构造器，用于初始化单体
  function init() {
    // 私有成员变量
    var a1 = 10;
    var a2 = true;
    var fn1 = function() {alert("fn1")};
    var fn2 = function() {alert("fn2")};
    return {
      attr1 : a1,
      attr2 : a2,
      method1 : function() {
        return fn1();
      },
      method2 : function() {
        return fn2();
      }
    };
  }
  return {
      getInstance : function() {
        if (!uniqInstance) {
          uniqInstance = init();
        }
        return uniqInstance;
      }
  }
})();
Ext.Base.getInstance().method1();
*/

// 分支单体（根据不同的分支返回不同的单体）
// 浏览器分支
var Ext = {};
var def = true;      //假设true表示检测到火狐，false表示检测到IE
Ext.More = (function() {    //立即判断浏览器的UA并根据不同的需要返回单体
  var objA = {
    attr1: "FF属性1"
    // 属性1
    // 属性2
    // 方法1
    // 方法2
  };
  var objB = {
    attr1: "IE属性1"
    // 属性1
    // 属性2
    // 方法1
    // 方法2
  };
  return (def) ? objA : objB;
})();
alert(Ext.More.attr1);
