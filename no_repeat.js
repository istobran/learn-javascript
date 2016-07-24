// 利用 js 中的对象特性去除数组中重复的项
function uniq_v1(arr) {    //高效的方法，时间复杂度为 n
  var obj = {};
  arr.forEach(function(item, index, array) {    //利用 “对象中的key永远是唯一的” 这一特性来实现消除重复
    obj[item] = true;      //随便赋一个值
  });
  var result = [];
  for (var attr in obj) {
    if (obj.hasOwnProperty(attr)) {
      result.push(attr);
    }
  }
  return result;
}
// "Smart" but naïve way
// 摘自 StackOverflow : http://stackoverflow.com/questions/9229645/remove-duplicates-from-javascript-array
function uniq_v2(arr) {
  var result = arr.filter(function(item, index, array) {
    return array.indexOf(item) === index;
  });
  return result;
}
// Hashtables to the rescue
// 使用哈希表来解决效率问题，其实上面第一种方法的简写方法
// 摘自 StackOverflow : http://stackoverflow.com/questions/9229645/remove-duplicates-from-javascript-array
function uniq_v3(arr) {
  var seen = {};
  var result = arr.filter(function(item, index, array) {
    return seen.hasOwnProperty(item) ? false : seen[item] = true;
  });
  return result;
}
var arr = [1, 1, 2, 1, 3, 4, 5, 5, 5, 7, 10, 12, 12];
var result = uniq_v3(arr);
alert(result);
