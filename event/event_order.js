/*
 * 当我们给父子关系的元素都绑定了事件的时候，触发子元素的时候，这两个事件发生的前后顺序是如何的？这
 * 引开了我们关于事件顺序的讨论，其实一共有两种方式:
 *
 *   Event Capturing(事件捕获)： NetScape所主张的方式
 *   Event Bubbling(事件冒泡)： Microsoft所主张的方式
 *
 * 这两种方式确定了事件执行的前后顺序，只不过后来W3C对DOM2的事件模型给出了一个规范：首先进入事件
 * 捕获阶段->达到元素后->进入事件冒泡阶段。
 */
 /*
  * 捕获型事件
  *                | |
  * ---------------| |-----------------
  * | element1     | |                |
  * |   -----------| |-----------     |
  * |   |element2  \ /          |     |
  * |   -------------------------     |
  * |        Event CAPTURING          |
  * -----------------------------------
  *
  * 冒泡型事件
  *                / \
  * ---------------| |-----------------
  * | element1     | |                |
  * |   -----------| |-----------     |
  * |   |element2  | |          |     |
  * |   -------------------------     |
  * |        Event BUBBLING           |
  * -----------------------------------
  *
  * W3C 模型
  *                  | |  / \
  * -----------------| |--| |-----------------
  * | element1       | |  | |                |
  * |   -------------| |--| |-----------     |
  * |   |element2    \ /  | |          |     |
  * |   --------------------------------     |
  * |        W3C event model                 |
  * ------------------------------------------
  */

 window.onload = function() {
   var parent = document.getElementById("parent");
   var child = document.getElementById("child");
   function fn(e) {
     //获取当前事件的触发阶段
     var str;
     switch (e.eventPhase) {
       case 1: str="捕获"; break;
       case 2: str="目标"; break;
       case 3: str="冒泡"; break;
       default:
         str = "none";
     }
     alert(this.id + str);
   }
   /*
   *  事件捕获方式：先执行 parent 的事件处理函数，再执行 child 的事件处理函数
   *  事件冒泡方式：先执行 child 的事件处理函数，再执行 parent 的事件处理函数
   *  参考资料：http://www.cnblogs.com/hh54188/archive/2012/02/08/2343357.html
    */
   // 这里的第三个参数决定使用哪种顺序
   // 目前主流的浏览器使用的都是W3C DOM 2.0 的规范
   // 参数为 true 时，表示在捕获阶段绑定函数
   // 参数为 false 时，表示在冒泡阶段绑定函数
   // 如果不填写第三个参数，则默认为 false ，即默认在冒泡阶段绑定函数
   //使用捕获方式（NetScape）
  //  parent.addEventListener("click", fn, true);
  //  child.addEventListener("click", fn, true);
   //使用冒泡方式（Microsoft）
  //  parent.addEventListener("click", fn, false);
  //  child.addEventListener("click", fn, false);
   //两者混用（依照W3C来解释）
   parent.addEventListener("click", fn, true);    //前者绑定在捕获流上，会被先执行
   child.addEventListener("click", fn, false);    //后者绑定在冒泡流上，会被后执行
 };
