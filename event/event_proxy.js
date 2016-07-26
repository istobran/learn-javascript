// 事件代理的概念
/*
 * 事件绑定后，检测顺序就会从被绑定的DOM下滑到触发的元素，再冒泡会绑定的DOM上。也就是说，如果你
 * 监听了一个DOM节点，那也就等于你监听了其所有的后代节点。
 *
 * 代理的意思就是只监听父节点的事件触发，以来代理对其后代节点的监听，而你需要做的只是通
 * 过target属性得到触发元素并作出回应。
 *
 * 使用事件代理意味着你可以节省大量重复的事件监听，以减少浏览器资源消耗。还有一个好处就是让HTML独
 * 立起来，比如之后还有要加子元素的需求，也不需要再为其单独加事件监听了。
 */

window.onload = function() {
 // 当点击子节点时，也会触发父节点的事件
//  var parent = document.getElementById("parent");
//  function fn() {
//    alert(this.id);
//  }
//  parent.addEventListener("click", fn);

 // 实现事件代理
  var parent = document.getElementById("parent");
  var fn = function(e) {
    //通过e.target获取到当前被点击的元素
    if (!e.target.style.backgroundColor) {
      e.target.style.backgroundColor = "#efefef";
    } else {
      e.target.style.backgroundColor = null;
    }
  };
  parent.addEventListener("click", fn);
 /*
  以上的操作就实现了将 子元素的操作 交由 父元素绑定的事件 来代理完成
  通过 target 属性获取到当前的实际操作的子节点，再在子节点上进行操作
 */
};
