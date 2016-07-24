//用 javascript 模拟 Java 中的 Map 类
function Map() {    //作为 Map 对象的构造方法
  var obj = {};
  this.put = function(key, value) {
    obj[key] = value;
  };
  this.size = function() {
    var count = 0;
    for (var attr in obj) {
      count++;
    }
    return count;
  };
  this.get = function(key) {
    if (obj[key] || obj[key] === 0 || obj[key] === false) {
      return obj[key];
    } else {
      return null;
    }
  };
  this.remove = function(key) {
    if (obj[key] || obj[key] === 0 || obj[key] === false) {     //判断该键值对是否存在
      delete obj[key];
    }
  };
  this.eachMap = function(fn) {   //接收回调函数
    for (var attr in obj) {
      fn(attr, obj[attr]);
    }
  };
}

var m = new Map();
m.put("01", "abc");
m.put("02", false);
m.put("03", true);
m.put("04", new Date());

//alert(m.size());
// alert(m.get("03"));
// m.remove("03");
// alert(m.get("03"));

m.eachMap(function(key, value) {
  alert(key + " : " + value);
});
