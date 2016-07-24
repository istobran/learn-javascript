// 实现简单工厂模式

// 粗粒度 和 细粒度

// 万事万物都是Object
// 你要买什么车？ 去什么商店 -> 商店 -> 卖车 -> 生产车 -> Factory

// 搭建一个工厂的环境
// 卖车的商店可能有 奥迪4s店 奔驰4s店 宝马4s店

// 卖车的商店
// 模拟 java 中的 abstract class 抽象类
function CarShop() {}
CarShop.prototype = {
  constructor : CarShop,
  sellCar : function(type) {
    // 这里是一些售前的操作...
    // 工厂生产汽车
    // var car = CarFactory.createCar(type);
    // 这里是一些售后的操作...
    // return car;
    this.abstractSellCar(type);   //禁止直接调用抽象类
  },
  abstractSellCar : function(type) {
    throw new Error("abstract class can't be called directly");
  }
};

// 奔驰 4s 店
function BenzCarShop() {}
BangZ.extend(BenzCarShop, CarShop);
BenzCarShop.prototype = {
  constructor : BenzCarShop,
  sellCar : function(type) {
    var car ; // 声明一个变量
    var types = ["Benz01", "Benz02"];    // 存放所有的benz车类型
    for (var t in types) {
      if (types[t] === type) {
        car = CarFactory.createCar(type);
        break;
      }
    }
    if (!car) {
      throw new Error("type "+type+" doesn't exist!");
    }
    return car;
  }
};

// 宝马 4s 店
function BmwCarShop() {}
BangZ.extend(BmwCarShop, CarShop);
BmwCarShop.prototype = {
  constructor : BmwCarShop,
  sellCar : function(type) {
    var car ; // 声明一个变量
    var types = ["Bmw01", "Bmw02"];    // 存放所有的bmw车类型
    for (var t in types) {
      if (types[t] === type) {
        car = CarFactory.createCar(type);
        break;
      }
    }
    if (!car) {
      throw new Error("type "+type+" doesn't exist!");
    }
    return car;
  }
};

// 奥迪 4s 店
function AudiCarShop() {}
BangZ.extend(AudiCarShop, CarShop);
AudiCarShop.prototype = {
  constructor : AudiCarShop,
  sellCar : function(type) {
    var car ; // 声明一个变量
    var types = ["Audi01", "Audi02"];    // 存放所有的audi车类型
    for (var t in types) {
      if (types[t] === type) {
        car = CarFactory.createCar(type);
        break;
      }
    }
    if (!car) {
      throw new Error("type "+type+" doesn't exist!");
    }
    return car;
  }
};



// 生产汽车的工厂类，目的就是为了生产车
// 单体模式 抽象动态工厂模式
var CarFactory = {
  createCar : function(type) {
    // 利用 eval 动态创建传入类型的实例对象
    var car = eval("new "+type+"()");
    //检验接口的实现
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
  alert(this.constructor.name+" .. drive");
};

function Bmw() {}
BangZ.extend(Bmw, BaseCar);
Bmw.prototype.driveBmw = function() {
  alert(this.constructor.name+" .. drive");
};

function Audi() {}
BangZ.extend(Audi, BaseCar);
Audi.prototype.driveAudi =function() {
  alert(this.constructor.name+" .. drive");
};

function Benz01() {}
BangZ.extend(Benz01, Benz);
Benz01.prototype.stop = function() {
  alert("Benz01 stop..");
};
function Bmw01() {}
BangZ.extend(Bmw01, Bmw);
function Audi01() {}
BangZ.extend(Audi01, Audi);
function Benz02() {}
BangZ.extend(Benz02, Benz);
function Bmw02() {}
BangZ.extend(Bmw02, Bmw);
function Audi02() {}
BangZ.extend(Audi02, Audi);

// 说明可以连续多级继承
// Benz01 -> Benz -> BaseCar
var shop1 = new BenzCarShop();
var car1 = shop1.sellCar("Benz01");
car1.run();   // extends from BaseCar;
car1.driveBenz(); // extends from Benz
car1.stop();  // self

var shop2 = new BmwCarShop();
var car2 = shop2.sellCar("Bmw02");
car2.run();
car2.driveBmw();

var shop3 = new AudiCarShop();
var car3 = shop3.sellCar("Audi01");
car3.run();
car3.driveAudi();
