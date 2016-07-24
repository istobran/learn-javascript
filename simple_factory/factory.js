// 实现简单工厂模式

// 粗粒度 和 细粒度

// 万事万物都是Object ：卖车的商店 -> 卖车 -> 生产车 -> Factory

// 搭建一个工厂的环境
// 卖车的商店
function CarShop() {}
CarShop.prototype = {
  constructor : CarShop,
  sellCar : function(type) {
    // 这里是一些售前的操作...
    // 工厂生产汽车
    var car = CarFactory.createCar(type);
    // 这里是一些售后的操作...
    return car;
  }
};

// 生产汽车的工厂类，目的就是为了生产车
// 单体模式
var CarFactory = {
  createCar : function(type) {
    var car;    //声明变量
    switch (type) {
      case "Benz": car = new Benz(); break;
      case "Bmw":  car = new Bmw();  break;
      case "Audi": car = new Audi(); break;
      default:
        throw new Error("Type "+type+" doesn't exist!");
    }
    // 检测接口的实现
    BangZ.Interface.ensureImplements(car, CarInterface);
    return car;
  }
};

// 创建汽车接口实例
var CarInterface = new BangZ.Interface("CarInterface", ["start", "run"]);

// BaseCar implements CarInterface
function BaseCar() {}
BaseCar.prototype = {
  constructor : BaseCar,
  start : function() {
    // 使用 constructor.name 模拟多态
    alert(this.constructor.name+" ..start");
  },
  run : function() {
    alert(this.constructor.name+" ..run");
  }
};

// Class benz bmw audi （都是车）
// 注意顺序问题：子类需要先继承父类，再在prototype中拓展自己的方法

function Benz() {}
BangZ.extend(Benz, BaseCar);
Benz.prototype.driveBenz = function() {
  alert("Benz .. drive");
};

function Bmw() {}
BangZ.extend(Bmw, BaseCar);
Bmw.prototype.driveBmw = function() {
  alert("Bmw .. drive");
};

function Audi() {}
BangZ.extend(Audi, BaseCar);
Audi.prototype.driveAudi =function() {
  alert("Audi .. drive");
};

var shop = new CarShop();
var mybenz = shop.sellCar("Benz");
mybenz.start();
mybenz.run();
mybenz.driveBenz();
