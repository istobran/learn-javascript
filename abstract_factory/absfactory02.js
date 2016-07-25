//定义 Car 的构造函数
function Car(options) {
  // 默认值
  this.doors = options.doors || 4;
  this.state = options.state || "brand new";
  this.color = options.color || "silver";
}
Car.prototype.drive = function() {alert("car drived");};
Car.prototype.breakDown = function() {alert("car is broken down...");};

// 定义 Truck 的构造函数
function Truck(options) {
  this.state = options.state || "used";
  this.wheelSize = options.wheelSize || "large";
  this.color = options.color || "blue";
}
Truck.prototype.drive = function() {alert("truck drived");};
Truck.prototype.breakDown = function() {alert("truck is broken down...");};

var AbstractVehicleFactory = (function() {
  // 存储车辆类型
  var types = {};

  return {
    getVehicle : function(type, customizations) {
      // 不需使用 eval 来创建对象
      var Vehicle = types[type];
      return (Vehicle) ? new Vehicle(customizations) : null;
    },
    registerVehicle : function(type, Vehicle) {
      var proto = Vehicle.prototype;

      // 只注册实现车辆契约的类
      if (proto.drive && proto.breakDown) {
        types[type] = Vehicle;    // 收集各种构造函数
      } else {
        throw new Error("this is not a Vehicle!");
      }
      return AbstractVehicleFactory;
    }
  };
})();

// 用法：
AbstractVehicleFactory.registerVehicle("car", Car);
AbstractVehicleFactory.registerVehicle("truck", Truck);

// 使用抽象工厂实例化一个新的 car 对象
var mycar = AbstractVehicleFactory.getVehicle("car", {
  color : "Lime green",
  state : "Like new"
});
var mytruck = AbstractVehicleFactory.getVehicle("truck", {
  wheelSize : "medium",
  color : "neon yellow"
});
mycar.drive();
mytruck.breakDown();

// 确认 mycar 是否由 Car 创建的
console.log(mycar instanceof Car);
