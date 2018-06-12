// 通过 ES5 手动实现 ES6 的 Promise
"use strict"

/**
 * 根据环境不同选择 promise 的异步执行方案
 * @param {Function} flush 待执行函数
 */
var scheduleFlush = function(flush) {
  var vertxNext = void 0;
  var asyncFunc = void 0;
  var isNode = typeof self === 'undefined' && typeof process !== 'undefined' && {}.toString.call(process) === '[object process]';
  var browserWindow = typeof window !== 'undefined' ? window : undefined;
  var browserGlobal = browserWindow || {};
  var BrowserMutationObserver = browserGlobal.MutationObserver || browserGlobal.WebKitMutationObserver;
  var isWorker = typeof Uint8ClampedArray !== 'undefined' && typeof importScripts !== 'undefined' && typeof MessageChannel !== 'undefined';
  
  /**
   * node 环境下使用 process.nextTick();
   * @return {Function}
   */
  function useNextTick() {
    // node version 0.10.x displays a deprecation warning when nextTick is used recursively
    // see https://github.com/cujojs/when/issues/410 for details
    return function () {
      return process.nextTick(flush);
    };
  }

  /**
   * 尝试调用 vertx
   * @return {Function}
   */
  function attemptVertx() {
    try {
      var vertx = Function('return this')().require('vertx');
      vertxNext = vertx.runOnLoop || vertx.runOnContext;
      return useVertxTimer();
    } catch (e) {
      return useSetTimeout();
    }
  }
  
  /**
   * 调用 vertx timer
   * @return {Function}
   */
  function useVertxTimer() {
    if (typeof vertxNext !== 'undefined') {
      return function () {
        vertxNext(flush);
      };
    }

    return useSetTimeout();
  }

  /**
   * 使用 DOM 的观察者监听器 MutationObserver
   * @return {Function}
   */
  function useMutationObserver() {
    var iterations = 0;
    var observer = new BrowserMutationObserver(flush);
    var node = document.createTextNode('');
    observer.observe(node, { characterData: true });

    return function () {
      node.data = iterations = ++iterations % 2;
    };
  }

  /**
   * 使用 web worker 的 MessageChannel
   * @return {Function}
   */
  function useMessageChannel() {
    var channel = new MessageChannel();
    channel.port1.onmessage = flush;
    return function () {
      return channel.port2.postMessage(0);
    };
  }

  // 根据环境选择不同的异步执行方案
  if (isNode) {
    asyncFunc = useNextTick();    // process.nextTick()
  } else if (BrowserMutationObserver) {
    asyncFunc = useMutationObserver();    // new MutationObserver()
  } else if (isWorker) {
    asyncFunc = useMessageChannel();    // new MessageChannel()
  } else if (browserWindow === undefined && typeof require === 'function') {
    asyncFunc = attemptVertx();   // vert.x 方案
  } else {
    asyncFunc = useSetTimeout();    // 原始的 setTimeout 方案
  }

  asyncFunc();
};

/**
 * 自定义 Promise 类（支持resolve和reject多参数）
 * @param {Function} asyncTask 初始化函数
 */
