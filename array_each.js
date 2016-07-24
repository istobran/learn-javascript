// ECMAScript 5 中 forEach 方法的一个局限
var arr = [1, 2, 3, [4, [5, [6]]]];
// arr.forEach(function(item) {
//   alert(item);    //  依次输出了 (1), (2), (3), (4,5,6)
// });

//为了解决这一个问题，我们需要自己实现一个each方法，绑定在Array上
Array.prototype.each = function(fn) {
  try {
    // 1、目的：遍历数组的每一项
    // 计数器，记录当前元素的位置
    this.i || (this.i = 0);   // 将 i 绑定在数组上可以避免耦合，而不使用 var i
    // 2、严谨的判断什么时候走 each 方法
    // 当数组长度大于 0 的时候，并且传进来的参数必须是函数
    if (this.length > 0 && fn.constructor === Function) {
      //循环遍历数组的每一项
      while (this.i < this.length) {
        //获取数组的每一项
        var e = this[this.i];
        //如果当前元素获取到了，并且当前元素是一个数组
        if (e && e.constructor === Array) {
          //直接做递归操作
          arguments.callee.call(e, fn);
          //e.each(fn);
        } else {
          //如果不是数组（那就是一个普通元素）
          //为了提高性能，使用apply和call来控制绑定对象
          //直接绑定 e ，能够获得和true同样的效果，并且节省空间
          //fn.apply(e, [e]);
          fn.call(e, e);
          /*
            注：个人觉得这里应该绑定null
            因为 e 的大小不能够确定，e越复杂，性能越差
            参考根据：http://corpus.hubwiz.com/1010000002400995.html
          */
        }
        this.i++;
      }
      this.i = null;   //释放内存 垃圾回收机制会自动回收变量
    }
  } catch (ex) {
    //处理异常
  }
  return this;    //返回当前数组
};

arr.each(function(item) {
  alert(item);
});
