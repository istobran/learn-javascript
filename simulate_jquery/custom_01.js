// 模拟 jquery 的底层链式编程

// 仅模拟jQuery链式编程，不模拟jQuery的底层实现

// 立即执行函数（伪块级作用域）
// 特点1 当加载本js文件的时候，函数会被立即执行
// 特点2 内部的成员变量，外部无法访问（除了不加var修饰的全局变量）
(function(window, undefined) {
  // $ 最常用的对象，用于返回给外界
  // 大型程序开发一般使用"_"作为私有成员的前缀（规范）
  function _$(selector) {
    // 实现代码...
    // 正则表达式匹配id选择器
    var idselector = /#\w+/;
    this.dom;   // 此属性接收所有得到的元素
    if (idselector.test(selector)) {
      this.dom = document.getElementById(selector.substring(1));
    } else {
      throw new Error("nothing found!");
    }
  }

  // 实现仅函数式的链式编程
  Function.prototype.buildMethod = function(methodName, fn) {
    this.prototype[methodName] = fn;
    return this;      //这里的this用于连接连续两次的buildMethod调用
  };

  // 以上操作相当于实现了以下功能
  // _$.prototype = {
  //   constructor : _$,
  //   addEvent : function() {
  //     alert("Function addEvent ( in prototype )");
  //     return this;      //这里的 return this 用于连接连续的addEvent或setStyle调用
  //   },
  //   addStyle : function() {
  //     alert("Function setStyle ( in prototype )");
  //     return this;
  //   }
  // };

  // window上先注册一个全局变量，与外界产生联系
  window.$ = _$;

  // 写一个用于准备的方法
  _$.onReady = function(fn) {
    // 1 使用链式编程的方式，将函数挂接到 prototype 上
    _$.buildMethod("addEvent", function(type, fn) {     //参数1: 监听类型，参数2: 操作
      // 注册事件
      if (window.addEventListener) {    // W3C
        this.dom.addEventListener(type, fn);
      } else if (window.attachEvent) {    // IE6/7/8
        this.dom.attachEvent("on"+type, fn);
      }
      return this;      //这里的 return this 用于连接连续的addEvent或setStyle调用
    }).buildMethod("setStyle", function(prop, val) {     //参数1: 属性，参数2: 值
      this.dom.style[prop] = val;
      return this;
    });
    // 2 实例化_$对象，并注册到window上
    window.$ = function(selector) {     //实质上这个函数将会被执行
      return new _$(selector);     //只有在执行onReady函数时才会进行注册
    };
    /*
    执行流程分析：在外部先调用了onReady，把匿名函数当成参数传进来
    然后往下面走，执行 69 行的函数，此时根据 61 行的设定，$ 的指向已经改变
    于是外部执行 $("#inp") ，将字符串参数 "#inp" 传进61行作为参数
    因为使用了 new 关键字，所以此时的 this 指向 _$ 的实例
    所以 $("#inp") 的执行结果应该是返回一个包含 dom 属性的 _$ 实例

    最后被点击的时候，会触发点击事件，在触发点击事件并执行函数时
    this 会指向被点击的 target ，也就是外面的按钮DOM元素，而不是这里的 _$ 实例
    */
    // 3 执行传入进来的函数
    fn();
  };
})(window);