var MyPromise = (function() {   // 通过立即执行函数封装私有变量
  var state = { PENDING: 0, FULLFILLED: 1, REJECTED: 2 };   // 内部执行状态常量
  var MyPromise = function(asyncTask) {
    var asyncState = state.PENDING;     // 状态
    var hasSolution = false;    // 是否有下一级程序

    var asyncResult = [];
    var asyncError = [];
    var projectA = null;
    var projectB = null;
    var represent = { resolve: null, reject: null };    // 封装下一个 promise 的函数

    /**
     * 同步执行方法
     * @param {Function} plan 待执行的函数
     * @param {Arguments} args 执行函数所需的参数
     * @return {MyPromise} 返回一个 Promise 对象
     */
    var syncPlan = function(plan, args) {
      return new MyPromise(function(resolve, reject) {
        scheduleFlush(function() {      // 延迟加载
          var result = undefined;
          try {
            result = plan.apply(undefined, args);
          } catch (err) {
            reject(err);
          }
          resolve(result);
        });
      });
    }

    /**
     * 异步执行方法
     * @param {Function} plan 待执行的函数
     * @param {Arguments} args 执行函数所需的参数
     */
    var asyncPlan = function(plan, args) {
      var result = undefined;
      try {
        result = plan.apply(undefined, args);
      } catch (err) {
        represent.reject.call(undefined, err)
      }

      if (result instanceof MyPromise) {
        result.then(function() {
          represent.resolve.apply(undefined, arguments);   // 此处应为arguments而不是args
        }, function() {
          represent.reject.apply(undefined, arguments);
        });
      } else {
        represent.resolve.call(undefined, result)
      }
    }

    /**
     * Promise 解析成功
     * @param {Any} 任意数量任意类型参数
     */
    var resolve = function() {
      if (asyncState !== state.PENDING) return;
      asyncState = state.FULLFILLED;
      asyncResult = arguments;
      if (hasSolution) {
        if (projectA instanceof Function) {
          asyncPlan(projectA, asyncResult);
        } else {
          represent.resolve.apply(undefined, asyncResult);
        }
      }
    }

    /**
     * Promise 解析失败
     * @param {Any} 任意数量任意类型参数
     */
    var reject = function() {
      if (asyncState !== state.PENDING) return;
      asyncState = state.REJECTED;
      asyncError = arguments;
      if (hasSolution) {
        if (projectB instanceof Function) {
          asyncPlan(projectB, asyncError);
        } else {
          represent.reject.apply(undefined, asyncError);
        }
      }
    }

    /**
     * then 函数
     * @param {Function} onFullfilled 成功回调
     * @param {Function} onRejected 失败回调
     * @return {MyPromise} 返回用于下一步操作的 Promise
     */
    this.then = function(onFullfilled, onRejected) {
      hasSolution = true;
      switch (asyncState) {
        case state.PENDING:   // 在 pending 的话返回一个等待完成的 promise
          projectA = onFullfilled;
          projectB = onRejected;
          return new MyPromise(function(resolve, reject) {
            // 该 promise 的决定权交由上一级 promise 的 represent 管理
            represent.resolve = resolve;
            represent.reject = reject;
          });
        case state.FULLFILLED:    // 当前 promise 已经执行完毕，则立即调用同步的执行方法
          if (onFullfilled instanceof Function) {
            return syncPlan(onFullfilled, asyncResult);
          } else {
            return MyPromise.resolve(asyncResult);
          }
        case state.REJECTED:    // 当前 promise 已经执行完毕，则立即调用同步的执行方法
          if (onRejected instanceof Function) {
            return syncPlan(onRejected, asyncError);
          } else {
            return MyPromise.reject(asyncError);
          }
      }
    }

    /**
     * 异常处理 catch 函数
     * @param {Function} onRejected 失败回调
     * @return {MyPromise} 返回用于下一步操作的 Promise
     */
    this.catch = function(onRejected) {
      return this.then(undefined, onRejected);
    }

    try {
      asyncTask(resolve, reject);
    } catch (err) {
      reject(err);
    }
  }

  /**
   * MyPromise 的静态方法 MyPromise.resolve
   * @description 其实是快速创建 FULLFILL 状态 Promise 的语法糖
   */
  MyPromise.resolve = function() {
    var args = arguments;
    return new MyPromise(function(resolve) {
      resolve.apply(undefined, args);
    });
  }

  /**
   * MyPromise 的静态方法 MyPromise.reject
   * @description 其实是快速创建 REJECTED 状态 Promise 的语法糖
   */
  MyPromise.reject = function() {
    var args = arguments;
    return new MyPromise(function(resolve, reject) {
      reject.apply(undefined, args);
    });
  }

  return MyPromise;
})();

var logtime = (function() {
  var starttime;
  return function() {
    if (!starttime) {
      starttime = +new Date()
      return 0;
    }
    return +new Date() - starttime;
  }
})();

var fn = function(resolve, reject) {
    resolve("enter resolve");
    console.log("after resolve");     // 这个会出现在enter resolve的前面
    reject("enter reject");     // 该方法应该不会执行
}

setTimeout(function() { console.log("haha-1") }, 0);
// var p = new Promise(fn).then(console.log).catch(console.error)     // 原promise
var p = new MyPromise(fn).then(console.log).catch(console.error)      // 自己实现的promise
.then(function() {
  console.log("haha", logtime());
}).then(function() {
  console.log("haha2", logtime());
  return "haha3";
}).then(function(data) {
  console.log(data, logtime());
  return "entering haha4";
}).then(function(data) {
  console.log(data, logtime());
  return new MyPromise(function(resolve, reject) {
    setTimeout(function() { resolve("delayed haha4", logtime()) }, 2e3);
  });
}).then(function(data, time) {
  console.log(data, time);
  console.log("entered haha5", logtime());
  return new MyPromise(function(resolve, reject) {
    setTimeout(function() { reject("rejected haha5", logtime()) }, 1e3);
  });
}).then(function(data) {
  console.log("haha6", logtime())
}, console.error).then(function(data) {
  console.log("haha7", logtime());
}).then(function(data) {
  return new MyPromise(function(resolve, reject) {
    setTimeout(function() { reject("rejected haha8", logtime()) });
  });
}).then(function(data) {
  console.log("haha9");
}).catch(console.error);
console.log("haha10");
setTimeout(function() { console.log("haha11") }, 0);