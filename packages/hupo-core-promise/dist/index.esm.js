/*!
 * @hupo/core-promise 0.0.0 
 * Copyright 2019 . All Rights Reserved
 */

import global from '@hupo/core-global';

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

var exit = function exit(error) {
  return Promise.reject(new Error(error));
};
var cache =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(id, promise) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!global.promise) global.promise = {};

            if (!global.promise[id]) {
              global.promise[id] = promise();
            }

            _context.prev = 2;
            _context.next = 5;
            return global.promise[id];

          case 5:
            return _context.abrupt("return", _context.sent);

          case 8:
            _context.prev = 8;
            _context.t0 = _context["catch"](2);
            global.promise[id] = null;
            delete global.promise[id];
            return _context.abrupt("return", exit(_context.t0));

          case 13:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[2, 8]]);
  }));

  return function cache(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
var del = function del(id) {
  if (global.promise[id]) {
    global.promise[id] = null;
    delete global.promise[id];
  }
};
var delay = function delay(time) {
  return new Promise(function (resolve) {
    setTimeout(resolve, time);
  });
};
var index = {
  exit: exit,
  cache: cache,
  del: del,
  delay: delay
};

export default index;
export { cache, del, delay, exit };
