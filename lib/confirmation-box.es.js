var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __objRest = (source, exclude) => {
  var target2 = {};
  for (var prop in source)
    if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0)
      target2[prop] = source[prop];
  if (source != null && __getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop))
        target2[prop] = source[prop];
    }
  return target2;
};
/*!
 * Vue.js v2.6.14
 * (c) 2014-2021 Evan You
 * Released under the MIT License.
 */
var emptyObject = Object.freeze({});
function isUndef(v) {
  return v === void 0 || v === null;
}
function isDef(v) {
  return v !== void 0 && v !== null;
}
function isTrue(v) {
  return v === true;
}
function isFalse(v) {
  return v === false;
}
function isPrimitive(value) {
  return typeof value === "string" || typeof value === "number" || typeof value === "symbol" || typeof value === "boolean";
}
function isObject$1(obj) {
  return obj !== null && typeof obj === "object";
}
var _toString = Object.prototype.toString;
function toRawType(value) {
  return _toString.call(value).slice(8, -1);
}
function isPlainObject(obj) {
  return _toString.call(obj) === "[object Object]";
}
function isRegExp(v) {
  return _toString.call(v) === "[object RegExp]";
}
function isValidArrayIndex(val) {
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val);
}
function isPromise(val) {
  return isDef(val) && typeof val.then === "function" && typeof val.catch === "function";
}
function toString(val) {
  return val == null ? "" : Array.isArray(val) || isPlainObject(val) && val.toString === _toString ? JSON.stringify(val, null, 2) : String(val);
}
function toNumber(val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n;
}
function makeMap(str, expectsLowerCase) {
  var map = /* @__PURE__ */ Object.create(null);
  var list = str.split(",");
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase ? function(val) {
    return map[val.toLowerCase()];
  } : function(val) {
    return map[val];
  };
}
makeMap("slot,component", true);
var isReservedAttribute = makeMap("key,ref,slot,slot-scope,is");
function remove(arr, item) {
  if (arr.length) {
    var index2 = arr.indexOf(item);
    if (index2 > -1) {
      return arr.splice(index2, 1);
    }
  }
}
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}
function cached(fn) {
  var cache2 = /* @__PURE__ */ Object.create(null);
  return function cachedFn(str) {
    var hit = cache2[str];
    return hit || (cache2[str] = fn(str));
  };
}
var camelizeRE$1 = /-(\w)/g;
var camelize$1 = cached(function(str) {
  return str.replace(camelizeRE$1, function(_, c) {
    return c ? c.toUpperCase() : "";
  });
});
var capitalize = cached(function(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
});
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function(str) {
  return str.replace(hyphenateRE, "-$1").toLowerCase();
});
function polyfillBind(fn, ctx) {
  function boundFn(a) {
    var l = arguments.length;
    return l ? l > 1 ? fn.apply(ctx, arguments) : fn.call(ctx, a) : fn.call(ctx);
  }
  boundFn._length = fn.length;
  return boundFn;
}
function nativeBind(fn, ctx) {
  return fn.bind(ctx);
}
var bind = Function.prototype.bind ? nativeBind : polyfillBind;
function toArray(list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret;
}
function extend(to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to;
}
function toObject(arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res;
}
function noop(a, b, c) {
}
var no = function(a, b, c) {
  return false;
};
var identity = function(_) {
  return _;
};
function looseEqual(a, b) {
  if (a === b) {
    return true;
  }
  var isObjectA = isObject$1(a);
  var isObjectB = isObject$1(b);
  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function(e, i) {
          return looseEqual(e, b[i]);
        });
      } else if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime();
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function(key) {
          return looseEqual(a[key], b[key]);
        });
      } else {
        return false;
      }
    } catch (e) {
      return false;
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b);
  } else {
    return false;
  }
}
function looseIndexOf(arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) {
      return i;
    }
  }
  return -1;
}
function once(fn) {
  var called = false;
  return function() {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  };
}
var SSR_ATTR = "data-server-rendered";
var ASSET_TYPES = [
  "component",
  "directive",
  "filter"
];
var LIFECYCLE_HOOKS = [
  "beforeCreate",
  "created",
  "beforeMount",
  "mounted",
  "beforeUpdate",
  "updated",
  "beforeDestroy",
  "destroyed",
  "activated",
  "deactivated",
  "errorCaptured",
  "serverPrefetch"
];
var config = {
  optionMergeStrategies: /* @__PURE__ */ Object.create(null),
  silent: false,
  productionTip: false,
  devtools: false,
  performance: false,
  errorHandler: null,
  warnHandler: null,
  ignoredElements: [],
  keyCodes: /* @__PURE__ */ Object.create(null),
  isReservedTag: no,
  isReservedAttr: no,
  isUnknownElement: no,
  getTagNamespace: noop,
  parsePlatformTagName: identity,
  mustUseProp: no,
  async: true,
  _lifecycleHooks: LIFECYCLE_HOOKS
};
var unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;
function isReserved(str) {
  var c = (str + "").charCodeAt(0);
  return c === 36 || c === 95;
}
function def(obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}
var bailRE = new RegExp("[^" + unicodeRegExp.source + ".$_\\d]");
function parsePath(path) {
  if (bailRE.test(path)) {
    return;
  }
  var segments = path.split(".");
  return function(obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) {
        return;
      }
      obj = obj[segments[i]];
    }
    return obj;
  };
}
var hasProto = "__proto__" in {};
var inBrowser = typeof window !== "undefined";
var inWeex = typeof WXEnvironment !== "undefined" && !!WXEnvironment.platform;
var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf("msie 9.0") > 0;
var isEdge = UA && UA.indexOf("edge/") > 0;
UA && UA.indexOf("android") > 0 || weexPlatform === "android";
var isIOS = UA && /iphone|ipad|ipod|ios/.test(UA) || weexPlatform === "ios";
UA && /chrome\/\d+/.test(UA) && !isEdge;
UA && /phantomjs/.test(UA);
var isFF = UA && UA.match(/firefox\/(\d+)/);
var nativeWatch = {}.watch;
var supportsPassive = false;
if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, "passive", {
      get: function get3() {
        supportsPassive = true;
      }
    });
    window.addEventListener("test-passive", null, opts);
  } catch (e) {
  }
}
var _isServer;
var isServerRendering = function() {
  if (_isServer === void 0) {
    if (!inBrowser && !inWeex && typeof global !== "undefined") {
      _isServer = global["process"] && global["process"].env.VUE_ENV === "server";
    } else {
      _isServer = false;
    }
  }
  return _isServer;
};
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;
function isNative(Ctor) {
  return typeof Ctor === "function" && /native code/.test(Ctor.toString());
}
var hasSymbol = typeof Symbol !== "undefined" && isNative(Symbol) && typeof Reflect !== "undefined" && isNative(Reflect.ownKeys);
var _Set;
if (typeof Set !== "undefined" && isNative(Set)) {
  _Set = Set;
} else {
  _Set = /* @__PURE__ */ function() {
    function Set2() {
      this.set = /* @__PURE__ */ Object.create(null);
    }
    Set2.prototype.has = function has2(key) {
      return this.set[key] === true;
    };
    Set2.prototype.add = function add2(key) {
      this.set[key] = true;
    };
    Set2.prototype.clear = function clear() {
      this.set = /* @__PURE__ */ Object.create(null);
    };
    return Set2;
  }();
}
var warn = noop;
var uid = 0;
var Dep = function Dep2() {
  this.id = uid++;
  this.subs = [];
};
Dep.prototype.addSub = function addSub(sub) {
  this.subs.push(sub);
};
Dep.prototype.removeSub = function removeSub(sub) {
  remove(this.subs, sub);
};
Dep.prototype.depend = function depend() {
  if (Dep.target) {
    Dep.target.addDep(this);
  }
};
Dep.prototype.notify = function notify() {
  var subs = this.subs.slice();
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};
Dep.target = null;
var targetStack = [];
function pushTarget(target2) {
  targetStack.push(target2);
  Dep.target = target2;
}
function popTarget() {
  targetStack.pop();
  Dep.target = targetStack[targetStack.length - 1];
}
var VNode = function VNode2(tag, data, children, text, elm, context, componentOptions, asyncFactory) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = void 0;
  this.context = context;
  this.fnContext = void 0;
  this.fnOptions = void 0;
  this.fnScopeId = void 0;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = void 0;
  this.parent = void 0;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
  this.asyncFactory = asyncFactory;
  this.asyncMeta = void 0;
  this.isAsyncPlaceholder = false;
};
var prototypeAccessors = { child: { configurable: true } };
prototypeAccessors.child.get = function() {
  return this.componentInstance;
};
Object.defineProperties(VNode.prototype, prototypeAccessors);
var createEmptyVNode = function(text) {
  if (text === void 0)
    text = "";
  var node = new VNode();
  node.text = text;
  node.isComment = true;
  return node;
};
function createTextVNode(val) {
  return new VNode(void 0, void 0, void 0, String(val));
}
function cloneVNode(vnode) {
  var cloned = new VNode(vnode.tag, vnode.data, vnode.children && vnode.children.slice(), vnode.text, vnode.elm, vnode.context, vnode.componentOptions, vnode.asyncFactory);
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.asyncMeta = vnode.asyncMeta;
  cloned.isCloned = true;
  return cloned;
}
var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);
var methodsToPatch = [
  "push",
  "pop",
  "shift",
  "unshift",
  "splice",
  "sort",
  "reverse"
];
methodsToPatch.forEach(function(method) {
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator() {
    var args = [], len = arguments.length;
    while (len--)
      args[len] = arguments[len];
    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted2;
    switch (method) {
      case "push":
      case "unshift":
        inserted2 = args;
        break;
      case "splice":
        inserted2 = args.slice(2);
        break;
    }
    if (inserted2) {
      ob.observeArray(inserted2);
    }
    ob.dep.notify();
    return result;
  });
});
var arrayKeys = Object.getOwnPropertyNames(arrayMethods);
var shouldObserve = true;
function toggleObserving(value) {
  shouldObserve = value;
}
var Observer = function Observer2(value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, "__ob__", this);
  if (Array.isArray(value)) {
    if (hasProto) {
      protoAugment(value, arrayMethods);
    } else {
      copyAugment(value, arrayMethods, arrayKeys);
    }
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};
Observer.prototype.walk = function walk(obj) {
  var keys2 = Object.keys(obj);
  for (var i = 0; i < keys2.length; i++) {
    defineReactive$$1(obj, keys2[i]);
  }
};
Observer.prototype.observeArray = function observeArray(items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};
function protoAugment(target2, src) {
  target2.__proto__ = src;
}
function copyAugment(target2, src, keys2) {
  for (var i = 0, l = keys2.length; i < l; i++) {
    var key = keys2[i];
    def(target2, key, src[key]);
  }
}
function observe(value, asRootData) {
  if (!isObject$1(value) || value instanceof VNode) {
    return;
  }
  var ob;
  if (hasOwn(value, "__ob__") && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (shouldObserve && !isServerRendering() && (Array.isArray(value) || isPlainObject(value)) && Object.isExtensible(value) && !value._isVue) {
    ob = new Observer(value);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob;
}
function defineReactive$$1(obj, key, val, customSetter, shallow) {
  var dep = new Dep();
  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return;
  }
  var getter = property && property.get;
  var setter = property && property.set;
  if ((!getter || setter) && arguments.length === 2) {
    val = obj[key];
  }
  var childOb = !shallow && observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter() {
      var value = getter ? getter.call(obj) : val;
      if (Dep.target) {
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }
      return value;
    },
    set: function reactiveSetter(newVal) {
      var value = getter ? getter.call(obj) : val;
      if (newVal === value || newVal !== newVal && value !== value) {
        return;
      }
      if (getter && !setter) {
        return;
      }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = !shallow && observe(newVal);
      dep.notify();
    }
  });
}
function set(target2, key, val) {
  if (Array.isArray(target2) && isValidArrayIndex(key)) {
    target2.length = Math.max(target2.length, key);
    target2.splice(key, 1, val);
    return val;
  }
  if (key in target2 && !(key in Object.prototype)) {
    target2[key] = val;
    return val;
  }
  var ob = target2.__ob__;
  if (target2._isVue || ob && ob.vmCount) {
    return val;
  }
  if (!ob) {
    target2[key] = val;
    return val;
  }
  defineReactive$$1(ob.value, key, val);
  ob.dep.notify();
  return val;
}
function del(target2, key) {
  if (Array.isArray(target2) && isValidArrayIndex(key)) {
    target2.splice(key, 1);
    return;
  }
  var ob = target2.__ob__;
  if (target2._isVue || ob && ob.vmCount) {
    return;
  }
  if (!hasOwn(target2, key)) {
    return;
  }
  delete target2[key];
  if (!ob) {
    return;
  }
  ob.dep.notify();
}
function dependArray(value) {
  for (var e = void 0, i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}
var strats = config.optionMergeStrategies;
function mergeData$1(to, from) {
  if (!from) {
    return to;
  }
  var key, toVal, fromVal;
  var keys2 = hasSymbol ? Reflect.ownKeys(from) : Object.keys(from);
  for (var i = 0; i < keys2.length; i++) {
    key = keys2[i];
    if (key === "__ob__") {
      continue;
    }
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (toVal !== fromVal && isPlainObject(toVal) && isPlainObject(fromVal)) {
      mergeData$1(toVal, fromVal);
    }
  }
  return to;
}
function mergeDataOrFn(parentVal, childVal, vm) {
  if (!vm) {
    if (!childVal) {
      return parentVal;
    }
    if (!parentVal) {
      return childVal;
    }
    return function mergedDataFn() {
      return mergeData$1(typeof childVal === "function" ? childVal.call(this, this) : childVal, typeof parentVal === "function" ? parentVal.call(this, this) : parentVal);
    };
  } else {
    return function mergedInstanceDataFn() {
      var instanceData = typeof childVal === "function" ? childVal.call(vm, vm) : childVal;
      var defaultData = typeof parentVal === "function" ? parentVal.call(vm, vm) : parentVal;
      if (instanceData) {
        return mergeData$1(instanceData, defaultData);
      } else {
        return defaultData;
      }
    };
  }
}
strats.data = function(parentVal, childVal, vm) {
  if (!vm) {
    if (childVal && typeof childVal !== "function") {
      return parentVal;
    }
    return mergeDataOrFn(parentVal, childVal);
  }
  return mergeDataOrFn(parentVal, childVal, vm);
};
function mergeHook(parentVal, childVal) {
  var res = childVal ? parentVal ? parentVal.concat(childVal) : Array.isArray(childVal) ? childVal : [childVal] : parentVal;
  return res ? dedupeHooks(res) : res;
}
function dedupeHooks(hooks2) {
  var res = [];
  for (var i = 0; i < hooks2.length; i++) {
    if (res.indexOf(hooks2[i]) === -1) {
      res.push(hooks2[i]);
    }
  }
  return res;
}
LIFECYCLE_HOOKS.forEach(function(hook) {
  strats[hook] = mergeHook;
});
function mergeAssets(parentVal, childVal, vm, key) {
  var res = Object.create(parentVal || null);
  if (childVal) {
    return extend(res, childVal);
  } else {
    return res;
  }
}
ASSET_TYPES.forEach(function(type2) {
  strats[type2 + "s"] = mergeAssets;
});
strats.watch = function(parentVal, childVal, vm, key) {
  if (parentVal === nativeWatch) {
    parentVal = void 0;
  }
  if (childVal === nativeWatch) {
    childVal = void 0;
  }
  if (!childVal) {
    return Object.create(parentVal || null);
  }
  if (!parentVal) {
    return childVal;
  }
  var ret = {};
  extend(ret, parentVal);
  for (var key$1 in childVal) {
    var parent = ret[key$1];
    var child = childVal[key$1];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key$1] = parent ? parent.concat(child) : Array.isArray(child) ? child : [child];
  }
  return ret;
};
strats.props = strats.methods = strats.inject = strats.computed = function(parentVal, childVal, vm, key) {
  if (childVal && false) {
    assertObjectType(key, childVal);
  }
  if (!parentVal) {
    return childVal;
  }
  var ret = /* @__PURE__ */ Object.create(null);
  extend(ret, parentVal);
  if (childVal) {
    extend(ret, childVal);
  }
  return ret;
};
strats.provide = mergeDataOrFn;
var defaultStrat = function(parentVal, childVal) {
  return childVal === void 0 ? parentVal : childVal;
};
function normalizeProps(options, vm) {
  var props2 = options.props;
  if (!props2) {
    return;
  }
  var res = {};
  var i, val, name;
  if (Array.isArray(props2)) {
    i = props2.length;
    while (i--) {
      val = props2[i];
      if (typeof val === "string") {
        name = camelize$1(val);
        res[name] = { type: null };
      }
    }
  } else if (isPlainObject(props2)) {
    for (var key in props2) {
      val = props2[key];
      name = camelize$1(key);
      res[name] = isPlainObject(val) ? val : { type: val };
    }
  } else
    ;
  options.props = res;
}
function normalizeInject(options, vm) {
  var inject2 = options.inject;
  if (!inject2) {
    return;
  }
  var normalized = options.inject = {};
  if (Array.isArray(inject2)) {
    for (var i = 0; i < inject2.length; i++) {
      normalized[inject2[i]] = { from: inject2[i] };
    }
  } else if (isPlainObject(inject2)) {
    for (var key in inject2) {
      var val = inject2[key];
      normalized[key] = isPlainObject(val) ? extend({ from: key }, val) : { from: val };
    }
  } else
    ;
}
function normalizeDirectives(options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def$$1 = dirs[key];
      if (typeof def$$1 === "function") {
        dirs[key] = { bind: def$$1, update: def$$1 };
      }
    }
  }
}
function assertObjectType(name, value, vm) {
  if (!isPlainObject(value)) {
    warn('Invalid value for option "' + name + '": expected an Object, but got ' + toRawType(value) + ".");
  }
}
function mergeOptions(parent, child, vm) {
  if (typeof child === "function") {
    child = child.options;
  }
  normalizeProps(child);
  normalizeInject(child);
  normalizeDirectives(child);
  if (!child._base) {
    if (child.extends) {
      parent = mergeOptions(parent, child.extends, vm);
    }
    if (child.mixins) {
      for (var i = 0, l = child.mixins.length; i < l; i++) {
        parent = mergeOptions(parent, child.mixins[i], vm);
      }
    }
  }
  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField(key2) {
    var strat = strats[key2] || defaultStrat;
    options[key2] = strat(parent[key2], child[key2], vm, key2);
  }
  return options;
}
function resolveAsset(options, type2, id, warnMissing) {
  if (typeof id !== "string") {
    return;
  }
  var assets = options[type2];
  if (hasOwn(assets, id)) {
    return assets[id];
  }
  var camelizedId = camelize$1(id);
  if (hasOwn(assets, camelizedId)) {
    return assets[camelizedId];
  }
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId)) {
    return assets[PascalCaseId];
  }
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  return res;
}
function validateProp(key, propOptions, propsData, vm) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key];
  var booleanIndex = getTypeIndex(Boolean, prop.type);
  if (booleanIndex > -1) {
    if (absent && !hasOwn(prop, "default")) {
      value = false;
    } else if (value === "" || value === hyphenate(key)) {
      var stringIndex = getTypeIndex(String, prop.type);
      if (stringIndex < 0 || booleanIndex < stringIndex) {
        value = true;
      }
    }
  }
  if (value === void 0) {
    value = getPropDefaultValue(vm, prop, key);
    var prevShouldObserve = shouldObserve;
    toggleObserving(true);
    observe(value);
    toggleObserving(prevShouldObserve);
  }
  return value;
}
function getPropDefaultValue(vm, prop, key) {
  if (!hasOwn(prop, "default")) {
    return void 0;
  }
  var def2 = prop.default;
  if (vm && vm.$options.propsData && vm.$options.propsData[key] === void 0 && vm._props[key] !== void 0) {
    return vm._props[key];
  }
  return typeof def2 === "function" && getType(prop.type) !== "Function" ? def2.call(vm) : def2;
}
var functionTypeCheckRE = /^\s*function (\w+)/;
function getType(fn) {
  var match = fn && fn.toString().match(functionTypeCheckRE);
  return match ? match[1] : "";
}
function isSameType(a, b) {
  return getType(a) === getType(b);
}
function getTypeIndex(type2, expectedTypes) {
  if (!Array.isArray(expectedTypes)) {
    return isSameType(expectedTypes, type2) ? 0 : -1;
  }
  for (var i = 0, len = expectedTypes.length; i < len; i++) {
    if (isSameType(expectedTypes[i], type2)) {
      return i;
    }
  }
  return -1;
}
function handleError(err, vm, info) {
  pushTarget();
  try {
    if (vm) {
      var cur = vm;
      while (cur = cur.$parent) {
        var hooks2 = cur.$options.errorCaptured;
        if (hooks2) {
          for (var i = 0; i < hooks2.length; i++) {
            try {
              var capture = hooks2[i].call(cur, err, vm, info) === false;
              if (capture) {
                return;
              }
            } catch (e) {
              globalHandleError(e, cur, "errorCaptured hook");
            }
          }
        }
      }
    }
    globalHandleError(err, vm, info);
  } finally {
    popTarget();
  }
}
function invokeWithErrorHandling(handler, context, args, vm, info) {
  var res;
  try {
    res = args ? handler.apply(context, args) : handler.call(context);
    if (res && !res._isVue && isPromise(res) && !res._handled) {
      res.catch(function(e) {
        return handleError(e, vm, info + " (Promise/async)");
      });
      res._handled = true;
    }
  } catch (e) {
    handleError(e, vm, info);
  }
  return res;
}
function globalHandleError(err, vm, info) {
  if (config.errorHandler) {
    try {
      return config.errorHandler.call(null, err, vm, info);
    } catch (e) {
      if (e !== err) {
        logError(e);
      }
    }
  }
  logError(err);
}
function logError(err, vm, info) {
  if ((inBrowser || inWeex) && typeof console !== "undefined") {
    console.error(err);
  } else {
    throw err;
  }
}
var isUsingMicroTask = false;
var callbacks = [];
var pending = false;
function flushCallbacks() {
  pending = false;
  var copies = callbacks.slice(0);
  callbacks.length = 0;
  for (var i = 0; i < copies.length; i++) {
    copies[i]();
  }
}
var timerFunc;
if (typeof Promise !== "undefined" && isNative(Promise)) {
  var p = Promise.resolve();
  timerFunc = function() {
    p.then(flushCallbacks);
    if (isIOS) {
      setTimeout(noop);
    }
  };
  isUsingMicroTask = true;
} else if (!isIE && typeof MutationObserver !== "undefined" && (isNative(MutationObserver) || MutationObserver.toString() === "[object MutationObserverConstructor]")) {
  var counter = 1;
  var observer = new MutationObserver(flushCallbacks);
  var textNode = document.createTextNode(String(counter));
  observer.observe(textNode, {
    characterData: true
  });
  timerFunc = function() {
    counter = (counter + 1) % 2;
    textNode.data = String(counter);
  };
  isUsingMicroTask = true;
} else if (typeof setImmediate !== "undefined" && isNative(setImmediate)) {
  timerFunc = function() {
    setImmediate(flushCallbacks);
  };
} else {
  timerFunc = function() {
    setTimeout(flushCallbacks, 0);
  };
}
function nextTick(cb, ctx) {
  var _resolve;
  callbacks.push(function() {
    if (cb) {
      try {
        cb.call(ctx);
      } catch (e) {
        handleError(e, ctx, "nextTick");
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });
  if (!pending) {
    pending = true;
    timerFunc();
  }
  if (!cb && typeof Promise !== "undefined") {
    return new Promise(function(resolve) {
      _resolve = resolve;
    });
  }
}
var seenObjects = new _Set();
function traverse(val) {
  _traverse(val, seenObjects);
  seenObjects.clear();
}
function _traverse(val, seen) {
  var i, keys2;
  var isA = Array.isArray(val);
  if (!isA && !isObject$1(val) || Object.isFrozen(val) || val instanceof VNode) {
    return;
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return;
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) {
      _traverse(val[i], seen);
    }
  } else {
    keys2 = Object.keys(val);
    i = keys2.length;
    while (i--) {
      _traverse(val[keys2[i]], seen);
    }
  }
}
var normalizeEvent = cached(function(name) {
  var passive = name.charAt(0) === "&";
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === "~";
  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === "!";
  name = capture ? name.slice(1) : name;
  return {
    name,
    once: once$$1,
    capture,
    passive
  };
});
function createFnInvoker(fns, vm) {
  function invoker() {
    var arguments$1 = arguments;
    var fns2 = invoker.fns;
    if (Array.isArray(fns2)) {
      var cloned = fns2.slice();
      for (var i = 0; i < cloned.length; i++) {
        invokeWithErrorHandling(cloned[i], null, arguments$1, vm, "v-on handler");
      }
    } else {
      return invokeWithErrorHandling(fns2, null, arguments, vm, "v-on handler");
    }
  }
  invoker.fns = fns;
  return invoker;
}
function updateListeners(on, oldOn, add2, remove$$12, createOnceHandler2, vm) {
  var name, cur, old, event;
  for (name in on) {
    cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    if (isUndef(cur))
      ;
    else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur, vm);
      }
      if (isTrue(event.once)) {
        cur = on[name] = createOnceHandler2(event.name, cur, event.capture);
      }
      add2(event.name, cur, event.capture, event.passive, event.params);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }
  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove$$12(event.name, oldOn[name], event.capture);
    }
  }
}
function mergeVNodeHook(def2, hookKey, hook) {
  if (def2 instanceof VNode) {
    def2 = def2.data.hook || (def2.data.hook = {});
  }
  var invoker;
  var oldHook = def2[hookKey];
  function wrappedHook() {
    hook.apply(this, arguments);
    remove(invoker.fns, wrappedHook);
  }
  if (isUndef(oldHook)) {
    invoker = createFnInvoker([wrappedHook]);
  } else {
    if (isDef(oldHook.fns) && isTrue(oldHook.merged)) {
      invoker = oldHook;
      invoker.fns.push(wrappedHook);
    } else {
      invoker = createFnInvoker([oldHook, wrappedHook]);
    }
  }
  invoker.merged = true;
  def2[hookKey] = invoker;
}
function extractPropsFromVNodeData(data, Ctor, tag) {
  var propOptions = Ctor.options.props;
  if (isUndef(propOptions)) {
    return;
  }
  var res = {};
  var attrs2 = data.attrs;
  var props2 = data.props;
  if (isDef(attrs2) || isDef(props2)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      checkProp(res, props2, key, altKey, true) || checkProp(res, attrs2, key, altKey, false);
    }
  }
  return res;
}
function checkProp(res, hash, key, altKey, preserve) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true;
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true;
    }
  }
  return false;
}
function simpleNormalizeChildren(children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children);
    }
  }
  return children;
}
function normalizeChildren(children) {
  return isPrimitive(children) ? [createTextVNode(children)] : Array.isArray(children) ? normalizeArrayChildren(children) : void 0;
}
function isTextNode(node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment);
}
function normalizeArrayChildren(children, nestedIndex) {
  var res = [];
  var i, c, lastIndex, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (isUndef(c) || typeof c === "boolean") {
      continue;
    }
    lastIndex = res.length - 1;
    last = res[lastIndex];
    if (Array.isArray(c)) {
      if (c.length > 0) {
        c = normalizeArrayChildren(c, (nestedIndex || "") + "_" + i);
        if (isTextNode(c[0]) && isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + c[0].text);
          c.shift();
        }
        res.push.apply(res, c);
      }
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        res[lastIndex] = createTextVNode(last.text + c);
      } else if (c !== "") {
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        res[lastIndex] = createTextVNode(last.text + c.text);
      } else {
        if (isTrue(children._isVList) && isDef(c.tag) && isUndef(c.key) && isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res;
}
function initProvide(vm) {
  var provide = vm.$options.provide;
  if (provide) {
    vm._provided = typeof provide === "function" ? provide.call(vm) : provide;
  }
}
function initInjections(vm) {
  var result = resolveInject(vm.$options.inject, vm);
  if (result) {
    toggleObserving(false);
    Object.keys(result).forEach(function(key) {
      {
        defineReactive$$1(vm, key, result[key]);
      }
    });
    toggleObserving(true);
  }
}
function resolveInject(inject2, vm) {
  if (inject2) {
    var result = /* @__PURE__ */ Object.create(null);
    var keys2 = hasSymbol ? Reflect.ownKeys(inject2) : Object.keys(inject2);
    for (var i = 0; i < keys2.length; i++) {
      var key = keys2[i];
      if (key === "__ob__") {
        continue;
      }
      var provideKey = inject2[key].from;
      var source = vm;
      while (source) {
        if (source._provided && hasOwn(source._provided, provideKey)) {
          result[key] = source._provided[provideKey];
          break;
        }
        source = source.$parent;
      }
      if (!source) {
        if ("default" in inject2[key]) {
          var provideDefault = inject2[key].default;
          result[key] = typeof provideDefault === "function" ? provideDefault.call(vm) : provideDefault;
        }
      }
    }
    return result;
  }
}
function resolveSlots(children, context) {
  if (!children || !children.length) {
    return {};
  }
  var slots = {};
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    var data = child.data;
    if (data && data.attrs && data.attrs.slot) {
      delete data.attrs.slot;
    }
    if ((child.context === context || child.fnContext === context) && data && data.slot != null) {
      var name = data.slot;
      var slot = slots[name] || (slots[name] = []);
      if (child.tag === "template") {
        slot.push.apply(slot, child.children || []);
      } else {
        slot.push(child);
      }
    } else {
      (slots.default || (slots.default = [])).push(child);
    }
  }
  for (var name$1 in slots) {
    if (slots[name$1].every(isWhitespace)) {
      delete slots[name$1];
    }
  }
  return slots;
}
function isWhitespace(node) {
  return node.isComment && !node.asyncFactory || node.text === " ";
}
function isAsyncPlaceholder(node) {
  return node.isComment && node.asyncFactory;
}
function normalizeScopedSlots(slots, normalSlots, prevSlots) {
  var res;
  var hasNormalSlots = Object.keys(normalSlots).length > 0;
  var isStable = slots ? !!slots.$stable : !hasNormalSlots;
  var key = slots && slots.$key;
  if (!slots) {
    res = {};
  } else if (slots._normalized) {
    return slots._normalized;
  } else if (isStable && prevSlots && prevSlots !== emptyObject && key === prevSlots.$key && !hasNormalSlots && !prevSlots.$hasNormal) {
    return prevSlots;
  } else {
    res = {};
    for (var key$1 in slots) {
      if (slots[key$1] && key$1[0] !== "$") {
        res[key$1] = normalizeScopedSlot(normalSlots, key$1, slots[key$1]);
      }
    }
  }
  for (var key$2 in normalSlots) {
    if (!(key$2 in res)) {
      res[key$2] = proxyNormalSlot(normalSlots, key$2);
    }
  }
  if (slots && Object.isExtensible(slots)) {
    slots._normalized = res;
  }
  def(res, "$stable", isStable);
  def(res, "$key", key);
  def(res, "$hasNormal", hasNormalSlots);
  return res;
}
function normalizeScopedSlot(normalSlots, key, fn) {
  var normalized = function() {
    var res = arguments.length ? fn.apply(null, arguments) : fn({});
    res = res && typeof res === "object" && !Array.isArray(res) ? [res] : normalizeChildren(res);
    var vnode = res && res[0];
    return res && (!vnode || res.length === 1 && vnode.isComment && !isAsyncPlaceholder(vnode)) ? void 0 : res;
  };
  if (fn.proxy) {
    Object.defineProperty(normalSlots, key, {
      get: normalized,
      enumerable: true,
      configurable: true
    });
  }
  return normalized;
}
function proxyNormalSlot(slots, key) {
  return function() {
    return slots[key];
  };
}
function renderList(val, render5) {
  var ret, i, l, keys2, key;
  if (Array.isArray(val) || typeof val === "string") {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render5(val[i], i);
    }
  } else if (typeof val === "number") {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render5(i + 1, i);
    }
  } else if (isObject$1(val)) {
    if (hasSymbol && val[Symbol.iterator]) {
      ret = [];
      var iterator = val[Symbol.iterator]();
      var result = iterator.next();
      while (!result.done) {
        ret.push(render5(result.value, ret.length));
        result = iterator.next();
      }
    } else {
      keys2 = Object.keys(val);
      ret = new Array(keys2.length);
      for (i = 0, l = keys2.length; i < l; i++) {
        key = keys2[i];
        ret[i] = render5(val[key], key, i);
      }
    }
  }
  if (!isDef(ret)) {
    ret = [];
  }
  ret._isVList = true;
  return ret;
}
function renderSlot(name, fallbackRender, props2, bindObject) {
  var scopedSlotFn = this.$scopedSlots[name];
  var nodes;
  if (scopedSlotFn) {
    props2 = props2 || {};
    if (bindObject) {
      props2 = extend(extend({}, bindObject), props2);
    }
    nodes = scopedSlotFn(props2) || (typeof fallbackRender === "function" ? fallbackRender() : fallbackRender);
  } else {
    nodes = this.$slots[name] || (typeof fallbackRender === "function" ? fallbackRender() : fallbackRender);
  }
  var target2 = props2 && props2.slot;
  if (target2) {
    return this.$createElement("template", { slot: target2 }, nodes);
  } else {
    return nodes;
  }
}
function resolveFilter(id) {
  return resolveAsset(this.$options, "filters", id) || identity;
}
function isKeyNotMatch(expect, actual) {
  if (Array.isArray(expect)) {
    return expect.indexOf(actual) === -1;
  } else {
    return expect !== actual;
  }
}
function checkKeyCodes(eventKeyCode, key, builtInKeyCode, eventKeyName, builtInKeyName) {
  var mappedKeyCode = config.keyCodes[key] || builtInKeyCode;
  if (builtInKeyName && eventKeyName && !config.keyCodes[key]) {
    return isKeyNotMatch(builtInKeyName, eventKeyName);
  } else if (mappedKeyCode) {
    return isKeyNotMatch(mappedKeyCode, eventKeyCode);
  } else if (eventKeyName) {
    return hyphenate(eventKeyName) !== key;
  }
  return eventKeyCode === void 0;
}
function bindObjectProps(data, tag, value, asProp, isSync) {
  if (value) {
    if (!isObject$1(value))
      ;
    else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }
      var hash;
      var loop = function(key2) {
        if (key2 === "class" || key2 === "style" || isReservedAttribute(key2)) {
          hash = data;
        } else {
          var type2 = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type2, key2) ? data.domProps || (data.domProps = {}) : data.attrs || (data.attrs = {});
        }
        var camelizedKey = camelize$1(key2);
        var hyphenatedKey = hyphenate(key2);
        if (!(camelizedKey in hash) && !(hyphenatedKey in hash)) {
          hash[key2] = value[key2];
          if (isSync) {
            var on = data.on || (data.on = {});
            on["update:" + key2] = function($event) {
              value[key2] = $event;
            };
          }
        }
      };
      for (var key in value)
        loop(key);
    }
  }
  return data;
}
function renderStatic(index2, isInFor) {
  var cached2 = this._staticTrees || (this._staticTrees = []);
  var tree = cached2[index2];
  if (tree && !isInFor) {
    return tree;
  }
  tree = cached2[index2] = this.$options.staticRenderFns[index2].call(this._renderProxy, null, this);
  markStatic(tree, "__static__" + index2, false);
  return tree;
}
function markOnce(tree, index2, key) {
  markStatic(tree, "__once__" + index2 + (key ? "_" + key : ""), true);
  return tree;
}
function markStatic(tree, key, isOnce) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== "string") {
        markStaticNode(tree[i], key + "_" + i, isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}
function markStaticNode(node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}
function bindObjectListeners(data, value) {
  if (value) {
    if (!isPlainObject(value))
      ;
    else {
      var on = data.on = data.on ? extend({}, data.on) : {};
      for (var key in value) {
        var existing = on[key];
        var ours = value[key];
        on[key] = existing ? [].concat(existing, ours) : ours;
      }
    }
  }
  return data;
}
function resolveScopedSlots(fns, res, hasDynamicKeys, contentHashKey) {
  res = res || { $stable: !hasDynamicKeys };
  for (var i = 0; i < fns.length; i++) {
    var slot = fns[i];
    if (Array.isArray(slot)) {
      resolveScopedSlots(slot, res, hasDynamicKeys);
    } else if (slot) {
      if (slot.proxy) {
        slot.fn.proxy = true;
      }
      res[slot.key] = slot.fn;
    }
  }
  if (contentHashKey) {
    res.$key = contentHashKey;
  }
  return res;
}
function bindDynamicKeys(baseObj, values) {
  for (var i = 0; i < values.length; i += 2) {
    var key = values[i];
    if (typeof key === "string" && key) {
      baseObj[values[i]] = values[i + 1];
    }
  }
  return baseObj;
}
function prependModifier(value, symbol) {
  return typeof value === "string" ? symbol + value : value;
}
function installRenderHelpers(target2) {
  target2._o = markOnce;
  target2._n = toNumber;
  target2._s = toString;
  target2._l = renderList;
  target2._t = renderSlot;
  target2._q = looseEqual;
  target2._i = looseIndexOf;
  target2._m = renderStatic;
  target2._f = resolveFilter;
  target2._k = checkKeyCodes;
  target2._b = bindObjectProps;
  target2._v = createTextVNode;
  target2._e = createEmptyVNode;
  target2._u = resolveScopedSlots;
  target2._g = bindObjectListeners;
  target2._d = bindDynamicKeys;
  target2._p = prependModifier;
}
function FunctionalRenderContext(data, props2, children, parent, Ctor) {
  var this$1$1 = this;
  var options = Ctor.options;
  var contextVm;
  if (hasOwn(parent, "_uid")) {
    contextVm = Object.create(parent);
    contextVm._original = parent;
  } else {
    contextVm = parent;
    parent = parent._original;
  }
  var isCompiled = isTrue(options._compiled);
  var needNormalization = !isCompiled;
  this.data = data;
  this.props = props2;
  this.children = children;
  this.parent = parent;
  this.listeners = data.on || emptyObject;
  this.injections = resolveInject(options.inject, parent);
  this.slots = function() {
    if (!this$1$1.$slots) {
      normalizeScopedSlots(data.scopedSlots, this$1$1.$slots = resolveSlots(children, parent));
    }
    return this$1$1.$slots;
  };
  Object.defineProperty(this, "scopedSlots", {
    enumerable: true,
    get: function get3() {
      return normalizeScopedSlots(data.scopedSlots, this.slots());
    }
  });
  if (isCompiled) {
    this.$options = options;
    this.$slots = this.slots();
    this.$scopedSlots = normalizeScopedSlots(data.scopedSlots, this.$slots);
  }
  if (options._scopeId) {
    this._c = function(a, b, c, d) {
      var vnode = createElement(contextVm, a, b, c, d, needNormalization);
      if (vnode && !Array.isArray(vnode)) {
        vnode.fnScopeId = options._scopeId;
        vnode.fnContext = parent;
      }
      return vnode;
    };
  } else {
    this._c = function(a, b, c, d) {
      return createElement(contextVm, a, b, c, d, needNormalization);
    };
  }
}
installRenderHelpers(FunctionalRenderContext.prototype);
function createFunctionalComponent(Ctor, propsData, data, contextVm, children) {
  var options = Ctor.options;
  var props2 = {};
  var propOptions = options.props;
  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props2[key] = validateProp(key, propOptions, propsData || emptyObject);
    }
  } else {
    if (isDef(data.attrs)) {
      mergeProps(props2, data.attrs);
    }
    if (isDef(data.props)) {
      mergeProps(props2, data.props);
    }
  }
  var renderContext = new FunctionalRenderContext(data, props2, children, contextVm, Ctor);
  var vnode = options.render.call(null, renderContext._c, renderContext);
  if (vnode instanceof VNode) {
    return cloneAndMarkFunctionalResult(vnode, data, renderContext.parent, options);
  } else if (Array.isArray(vnode)) {
    var vnodes = normalizeChildren(vnode) || [];
    var res = new Array(vnodes.length);
    for (var i = 0; i < vnodes.length; i++) {
      res[i] = cloneAndMarkFunctionalResult(vnodes[i], data, renderContext.parent, options);
    }
    return res;
  }
}
function cloneAndMarkFunctionalResult(vnode, data, contextVm, options, renderContext) {
  var clone = cloneVNode(vnode);
  clone.fnContext = contextVm;
  clone.fnOptions = options;
  if (data.slot) {
    (clone.data || (clone.data = {})).slot = data.slot;
  }
  return clone;
}
function mergeProps(to, from) {
  for (var key in from) {
    to[camelize$1(key)] = from[key];
  }
}
var componentVNodeHooks = {
  init: function init(vnode, hydrating) {
    if (vnode.componentInstance && !vnode.componentInstance._isDestroyed && vnode.data.keepAlive) {
      var mountedNode = vnode;
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    } else {
      var child = vnode.componentInstance = createComponentInstanceForVnode(vnode, activeInstance);
      child.$mount(hydrating ? vnode.elm : void 0, hydrating);
    }
  },
  prepatch: function prepatch(oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(child, options.propsData, options.listeners, vnode, options.children);
  },
  insert: function insert(vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isMounted) {
      componentInstance._isMounted = true;
      callHook(componentInstance, "mounted");
    }
    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true);
      }
    }
  },
  destroy: function destroy(vnode) {
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true);
      }
    }
  }
};
var hooksToMerge = Object.keys(componentVNodeHooks);
function createComponent(Ctor, data, context, children, tag) {
  if (isUndef(Ctor)) {
    return;
  }
  var baseCtor = context.$options._base;
  if (isObject$1(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }
  if (typeof Ctor !== "function") {
    return;
  }
  var asyncFactory;
  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor);
    if (Ctor === void 0) {
      return createAsyncPlaceholder(asyncFactory, data, context, children, tag);
    }
  }
  data = data || {};
  resolveConstructorOptions(Ctor);
  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  }
  var propsData = extractPropsFromVNodeData(data, Ctor);
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children);
  }
  var listeners = data.on;
  data.on = data.nativeOn;
  if (isTrue(Ctor.options.abstract)) {
    var slot = data.slot;
    data = {};
    if (slot) {
      data.slot = slot;
    }
  }
  installComponentHooks(data);
  var name = Ctor.options.name || tag;
  var vnode = new VNode("vue-component-" + Ctor.cid + (name ? "-" + name : ""), data, void 0, void 0, void 0, context, { Ctor, propsData, listeners, tag, children }, asyncFactory);
  return vnode;
}
function createComponentInstanceForVnode(vnode, parent) {
  var options = {
    _isComponent: true,
    _parentVnode: vnode,
    parent
  };
  var inlineTemplate = vnode.data.inlineTemplate;
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnode.componentOptions.Ctor(options);
}
function installComponentHooks(data) {
  var hooks2 = data.hook || (data.hook = {});
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var existing = hooks2[key];
    var toMerge = componentVNodeHooks[key];
    if (existing !== toMerge && !(existing && existing._merged)) {
      hooks2[key] = existing ? mergeHook$1(toMerge, existing) : toMerge;
    }
  }
}
function mergeHook$1(f1, f2) {
  var merged = function(a, b) {
    f1(a, b);
    f2(a, b);
  };
  merged._merged = true;
  return merged;
}
function transformModel(options, data) {
  var prop = options.model && options.model.prop || "value";
  var event = options.model && options.model.event || "input";
  (data.attrs || (data.attrs = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  var existing = on[event];
  var callback = data.model.callback;
  if (isDef(existing)) {
    if (Array.isArray(existing) ? existing.indexOf(callback) === -1 : existing !== callback) {
      on[event] = [callback].concat(existing);
    }
  } else {
    on[event] = callback;
  }
}
var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;
function createElement(context, tag, data, children, normalizationType, alwaysNormalize) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = void 0;
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  return _createElement(context, tag, data, children, normalizationType);
}
function _createElement(context, tag, data, children, normalizationType) {
  if (isDef(data) && isDef(data.__ob__)) {
    return createEmptyVNode();
  }
  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }
  if (!tag) {
    return createEmptyVNode();
  }
  if (Array.isArray(children) && typeof children[0] === "function") {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  var vnode, ns;
  if (typeof tag === "string") {
    var Ctor;
    ns = context.$vnode && context.$vnode.ns || config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      vnode = new VNode(config.parsePlatformTagName(tag), data, children, void 0, void 0, context);
    } else if ((!data || !data.pre) && isDef(Ctor = resolveAsset(context.$options, "components", tag))) {
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      vnode = new VNode(tag, data, children, void 0, void 0, context);
    }
  } else {
    vnode = createComponent(tag, data, context, children);
  }
  if (Array.isArray(vnode)) {
    return vnode;
  } else if (isDef(vnode)) {
    if (isDef(ns)) {
      applyNS(vnode, ns);
    }
    if (isDef(data)) {
      registerDeepBindings(data);
    }
    return vnode;
  } else {
    return createEmptyVNode();
  }
}
function applyNS(vnode, ns, force) {
  vnode.ns = ns;
  if (vnode.tag === "foreignObject") {
    ns = void 0;
    force = true;
  }
  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (isDef(child.tag) && (isUndef(child.ns) || isTrue(force) && child.tag !== "svg")) {
        applyNS(child, ns, force);
      }
    }
  }
}
function registerDeepBindings(data) {
  if (isObject$1(data.style)) {
    traverse(data.style);
  }
  if (isObject$1(data.class)) {
    traverse(data.class);
  }
}
function initRender(vm) {
  vm._vnode = null;
  vm._staticTrees = null;
  var options = vm.$options;
  var parentVnode = vm.$vnode = options._parentVnode;
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject;
  vm._c = function(a, b, c, d) {
    return createElement(vm, a, b, c, d, false);
  };
  vm.$createElement = function(a, b, c, d) {
    return createElement(vm, a, b, c, d, true);
  };
  var parentData = parentVnode && parentVnode.data;
  {
    defineReactive$$1(vm, "$attrs", parentData && parentData.attrs || emptyObject, null, true);
    defineReactive$$1(vm, "$listeners", options._parentListeners || emptyObject, null, true);
  }
}
var currentRenderingInstance = null;
function renderMixin(Vue2) {
  installRenderHelpers(Vue2.prototype);
  Vue2.prototype.$nextTick = function(fn) {
    return nextTick(fn, this);
  };
  Vue2.prototype._render = function() {
    var vm = this;
    var ref2 = vm.$options;
    var render5 = ref2.render;
    var _parentVnode = ref2._parentVnode;
    if (_parentVnode) {
      vm.$scopedSlots = normalizeScopedSlots(_parentVnode.data.scopedSlots, vm.$slots, vm.$scopedSlots);
    }
    vm.$vnode = _parentVnode;
    var vnode;
    try {
      currentRenderingInstance = vm;
      vnode = render5.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render");
      {
        vnode = vm._vnode;
      }
    } finally {
      currentRenderingInstance = null;
    }
    if (Array.isArray(vnode) && vnode.length === 1) {
      vnode = vnode[0];
    }
    if (!(vnode instanceof VNode)) {
      vnode = createEmptyVNode();
    }
    vnode.parent = _parentVnode;
    return vnode;
  };
}
function ensureCtor(comp, base) {
  if (comp.__esModule || hasSymbol && comp[Symbol.toStringTag] === "Module") {
    comp = comp.default;
  }
  return isObject$1(comp) ? base.extend(comp) : comp;
}
function createAsyncPlaceholder(factory2, data, context, children, tag) {
  var node = createEmptyVNode();
  node.asyncFactory = factory2;
  node.asyncMeta = { data, context, children, tag };
  return node;
}
function resolveAsyncComponent(factory2, baseCtor) {
  if (isTrue(factory2.error) && isDef(factory2.errorComp)) {
    return factory2.errorComp;
  }
  if (isDef(factory2.resolved)) {
    return factory2.resolved;
  }
  var owner = currentRenderingInstance;
  if (owner && isDef(factory2.owners) && factory2.owners.indexOf(owner) === -1) {
    factory2.owners.push(owner);
  }
  if (isTrue(factory2.loading) && isDef(factory2.loadingComp)) {
    return factory2.loadingComp;
  }
  if (owner && !isDef(factory2.owners)) {
    var owners = factory2.owners = [owner];
    var sync = true;
    var timerLoading = null;
    var timerTimeout = null;
    owner.$on("hook:destroyed", function() {
      return remove(owners, owner);
    });
    var forceRender = function(renderCompleted) {
      for (var i = 0, l = owners.length; i < l; i++) {
        owners[i].$forceUpdate();
      }
      if (renderCompleted) {
        owners.length = 0;
        if (timerLoading !== null) {
          clearTimeout(timerLoading);
          timerLoading = null;
        }
        if (timerTimeout !== null) {
          clearTimeout(timerTimeout);
          timerTimeout = null;
        }
      }
    };
    var resolve = once(function(res2) {
      factory2.resolved = ensureCtor(res2, baseCtor);
      if (!sync) {
        forceRender(true);
      } else {
        owners.length = 0;
      }
    });
    var reject = once(function(reason) {
      if (isDef(factory2.errorComp)) {
        factory2.error = true;
        forceRender(true);
      }
    });
    var res = factory2(resolve, reject);
    if (isObject$1(res)) {
      if (isPromise(res)) {
        if (isUndef(factory2.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isPromise(res.component)) {
        res.component.then(resolve, reject);
        if (isDef(res.error)) {
          factory2.errorComp = ensureCtor(res.error, baseCtor);
        }
        if (isDef(res.loading)) {
          factory2.loadingComp = ensureCtor(res.loading, baseCtor);
          if (res.delay === 0) {
            factory2.loading = true;
          } else {
            timerLoading = setTimeout(function() {
              timerLoading = null;
              if (isUndef(factory2.resolved) && isUndef(factory2.error)) {
                factory2.loading = true;
                forceRender(false);
              }
            }, res.delay || 200);
          }
        }
        if (isDef(res.timeout)) {
          timerTimeout = setTimeout(function() {
            timerTimeout = null;
            if (isUndef(factory2.resolved)) {
              reject(null);
            }
          }, res.timeout);
        }
      }
    }
    sync = false;
    return factory2.loading ? factory2.loadingComp : factory2.resolved;
  }
}
function getFirstComponentChild(children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];
      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c;
      }
    }
  }
}
function initEvents(vm) {
  vm._events = /* @__PURE__ */ Object.create(null);
  vm._hasHookEvent = false;
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}
var target;
function add(event, fn) {
  target.$on(event, fn);
}
function remove$1(event, fn) {
  target.$off(event, fn);
}
function createOnceHandler(event, fn) {
  var _target = target;
  return function onceHandler() {
    var res = fn.apply(null, arguments);
    if (res !== null) {
      _target.$off(event, onceHandler);
    }
  };
}
function updateComponentListeners(vm, listeners, oldListeners) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, createOnceHandler, vm);
  target = void 0;
}
function eventsMixin(Vue2) {
  var hookRE = /^hook:/;
  Vue2.prototype.$on = function(event, fn) {
    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        vm.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm;
  };
  Vue2.prototype.$once = function(event, fn) {
    var vm = this;
    function on() {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm;
  };
  Vue2.prototype.$off = function(event, fn) {
    var vm = this;
    if (!arguments.length) {
      vm._events = /* @__PURE__ */ Object.create(null);
      return vm;
    }
    if (Array.isArray(event)) {
      for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
        vm.$off(event[i$1], fn);
      }
      return vm;
    }
    var cbs = vm._events[event];
    if (!cbs) {
      return vm;
    }
    if (!fn) {
      vm._events[event] = null;
      return vm;
    }
    var cb;
    var i = cbs.length;
    while (i--) {
      cb = cbs[i];
      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1);
        break;
      }
    }
    return vm;
  };
  Vue2.prototype.$emit = function(event) {
    var vm = this;
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      var info = 'event handler for "' + event + '"';
      for (var i = 0, l = cbs.length; i < l; i++) {
        invokeWithErrorHandling(cbs[i], vm, args, vm, info);
      }
    }
    return vm;
  };
}
var activeInstance = null;
function setActiveInstance(vm) {
  var prevActiveInstance = activeInstance;
  activeInstance = vm;
  return function() {
    activeInstance = prevActiveInstance;
  };
}
function initLifecycle(vm) {
  var options = vm.$options;
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }
  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;
  vm.$children = [];
  vm.$refs = {};
  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}
function lifecycleMixin(Vue2) {
  Vue2.prototype._update = function(vnode, hydrating) {
    var vm = this;
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var restoreActiveInstance = setActiveInstance(vm);
    vm._vnode = vnode;
    if (!prevVnode) {
      vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false);
    } else {
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    restoreActiveInstance();
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
  };
  Vue2.prototype.$forceUpdate = function() {
    var vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };
  Vue2.prototype.$destroy = function() {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return;
    }
    callHook(vm, "beforeDestroy");
    vm._isBeingDestroyed = true;
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    }
    if (vm._watcher) {
      vm._watcher.teardown();
    }
    var i = vm._watchers.length;
    while (i--) {
      vm._watchers[i].teardown();
    }
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    vm._isDestroyed = true;
    vm.__patch__(vm._vnode, null);
    callHook(vm, "destroyed");
    vm.$off();
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
    if (vm.$vnode) {
      vm.$vnode.parent = null;
    }
  };
}
function mountComponent(vm, el, hydrating) {
  vm.$el = el;
  if (!vm.$options.render) {
    vm.$options.render = createEmptyVNode;
  }
  callHook(vm, "beforeMount");
  var updateComponent;
  {
    updateComponent = function() {
      vm._update(vm._render(), hydrating);
    };
  }
  new Watcher(vm, updateComponent, noop, {
    before: function before() {
      if (vm._isMounted && !vm._isDestroyed) {
        callHook(vm, "beforeUpdate");
      }
    }
  }, true);
  hydrating = false;
  if (vm.$vnode == null) {
    vm._isMounted = true;
    callHook(vm, "mounted");
  }
  return vm;
}
function updateChildComponent(vm, propsData, listeners, parentVnode, renderChildren) {
  var newScopedSlots = parentVnode.data.scopedSlots;
  var oldScopedSlots = vm.$scopedSlots;
  var hasDynamicScopedSlot = !!(newScopedSlots && !newScopedSlots.$stable || oldScopedSlots !== emptyObject && !oldScopedSlots.$stable || newScopedSlots && vm.$scopedSlots.$key !== newScopedSlots.$key || !newScopedSlots && vm.$scopedSlots.$key);
  var needsForceUpdate = !!(renderChildren || vm.$options._renderChildren || hasDynamicScopedSlot);
  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode;
  if (vm._vnode) {
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;
  vm.$attrs = parentVnode.data.attrs || emptyObject;
  vm.$listeners = listeners || emptyObject;
  if (propsData && vm.$options.props) {
    toggleObserving(false);
    var props2 = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      var propOptions = vm.$options.props;
      props2[key] = validateProp(key, propOptions, propsData, vm);
    }
    toggleObserving(true);
    vm.$options.propsData = propsData;
  }
  listeners = listeners || emptyObject;
  var oldListeners = vm.$options._parentListeners;
  vm.$options._parentListeners = listeners;
  updateComponentListeners(vm, listeners, oldListeners);
  if (needsForceUpdate) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }
}
function isInInactiveTree(vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) {
      return true;
    }
  }
  return false;
}
function activateChildComponent(vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) {
      return;
    }
  } else if (vm._directInactive) {
    return;
  }
  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }
    callHook(vm, "activated");
  }
}
function deactivateChildComponent(vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) {
      return;
    }
  }
  if (!vm._inactive) {
    vm._inactive = true;
    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }
    callHook(vm, "deactivated");
  }
}
function callHook(vm, hook) {
  pushTarget();
  var handlers = vm.$options[hook];
  var info = hook + " hook";
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      invokeWithErrorHandling(handlers[i], vm, null, vm, info);
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit("hook:" + hook);
  }
  popTarget();
}
var queue = [];
var activatedChildren = [];
var has = {};
var waiting = false;
var flushing = false;
var index$1 = 0;
function resetSchedulerState() {
  index$1 = queue.length = activatedChildren.length = 0;
  has = {};
  waiting = flushing = false;
}
var currentFlushTimestamp = 0;
var getNow = Date.now;
if (inBrowser && !isIE) {
  var performance$1 = window.performance;
  if (performance$1 && typeof performance$1.now === "function" && getNow() > document.createEvent("Event").timeStamp) {
    getNow = function() {
      return performance$1.now();
    };
  }
}
function flushSchedulerQueue() {
  currentFlushTimestamp = getNow();
  flushing = true;
  var watcher, id;
  queue.sort(function(a, b) {
    return a.id - b.id;
  });
  for (index$1 = 0; index$1 < queue.length; index$1++) {
    watcher = queue[index$1];
    if (watcher.before) {
      watcher.before();
    }
    id = watcher.id;
    has[id] = null;
    watcher.run();
  }
  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();
  resetSchedulerState();
  callActivatedHooks(activatedQueue);
  callUpdatedHooks(updatedQueue);
  if (devtools && config.devtools) {
    devtools.emit("flush");
  }
}
function callUpdatedHooks(queue2) {
  var i = queue2.length;
  while (i--) {
    var watcher = queue2[i];
    var vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted && !vm._isDestroyed) {
      callHook(vm, "updated");
    }
  }
}
function queueActivatedComponent(vm) {
  vm._inactive = false;
  activatedChildren.push(vm);
}
function callActivatedHooks(queue2) {
  for (var i = 0; i < queue2.length; i++) {
    queue2[i]._inactive = true;
    activateChildComponent(queue2[i], true);
  }
}
function queueWatcher(watcher) {
  var id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      var i = queue.length - 1;
      while (i > index$1 && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(i + 1, 0, watcher);
    }
    if (!waiting) {
      waiting = true;
      nextTick(flushSchedulerQueue);
    }
  }
}
var uid$2 = 0;
var Watcher = function Watcher2(vm, expOrFn, cb, options, isRenderWatcher) {
  this.vm = vm;
  if (isRenderWatcher) {
    vm._watcher = this;
  }
  vm._watchers.push(this);
  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
    this.before = options.before;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }
  this.cb = cb;
  this.id = ++uid$2;
  this.active = true;
  this.dirty = this.lazy;
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression = "";
  if (typeof expOrFn === "function") {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = noop;
    }
  }
  this.value = this.lazy ? void 0 : this.get();
};
Watcher.prototype.get = function get() {
  pushTarget(this);
  var value;
  var vm = this.vm;
  try {
    value = this.getter.call(vm, vm);
  } catch (e) {
    if (this.user) {
      handleError(e, vm, 'getter for watcher "' + this.expression + '"');
    } else {
      throw e;
    }
  } finally {
    if (this.deep) {
      traverse(value);
    }
    popTarget();
    this.cleanupDeps();
  }
  return value;
};
Watcher.prototype.addDep = function addDep(dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};
Watcher.prototype.cleanupDeps = function cleanupDeps() {
  var i = this.deps.length;
  while (i--) {
    var dep = this.deps[i];
    if (!this.newDepIds.has(dep.id)) {
      dep.removeSub(this);
    }
  }
  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};
Watcher.prototype.update = function update() {
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};
Watcher.prototype.run = function run() {
  if (this.active) {
    var value = this.get();
    if (value !== this.value || isObject$1(value) || this.deep) {
      var oldValue = this.value;
      this.value = value;
      if (this.user) {
        var info = 'callback for watcher "' + this.expression + '"';
        invokeWithErrorHandling(this.cb, this.vm, [value, oldValue], this.vm, info);
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};
Watcher.prototype.evaluate = function evaluate() {
  this.value = this.get();
  this.dirty = false;
};
Watcher.prototype.depend = function depend2() {
  var i = this.deps.length;
  while (i--) {
    this.deps[i].depend();
  }
};
Watcher.prototype.teardown = function teardown() {
  if (this.active) {
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this.deps[i].removeSub(this);
    }
    this.active = false;
  }
};
var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};
function proxy(target2, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter() {
    return this[sourceKey][key];
  };
  sharedPropertyDefinition.set = function proxySetter(val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target2, key, sharedPropertyDefinition);
}
function initState(vm) {
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) {
    initProps(vm, opts.props);
  }
  if (opts.methods) {
    initMethods(vm, opts.methods);
  }
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true);
  }
  if (opts.computed) {
    initComputed(vm, opts.computed);
  }
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}
function initProps(vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props2 = vm._props = {};
  var keys2 = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;
  if (!isRoot) {
    toggleObserving(false);
  }
  var loop = function(key2) {
    keys2.push(key2);
    var value = validateProp(key2, propsOptions, propsData, vm);
    {
      defineReactive$$1(props2, key2, value);
    }
    if (!(key2 in vm)) {
      proxy(vm, "_props", key2);
    }
  };
  for (var key in propsOptions)
    loop(key);
  toggleObserving(true);
}
function initData(vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === "function" ? getData(data, vm) : data || {};
  if (!isPlainObject(data)) {
    data = {};
  }
  var keys2 = Object.keys(data);
  var props2 = vm.$options.props;
  vm.$options.methods;
  var i = keys2.length;
  while (i--) {
    var key = keys2[i];
    if (props2 && hasOwn(props2, key))
      ;
    else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  }
  observe(data, true);
}
function getData(data, vm) {
  pushTarget();
  try {
    return data.call(vm, vm);
  } catch (e) {
    handleError(e, vm, "data()");
    return {};
  } finally {
    popTarget();
  }
}
var computedWatcherOptions = { lazy: true };
function initComputed(vm, computed) {
  var watchers = vm._computedWatchers = /* @__PURE__ */ Object.create(null);
  var isSSR = isServerRendering();
  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === "function" ? userDef : userDef.get;
    if (!isSSR) {
      watchers[key] = new Watcher(vm, getter || noop, noop, computedWatcherOptions);
    }
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    }
  }
}
function defineComputed(target2, key, userDef) {
  var shouldCache = !isServerRendering();
  if (typeof userDef === "function") {
    sharedPropertyDefinition.get = shouldCache ? createComputedGetter(key) : createGetterInvoker(userDef);
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get ? shouldCache && userDef.cache !== false ? createComputedGetter(key) : createGetterInvoker(userDef.get) : noop;
    sharedPropertyDefinition.set = userDef.set || noop;
  }
  Object.defineProperty(target2, key, sharedPropertyDefinition);
}
function createComputedGetter(key) {
  return function computedGetter() {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.target) {
        watcher.depend();
      }
      return watcher.value;
    }
  };
}
function createGetterInvoker(fn) {
  return function computedGetter() {
    return fn.call(this, this);
  };
}
function initMethods(vm, methods) {
  vm.$options.props;
  for (var key in methods) {
    vm[key] = typeof methods[key] !== "function" ? noop : bind(methods[key], vm);
  }
}
function initWatch(vm, watch) {
  for (var key in watch) {
    var handler = watch[key];
    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}
function createWatcher(vm, expOrFn, handler, options) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === "string") {
    handler = vm[handler];
  }
  return vm.$watch(expOrFn, handler, options);
}
function stateMixin(Vue2) {
  var dataDef = {};
  dataDef.get = function() {
    return this._data;
  };
  var propsDef = {};
  propsDef.get = function() {
    return this._props;
  };
  Object.defineProperty(Vue2.prototype, "$data", dataDef);
  Object.defineProperty(Vue2.prototype, "$props", propsDef);
  Vue2.prototype.$set = set;
  Vue2.prototype.$delete = del;
  Vue2.prototype.$watch = function(expOrFn, cb, options) {
    var vm = this;
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options);
    }
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      var info = 'callback for immediate watcher "' + watcher.expression + '"';
      pushTarget();
      invokeWithErrorHandling(cb, vm, [watcher.value], vm, info);
      popTarget();
    }
    return function unwatchFn() {
      watcher.teardown();
    };
  };
}
var uid$3 = 0;
function initMixin(Vue2) {
  Vue2.prototype._init = function(options) {
    var vm = this;
    vm._uid = uid$3++;
    vm._isVue = true;
    if (options && options._isComponent) {
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(resolveConstructorOptions(vm.constructor), options || {}, vm);
    }
    {
      vm._renderProxy = vm;
    }
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, "beforeCreate");
    initInjections(vm);
    initState(vm);
    initProvide(vm);
    callHook(vm, "created");
    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}
function initInternalComponent(vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  var parentVnode = options._parentVnode;
  opts.parent = options.parent;
  opts._parentVnode = parentVnode;
  var vnodeComponentOptions = parentVnode.componentOptions;
  opts.propsData = vnodeComponentOptions.propsData;
  opts._parentListeners = vnodeComponentOptions.listeners;
  opts._renderChildren = vnodeComponentOptions.children;
  opts._componentTag = vnodeComponentOptions.tag;
  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}
function resolveConstructorOptions(Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      Ctor.superOptions = superOptions;
      var modifiedOptions = resolveModifiedOptions(Ctor);
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options;
}
function resolveModifiedOptions(Ctor) {
  var modified;
  var latest = Ctor.options;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) {
        modified = {};
      }
      modified[key] = latest[key];
    }
  }
  return modified;
}
function Vue(options) {
  this._init(options);
}
initMixin(Vue);
stateMixin(Vue);
eventsMixin(Vue);
lifecycleMixin(Vue);
renderMixin(Vue);
function initUse(Vue2) {
  Vue2.use = function(plugin) {
    var installedPlugins = this._installedPlugins || (this._installedPlugins = []);
    if (installedPlugins.indexOf(plugin) > -1) {
      return this;
    }
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === "function") {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === "function") {
      plugin.apply(null, args);
    }
    installedPlugins.push(plugin);
    return this;
  };
}
function initMixin$1(Vue2) {
  Vue2.mixin = function(mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this;
  };
}
function initExtend(Vue2) {
  Vue2.cid = 0;
  var cid = 1;
  Vue2.extend = function(extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId];
    }
    var name = extendOptions.name || Super.options.name;
    var Sub = function VueComponent(options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(Super.options, extendOptions);
    Sub["super"] = Super;
    if (Sub.options.props) {
      initProps$1(Sub);
    }
    if (Sub.options.computed) {
      initComputed$1(Sub);
    }
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;
    ASSET_TYPES.forEach(function(type2) {
      Sub[type2] = Super[type2];
    });
    if (name) {
      Sub.options.components[name] = Sub;
    }
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options);
    cachedCtors[SuperId] = Sub;
    return Sub;
  };
}
function initProps$1(Comp) {
  var props2 = Comp.options.props;
  for (var key in props2) {
    proxy(Comp.prototype, "_props", key);
  }
}
function initComputed$1(Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}
function initAssetRegisters(Vue2) {
  ASSET_TYPES.forEach(function(type2) {
    Vue2[type2] = function(id, definition) {
      if (!definition) {
        return this.options[type2 + "s"][id];
      } else {
        if (type2 === "component" && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type2 === "directive" && typeof definition === "function") {
          definition = { bind: definition, update: definition };
        }
        this.options[type2 + "s"][id] = definition;
        return definition;
      }
    };
  });
}
function getComponentName(opts) {
  return opts && (opts.Ctor.options.name || opts.tag);
}
function matches(pattern2, name) {
  if (Array.isArray(pattern2)) {
    return pattern2.indexOf(name) > -1;
  } else if (typeof pattern2 === "string") {
    return pattern2.split(",").indexOf(name) > -1;
  } else if (isRegExp(pattern2)) {
    return pattern2.test(name);
  }
  return false;
}
function pruneCache(keepAliveInstance, filter) {
  var cache2 = keepAliveInstance.cache;
  var keys2 = keepAliveInstance.keys;
  var _vnode = keepAliveInstance._vnode;
  for (var key in cache2) {
    var entry = cache2[key];
    if (entry) {
      var name = entry.name;
      if (name && !filter(name)) {
        pruneCacheEntry(cache2, key, keys2, _vnode);
      }
    }
  }
}
function pruneCacheEntry(cache2, key, keys2, current) {
  var entry = cache2[key];
  if (entry && (!current || entry.tag !== current.tag)) {
    entry.componentInstance.$destroy();
  }
  cache2[key] = null;
  remove(keys2, key);
}
var patternTypes = [String, RegExp, Array];
var KeepAlive = {
  name: "keep-alive",
  abstract: true,
  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },
  methods: {
    cacheVNode: function cacheVNode() {
      var ref2 = this;
      var cache2 = ref2.cache;
      var keys2 = ref2.keys;
      var vnodeToCache = ref2.vnodeToCache;
      var keyToCache = ref2.keyToCache;
      if (vnodeToCache) {
        var tag = vnodeToCache.tag;
        var componentInstance = vnodeToCache.componentInstance;
        var componentOptions = vnodeToCache.componentOptions;
        cache2[keyToCache] = {
          name: getComponentName(componentOptions),
          tag,
          componentInstance
        };
        keys2.push(keyToCache);
        if (this.max && keys2.length > parseInt(this.max)) {
          pruneCacheEntry(cache2, keys2[0], keys2, this._vnode);
        }
        this.vnodeToCache = null;
      }
    }
  },
  created: function created() {
    this.cache = /* @__PURE__ */ Object.create(null);
    this.keys = [];
  },
  destroyed: function destroyed() {
    for (var key in this.cache) {
      pruneCacheEntry(this.cache, key, this.keys);
    }
  },
  mounted: function mounted() {
    var this$1$1 = this;
    this.cacheVNode();
    this.$watch("include", function(val) {
      pruneCache(this$1$1, function(name) {
        return matches(val, name);
      });
    });
    this.$watch("exclude", function(val) {
      pruneCache(this$1$1, function(name) {
        return !matches(val, name);
      });
    });
  },
  updated: function updated() {
    this.cacheVNode();
  },
  render: function render() {
    var slot = this.$slots.default;
    var vnode = getFirstComponentChild(slot);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      var name = getComponentName(componentOptions);
      var ref2 = this;
      var include = ref2.include;
      var exclude = ref2.exclude;
      if (include && (!name || !matches(include, name)) || exclude && name && matches(exclude, name)) {
        return vnode;
      }
      var ref$1 = this;
      var cache2 = ref$1.cache;
      var keys2 = ref$1.keys;
      var key = vnode.key == null ? componentOptions.Ctor.cid + (componentOptions.tag ? "::" + componentOptions.tag : "") : vnode.key;
      if (cache2[key]) {
        vnode.componentInstance = cache2[key].componentInstance;
        remove(keys2, key);
        keys2.push(key);
      } else {
        this.vnodeToCache = vnode;
        this.keyToCache = key;
      }
      vnode.data.keepAlive = true;
    }
    return vnode || slot && slot[0];
  }
};
var builtInComponents = {
  KeepAlive
};
function initGlobalAPI(Vue2) {
  var configDef = {};
  configDef.get = function() {
    return config;
  };
  Object.defineProperty(Vue2, "config", configDef);
  Vue2.util = {
    warn,
    extend,
    mergeOptions,
    defineReactive: defineReactive$$1
  };
  Vue2.set = set;
  Vue2.delete = del;
  Vue2.nextTick = nextTick;
  Vue2.observable = function(obj) {
    observe(obj);
    return obj;
  };
  Vue2.options = /* @__PURE__ */ Object.create(null);
  ASSET_TYPES.forEach(function(type2) {
    Vue2.options[type2 + "s"] = /* @__PURE__ */ Object.create(null);
  });
  Vue2.options._base = Vue2;
  extend(Vue2.options.components, builtInComponents);
  initUse(Vue2);
  initMixin$1(Vue2);
  initExtend(Vue2);
  initAssetRegisters(Vue2);
}
initGlobalAPI(Vue);
Object.defineProperty(Vue.prototype, "$isServer", {
  get: isServerRendering
});
Object.defineProperty(Vue.prototype, "$ssrContext", {
  get: function get2() {
    return this.$vnode && this.$vnode.ssrContext;
  }
});
Object.defineProperty(Vue, "FunctionalRenderContext", {
  value: FunctionalRenderContext
});
Vue.version = "2.6.14";
var isReservedAttr = makeMap("style,class");
var acceptValue = makeMap("input,textarea,option,select,progress");
var mustUseProp = function(tag, type2, attr) {
  return attr === "value" && acceptValue(tag) && type2 !== "button" || attr === "selected" && tag === "option" || attr === "checked" && tag === "input" || attr === "muted" && tag === "video";
};
var isEnumeratedAttr = makeMap("contenteditable,draggable,spellcheck");
var isValidContentEditableValue = makeMap("events,caret,typing,plaintext-only");
var convertEnumeratedValue = function(key, value) {
  return isFalsyAttrValue(value) || value === "false" ? "false" : key === "contenteditable" && isValidContentEditableValue(value) ? value : "true";
};
var isBooleanAttr = makeMap("allowfullscreen,async,autofocus,autoplay,checked,compact,controls,declare,default,defaultchecked,defaultmuted,defaultselected,defer,disabled,enabled,formnovalidate,hidden,indeterminate,inert,ismap,itemscope,loop,multiple,muted,nohref,noresize,noshade,novalidate,nowrap,open,pauseonexit,readonly,required,reversed,scoped,seamless,selected,sortable,truespeed,typemustmatch,visible");
var xlinkNS = "http://www.w3.org/1999/xlink";
var isXlink = function(name) {
  return name.charAt(5) === ":" && name.slice(0, 5) === "xlink";
};
var getXlinkProp = function(name) {
  return isXlink(name) ? name.slice(6, name.length) : "";
};
var isFalsyAttrValue = function(val) {
  return val == null || val === false;
};
function genClassForVnode(vnode) {
  var data = vnode.data;
  var parentNode2 = vnode;
  var childNode = vnode;
  while (isDef(childNode.componentInstance)) {
    childNode = childNode.componentInstance._vnode;
    if (childNode && childNode.data) {
      data = mergeClassData(childNode.data, data);
    }
  }
  while (isDef(parentNode2 = parentNode2.parent)) {
    if (parentNode2 && parentNode2.data) {
      data = mergeClassData(data, parentNode2.data);
    }
  }
  return renderClass(data.staticClass, data.class);
}
function mergeClassData(child, parent) {
  return {
    staticClass: concat(child.staticClass, parent.staticClass),
    class: isDef(child.class) ? [child.class, parent.class] : parent.class
  };
}
function renderClass(staticClass, dynamicClass) {
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass));
  }
  return "";
}
function concat(a, b) {
  return a ? b ? a + " " + b : a : b || "";
}
function stringifyClass(value) {
  if (Array.isArray(value)) {
    return stringifyArray(value);
  }
  if (isObject$1(value)) {
    return stringifyObject(value);
  }
  if (typeof value === "string") {
    return value;
  }
  return "";
}
function stringifyArray(value) {
  var res = "";
  var stringified;
  for (var i = 0, l = value.length; i < l; i++) {
    if (isDef(stringified = stringifyClass(value[i])) && stringified !== "") {
      if (res) {
        res += " ";
      }
      res += stringified;
    }
  }
  return res;
}
function stringifyObject(value) {
  var res = "";
  for (var key in value) {
    if (value[key]) {
      if (res) {
        res += " ";
      }
      res += key;
    }
  }
  return res;
}
var namespaceMap = {
  svg: "http://www.w3.org/2000/svg",
  math: "http://www.w3.org/1998/Math/MathML"
};
var isHTMLTag = makeMap("html,body,base,head,link,meta,style,title,address,article,aside,footer,header,h1,h2,h3,h4,h5,h6,hgroup,nav,section,div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,rtc,ruby,s,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,embed,object,param,source,canvas,script,noscript,del,ins,caption,col,colgroup,table,thead,tbody,td,th,tr,button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,output,progress,select,textarea,details,dialog,menu,menuitem,summary,content,element,shadow,template,blockquote,iframe,tfoot");
var isSVG = makeMap("svg,animate,circle,clippath,cursor,defs,desc,ellipse,filter,font-face,foreignobject,g,glyph,image,line,marker,mask,missing-glyph,path,pattern,polygon,polyline,rect,switch,symbol,text,textpath,tspan,use,view", true);
var isReservedTag = function(tag) {
  return isHTMLTag(tag) || isSVG(tag);
};
function getTagNamespace(tag) {
  if (isSVG(tag)) {
    return "svg";
  }
  if (tag === "math") {
    return "math";
  }
}
var unknownElementCache = /* @__PURE__ */ Object.create(null);
function isUnknownElement(tag) {
  if (!inBrowser) {
    return true;
  }
  if (isReservedTag(tag)) {
    return false;
  }
  tag = tag.toLowerCase();
  if (unknownElementCache[tag] != null) {
    return unknownElementCache[tag];
  }
  var el = document.createElement(tag);
  if (tag.indexOf("-") > -1) {
    return unknownElementCache[tag] = el.constructor === window.HTMLUnknownElement || el.constructor === window.HTMLElement;
  } else {
    return unknownElementCache[tag] = /HTMLUnknownElement/.test(el.toString());
  }
}
var isTextInputType = makeMap("text,number,password,search,email,tel,url");
function query(el) {
  if (typeof el === "string") {
    var selected = document.querySelector(el);
    if (!selected) {
      return document.createElement("div");
    }
    return selected;
  } else {
    return el;
  }
}
function createElement$1(tagName2, vnode) {
  var elm = document.createElement(tagName2);
  if (tagName2 !== "select") {
    return elm;
  }
  if (vnode.data && vnode.data.attrs && vnode.data.attrs.multiple !== void 0) {
    elm.setAttribute("multiple", "multiple");
  }
  return elm;
}
function createElementNS(namespace, tagName2) {
  return document.createElementNS(namespaceMap[namespace], tagName2);
}
function createTextNode(text) {
  return document.createTextNode(text);
}
function createComment(text) {
  return document.createComment(text);
}
function insertBefore(parentNode2, newNode, referenceNode) {
  parentNode2.insertBefore(newNode, referenceNode);
}
function removeChild(node, child) {
  node.removeChild(child);
}
function appendChild(node, child) {
  node.appendChild(child);
}
function parentNode(node) {
  return node.parentNode;
}
function nextSibling(node) {
  return node.nextSibling;
}
function tagName(node) {
  return node.tagName;
}
function setTextContent(node, text) {
  node.textContent = text;
}
function setStyleScope(node, scopeId) {
  node.setAttribute(scopeId, "");
}
var nodeOps = /* @__PURE__ */ Object.freeze({
  createElement: createElement$1,
  createElementNS,
  createTextNode,
  createComment,
  insertBefore,
  removeChild,
  appendChild,
  parentNode,
  nextSibling,
  tagName,
  setTextContent,
  setStyleScope
});
var ref = {
  create: function create(_, vnode) {
    registerRef(vnode);
  },
  update: function update2(oldVnode, vnode) {
    if (oldVnode.data.ref !== vnode.data.ref) {
      registerRef(oldVnode, true);
      registerRef(vnode);
    }
  },
  destroy: function destroy2(vnode) {
    registerRef(vnode, true);
  }
};
function registerRef(vnode, isRemoval) {
  var key = vnode.data.ref;
  if (!isDef(key)) {
    return;
  }
  var vm = vnode.context;
  var ref2 = vnode.componentInstance || vnode.elm;
  var refs = vm.$refs;
  if (isRemoval) {
    if (Array.isArray(refs[key])) {
      remove(refs[key], ref2);
    } else if (refs[key] === ref2) {
      refs[key] = void 0;
    }
  } else {
    if (vnode.data.refInFor) {
      if (!Array.isArray(refs[key])) {
        refs[key] = [ref2];
      } else if (refs[key].indexOf(ref2) < 0) {
        refs[key].push(ref2);
      }
    } else {
      refs[key] = ref2;
    }
  }
}
var emptyNode = new VNode("", {}, []);
var hooks = ["create", "activate", "update", "remove", "destroy"];
function sameVnode(a, b) {
  return a.key === b.key && a.asyncFactory === b.asyncFactory && (a.tag === b.tag && a.isComment === b.isComment && isDef(a.data) === isDef(b.data) && sameInputType(a, b) || isTrue(a.isAsyncPlaceholder) && isUndef(b.asyncFactory.error));
}
function sameInputType(a, b) {
  if (a.tag !== "input") {
    return true;
  }
  var i;
  var typeA = isDef(i = a.data) && isDef(i = i.attrs) && i.type;
  var typeB = isDef(i = b.data) && isDef(i = i.attrs) && i.type;
  return typeA === typeB || isTextInputType(typeA) && isTextInputType(typeB);
}
function createKeyToOldIdx(children, beginIdx, endIdx) {
  var i, key;
  var map = {};
  for (i = beginIdx; i <= endIdx; ++i) {
    key = children[i].key;
    if (isDef(key)) {
      map[key] = i;
    }
  }
  return map;
}
function createPatchFunction(backend) {
  var i, j;
  var cbs = {};
  var modules2 = backend.modules;
  var nodeOps2 = backend.nodeOps;
  for (i = 0; i < hooks.length; ++i) {
    cbs[hooks[i]] = [];
    for (j = 0; j < modules2.length; ++j) {
      if (isDef(modules2[j][hooks[i]])) {
        cbs[hooks[i]].push(modules2[j][hooks[i]]);
      }
    }
  }
  function emptyNodeAt(elm) {
    return new VNode(nodeOps2.tagName(elm).toLowerCase(), {}, [], void 0, elm);
  }
  function createRmCb(childElm, listeners) {
    function remove$$12() {
      if (--remove$$12.listeners === 0) {
        removeNode(childElm);
      }
    }
    remove$$12.listeners = listeners;
    return remove$$12;
  }
  function removeNode(el) {
    var parent = nodeOps2.parentNode(el);
    if (isDef(parent)) {
      nodeOps2.removeChild(parent, el);
    }
  }
  function createElm(vnode, insertedVnodeQueue, parentElm, refElm, nested, ownerArray, index2) {
    if (isDef(vnode.elm) && isDef(ownerArray)) {
      vnode = ownerArray[index2] = cloneVNode(vnode);
    }
    vnode.isRootInsert = !nested;
    if (createComponent2(vnode, insertedVnodeQueue, parentElm, refElm)) {
      return;
    }
    var data = vnode.data;
    var children = vnode.children;
    var tag = vnode.tag;
    if (isDef(tag)) {
      vnode.elm = vnode.ns ? nodeOps2.createElementNS(vnode.ns, tag) : nodeOps2.createElement(tag, vnode);
      setScope(vnode);
      {
        createChildren(vnode, children, insertedVnodeQueue);
        if (isDef(data)) {
          invokeCreateHooks(vnode, insertedVnodeQueue);
        }
        insert2(parentElm, vnode.elm, refElm);
      }
    } else if (isTrue(vnode.isComment)) {
      vnode.elm = nodeOps2.createComment(vnode.text);
      insert2(parentElm, vnode.elm, refElm);
    } else {
      vnode.elm = nodeOps2.createTextNode(vnode.text);
      insert2(parentElm, vnode.elm, refElm);
    }
  }
  function createComponent2(vnode, insertedVnodeQueue, parentElm, refElm) {
    var i2 = vnode.data;
    if (isDef(i2)) {
      var isReactivated = isDef(vnode.componentInstance) && i2.keepAlive;
      if (isDef(i2 = i2.hook) && isDef(i2 = i2.init)) {
        i2(vnode, false);
      }
      if (isDef(vnode.componentInstance)) {
        initComponent(vnode, insertedVnodeQueue);
        insert2(parentElm, vnode.elm, refElm);
        if (isTrue(isReactivated)) {
          reactivateComponent(vnode, insertedVnodeQueue, parentElm, refElm);
        }
        return true;
      }
    }
  }
  function initComponent(vnode, insertedVnodeQueue) {
    if (isDef(vnode.data.pendingInsert)) {
      insertedVnodeQueue.push.apply(insertedVnodeQueue, vnode.data.pendingInsert);
      vnode.data.pendingInsert = null;
    }
    vnode.elm = vnode.componentInstance.$el;
    if (isPatchable(vnode)) {
      invokeCreateHooks(vnode, insertedVnodeQueue);
      setScope(vnode);
    } else {
      registerRef(vnode);
      insertedVnodeQueue.push(vnode);
    }
  }
  function reactivateComponent(vnode, insertedVnodeQueue, parentElm, refElm) {
    var i2;
    var innerNode = vnode;
    while (innerNode.componentInstance) {
      innerNode = innerNode.componentInstance._vnode;
      if (isDef(i2 = innerNode.data) && isDef(i2 = i2.transition)) {
        for (i2 = 0; i2 < cbs.activate.length; ++i2) {
          cbs.activate[i2](emptyNode, innerNode);
        }
        insertedVnodeQueue.push(innerNode);
        break;
      }
    }
    insert2(parentElm, vnode.elm, refElm);
  }
  function insert2(parent, elm, ref$$1) {
    if (isDef(parent)) {
      if (isDef(ref$$1)) {
        if (nodeOps2.parentNode(ref$$1) === parent) {
          nodeOps2.insertBefore(parent, elm, ref$$1);
        }
      } else {
        nodeOps2.appendChild(parent, elm);
      }
    }
  }
  function createChildren(vnode, children, insertedVnodeQueue) {
    if (Array.isArray(children)) {
      for (var i2 = 0; i2 < children.length; ++i2) {
        createElm(children[i2], insertedVnodeQueue, vnode.elm, null, true, children, i2);
      }
    } else if (isPrimitive(vnode.text)) {
      nodeOps2.appendChild(vnode.elm, nodeOps2.createTextNode(String(vnode.text)));
    }
  }
  function isPatchable(vnode) {
    while (vnode.componentInstance) {
      vnode = vnode.componentInstance._vnode;
    }
    return isDef(vnode.tag);
  }
  function invokeCreateHooks(vnode, insertedVnodeQueue) {
    for (var i$1 = 0; i$1 < cbs.create.length; ++i$1) {
      cbs.create[i$1](emptyNode, vnode);
    }
    i = vnode.data.hook;
    if (isDef(i)) {
      if (isDef(i.create)) {
        i.create(emptyNode, vnode);
      }
      if (isDef(i.insert)) {
        insertedVnodeQueue.push(vnode);
      }
    }
  }
  function setScope(vnode) {
    var i2;
    if (isDef(i2 = vnode.fnScopeId)) {
      nodeOps2.setStyleScope(vnode.elm, i2);
    } else {
      var ancestor = vnode;
      while (ancestor) {
        if (isDef(i2 = ancestor.context) && isDef(i2 = i2.$options._scopeId)) {
          nodeOps2.setStyleScope(vnode.elm, i2);
        }
        ancestor = ancestor.parent;
      }
    }
    if (isDef(i2 = activeInstance) && i2 !== vnode.context && i2 !== vnode.fnContext && isDef(i2 = i2.$options._scopeId)) {
      nodeOps2.setStyleScope(vnode.elm, i2);
    }
  }
  function addVnodes(parentElm, refElm, vnodes, startIdx, endIdx, insertedVnodeQueue) {
    for (; startIdx <= endIdx; ++startIdx) {
      createElm(vnodes[startIdx], insertedVnodeQueue, parentElm, refElm, false, vnodes, startIdx);
    }
  }
  function invokeDestroyHook(vnode) {
    var i2, j2;
    var data = vnode.data;
    if (isDef(data)) {
      if (isDef(i2 = data.hook) && isDef(i2 = i2.destroy)) {
        i2(vnode);
      }
      for (i2 = 0; i2 < cbs.destroy.length; ++i2) {
        cbs.destroy[i2](vnode);
      }
    }
    if (isDef(i2 = vnode.children)) {
      for (j2 = 0; j2 < vnode.children.length; ++j2) {
        invokeDestroyHook(vnode.children[j2]);
      }
    }
  }
  function removeVnodes(vnodes, startIdx, endIdx) {
    for (; startIdx <= endIdx; ++startIdx) {
      var ch = vnodes[startIdx];
      if (isDef(ch)) {
        if (isDef(ch.tag)) {
          removeAndInvokeRemoveHook(ch);
          invokeDestroyHook(ch);
        } else {
          removeNode(ch.elm);
        }
      }
    }
  }
  function removeAndInvokeRemoveHook(vnode, rm) {
    if (isDef(rm) || isDef(vnode.data)) {
      var i2;
      var listeners = cbs.remove.length + 1;
      if (isDef(rm)) {
        rm.listeners += listeners;
      } else {
        rm = createRmCb(vnode.elm, listeners);
      }
      if (isDef(i2 = vnode.componentInstance) && isDef(i2 = i2._vnode) && isDef(i2.data)) {
        removeAndInvokeRemoveHook(i2, rm);
      }
      for (i2 = 0; i2 < cbs.remove.length; ++i2) {
        cbs.remove[i2](vnode, rm);
      }
      if (isDef(i2 = vnode.data.hook) && isDef(i2 = i2.remove)) {
        i2(vnode, rm);
      } else {
        rm();
      }
    } else {
      removeNode(vnode.elm);
    }
  }
  function updateChildren(parentElm, oldCh, newCh, insertedVnodeQueue, removeOnly) {
    var oldStartIdx = 0;
    var newStartIdx = 0;
    var oldEndIdx = oldCh.length - 1;
    var oldStartVnode = oldCh[0];
    var oldEndVnode = oldCh[oldEndIdx];
    var newEndIdx = newCh.length - 1;
    var newStartVnode = newCh[0];
    var newEndVnode = newCh[newEndIdx];
    var oldKeyToIdx, idxInOld, vnodeToMove, refElm;
    var canMove = !removeOnly;
    while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
      if (isUndef(oldStartVnode)) {
        oldStartVnode = oldCh[++oldStartIdx];
      } else if (isUndef(oldEndVnode)) {
        oldEndVnode = oldCh[--oldEndIdx];
      } else if (sameVnode(oldStartVnode, newStartVnode)) {
        patchVnode(oldStartVnode, newStartVnode, insertedVnodeQueue, newCh, newStartIdx);
        oldStartVnode = oldCh[++oldStartIdx];
        newStartVnode = newCh[++newStartIdx];
      } else if (sameVnode(oldEndVnode, newEndVnode)) {
        patchVnode(oldEndVnode, newEndVnode, insertedVnodeQueue, newCh, newEndIdx);
        oldEndVnode = oldCh[--oldEndIdx];
        newEndVnode = newCh[--newEndIdx];
      } else if (sameVnode(oldStartVnode, newEndVnode)) {
        patchVnode(oldStartVnode, newEndVnode, insertedVnodeQueue, newCh, newEndIdx);
        canMove && nodeOps2.insertBefore(parentElm, oldStartVnode.elm, nodeOps2.nextSibling(oldEndVnode.elm));
        oldStartVnode = oldCh[++oldStartIdx];
        newEndVnode = newCh[--newEndIdx];
      } else if (sameVnode(oldEndVnode, newStartVnode)) {
        patchVnode(oldEndVnode, newStartVnode, insertedVnodeQueue, newCh, newStartIdx);
        canMove && nodeOps2.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm);
        oldEndVnode = oldCh[--oldEndIdx];
        newStartVnode = newCh[++newStartIdx];
      } else {
        if (isUndef(oldKeyToIdx)) {
          oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx);
        }
        idxInOld = isDef(newStartVnode.key) ? oldKeyToIdx[newStartVnode.key] : findIdxInOld(newStartVnode, oldCh, oldStartIdx, oldEndIdx);
        if (isUndef(idxInOld)) {
          createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm, false, newCh, newStartIdx);
        } else {
          vnodeToMove = oldCh[idxInOld];
          if (sameVnode(vnodeToMove, newStartVnode)) {
            patchVnode(vnodeToMove, newStartVnode, insertedVnodeQueue, newCh, newStartIdx);
            oldCh[idxInOld] = void 0;
            canMove && nodeOps2.insertBefore(parentElm, vnodeToMove.elm, oldStartVnode.elm);
          } else {
            createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm, false, newCh, newStartIdx);
          }
        }
        newStartVnode = newCh[++newStartIdx];
      }
    }
    if (oldStartIdx > oldEndIdx) {
      refElm = isUndef(newCh[newEndIdx + 1]) ? null : newCh[newEndIdx + 1].elm;
      addVnodes(parentElm, refElm, newCh, newStartIdx, newEndIdx, insertedVnodeQueue);
    } else if (newStartIdx > newEndIdx) {
      removeVnodes(oldCh, oldStartIdx, oldEndIdx);
    }
  }
  function findIdxInOld(node, oldCh, start, end) {
    for (var i2 = start; i2 < end; i2++) {
      var c = oldCh[i2];
      if (isDef(c) && sameVnode(node, c)) {
        return i2;
      }
    }
  }
  function patchVnode(oldVnode, vnode, insertedVnodeQueue, ownerArray, index2, removeOnly) {
    if (oldVnode === vnode) {
      return;
    }
    if (isDef(vnode.elm) && isDef(ownerArray)) {
      vnode = ownerArray[index2] = cloneVNode(vnode);
    }
    var elm = vnode.elm = oldVnode.elm;
    if (isTrue(oldVnode.isAsyncPlaceholder)) {
      if (isDef(vnode.asyncFactory.resolved)) {
        hydrate(oldVnode.elm, vnode, insertedVnodeQueue);
      } else {
        vnode.isAsyncPlaceholder = true;
      }
      return;
    }
    if (isTrue(vnode.isStatic) && isTrue(oldVnode.isStatic) && vnode.key === oldVnode.key && (isTrue(vnode.isCloned) || isTrue(vnode.isOnce))) {
      vnode.componentInstance = oldVnode.componentInstance;
      return;
    }
    var i2;
    var data = vnode.data;
    if (isDef(data) && isDef(i2 = data.hook) && isDef(i2 = i2.prepatch)) {
      i2(oldVnode, vnode);
    }
    var oldCh = oldVnode.children;
    var ch = vnode.children;
    if (isDef(data) && isPatchable(vnode)) {
      for (i2 = 0; i2 < cbs.update.length; ++i2) {
        cbs.update[i2](oldVnode, vnode);
      }
      if (isDef(i2 = data.hook) && isDef(i2 = i2.update)) {
        i2(oldVnode, vnode);
      }
    }
    if (isUndef(vnode.text)) {
      if (isDef(oldCh) && isDef(ch)) {
        if (oldCh !== ch) {
          updateChildren(elm, oldCh, ch, insertedVnodeQueue, removeOnly);
        }
      } else if (isDef(ch)) {
        if (isDef(oldVnode.text)) {
          nodeOps2.setTextContent(elm, "");
        }
        addVnodes(elm, null, ch, 0, ch.length - 1, insertedVnodeQueue);
      } else if (isDef(oldCh)) {
        removeVnodes(oldCh, 0, oldCh.length - 1);
      } else if (isDef(oldVnode.text)) {
        nodeOps2.setTextContent(elm, "");
      }
    } else if (oldVnode.text !== vnode.text) {
      nodeOps2.setTextContent(elm, vnode.text);
    }
    if (isDef(data)) {
      if (isDef(i2 = data.hook) && isDef(i2 = i2.postpatch)) {
        i2(oldVnode, vnode);
      }
    }
  }
  function invokeInsertHook(vnode, queue2, initial) {
    if (isTrue(initial) && isDef(vnode.parent)) {
      vnode.parent.data.pendingInsert = queue2;
    } else {
      for (var i2 = 0; i2 < queue2.length; ++i2) {
        queue2[i2].data.hook.insert(queue2[i2]);
      }
    }
  }
  var isRenderedModule = makeMap("attrs,class,staticClass,staticStyle,key");
  function hydrate(elm, vnode, insertedVnodeQueue, inVPre) {
    var i2;
    var tag = vnode.tag;
    var data = vnode.data;
    var children = vnode.children;
    inVPre = inVPre || data && data.pre;
    vnode.elm = elm;
    if (isTrue(vnode.isComment) && isDef(vnode.asyncFactory)) {
      vnode.isAsyncPlaceholder = true;
      return true;
    }
    if (isDef(data)) {
      if (isDef(i2 = data.hook) && isDef(i2 = i2.init)) {
        i2(vnode, true);
      }
      if (isDef(i2 = vnode.componentInstance)) {
        initComponent(vnode, insertedVnodeQueue);
        return true;
      }
    }
    if (isDef(tag)) {
      if (isDef(children)) {
        if (!elm.hasChildNodes()) {
          createChildren(vnode, children, insertedVnodeQueue);
        } else {
          if (isDef(i2 = data) && isDef(i2 = i2.domProps) && isDef(i2 = i2.innerHTML)) {
            if (i2 !== elm.innerHTML) {
              return false;
            }
          } else {
            var childrenMatch = true;
            var childNode = elm.firstChild;
            for (var i$1 = 0; i$1 < children.length; i$1++) {
              if (!childNode || !hydrate(childNode, children[i$1], insertedVnodeQueue, inVPre)) {
                childrenMatch = false;
                break;
              }
              childNode = childNode.nextSibling;
            }
            if (!childrenMatch || childNode) {
              return false;
            }
          }
        }
      }
      if (isDef(data)) {
        var fullInvoke = false;
        for (var key in data) {
          if (!isRenderedModule(key)) {
            fullInvoke = true;
            invokeCreateHooks(vnode, insertedVnodeQueue);
            break;
          }
        }
        if (!fullInvoke && data["class"]) {
          traverse(data["class"]);
        }
      }
    } else if (elm.data !== vnode.text) {
      elm.data = vnode.text;
    }
    return true;
  }
  return function patch2(oldVnode, vnode, hydrating, removeOnly) {
    if (isUndef(vnode)) {
      if (isDef(oldVnode)) {
        invokeDestroyHook(oldVnode);
      }
      return;
    }
    var isInitialPatch = false;
    var insertedVnodeQueue = [];
    if (isUndef(oldVnode)) {
      isInitialPatch = true;
      createElm(vnode, insertedVnodeQueue);
    } else {
      var isRealElement = isDef(oldVnode.nodeType);
      if (!isRealElement && sameVnode(oldVnode, vnode)) {
        patchVnode(oldVnode, vnode, insertedVnodeQueue, null, null, removeOnly);
      } else {
        if (isRealElement) {
          if (oldVnode.nodeType === 1 && oldVnode.hasAttribute(SSR_ATTR)) {
            oldVnode.removeAttribute(SSR_ATTR);
            hydrating = true;
          }
          if (isTrue(hydrating)) {
            if (hydrate(oldVnode, vnode, insertedVnodeQueue)) {
              invokeInsertHook(vnode, insertedVnodeQueue, true);
              return oldVnode;
            }
          }
          oldVnode = emptyNodeAt(oldVnode);
        }
        var oldElm = oldVnode.elm;
        var parentElm = nodeOps2.parentNode(oldElm);
        createElm(vnode, insertedVnodeQueue, oldElm._leaveCb ? null : parentElm, nodeOps2.nextSibling(oldElm));
        if (isDef(vnode.parent)) {
          var ancestor = vnode.parent;
          var patchable = isPatchable(vnode);
          while (ancestor) {
            for (var i2 = 0; i2 < cbs.destroy.length; ++i2) {
              cbs.destroy[i2](ancestor);
            }
            ancestor.elm = vnode.elm;
            if (patchable) {
              for (var i$1 = 0; i$1 < cbs.create.length; ++i$1) {
                cbs.create[i$1](emptyNode, ancestor);
              }
              var insert3 = ancestor.data.hook.insert;
              if (insert3.merged) {
                for (var i$2 = 1; i$2 < insert3.fns.length; i$2++) {
                  insert3.fns[i$2]();
                }
              }
            } else {
              registerRef(ancestor);
            }
            ancestor = ancestor.parent;
          }
        }
        if (isDef(parentElm)) {
          removeVnodes([oldVnode], 0, 0);
        } else if (isDef(oldVnode.tag)) {
          invokeDestroyHook(oldVnode);
        }
      }
    }
    invokeInsertHook(vnode, insertedVnodeQueue, isInitialPatch);
    return vnode.elm;
  };
}
var directives = {
  create: updateDirectives,
  update: updateDirectives,
  destroy: function unbindDirectives(vnode) {
    updateDirectives(vnode, emptyNode);
  }
};
function updateDirectives(oldVnode, vnode) {
  if (oldVnode.data.directives || vnode.data.directives) {
    _update(oldVnode, vnode);
  }
}
function _update(oldVnode, vnode) {
  var isCreate = oldVnode === emptyNode;
  var isDestroy = vnode === emptyNode;
  var oldDirs = normalizeDirectives$1(oldVnode.data.directives, oldVnode.context);
  var newDirs = normalizeDirectives$1(vnode.data.directives, vnode.context);
  var dirsWithInsert = [];
  var dirsWithPostpatch = [];
  var key, oldDir, dir;
  for (key in newDirs) {
    oldDir = oldDirs[key];
    dir = newDirs[key];
    if (!oldDir) {
      callHook$1(dir, "bind", vnode, oldVnode);
      if (dir.def && dir.def.inserted) {
        dirsWithInsert.push(dir);
      }
    } else {
      dir.oldValue = oldDir.value;
      dir.oldArg = oldDir.arg;
      callHook$1(dir, "update", vnode, oldVnode);
      if (dir.def && dir.def.componentUpdated) {
        dirsWithPostpatch.push(dir);
      }
    }
  }
  if (dirsWithInsert.length) {
    var callInsert = function() {
      for (var i = 0; i < dirsWithInsert.length; i++) {
        callHook$1(dirsWithInsert[i], "inserted", vnode, oldVnode);
      }
    };
    if (isCreate) {
      mergeVNodeHook(vnode, "insert", callInsert);
    } else {
      callInsert();
    }
  }
  if (dirsWithPostpatch.length) {
    mergeVNodeHook(vnode, "postpatch", function() {
      for (var i = 0; i < dirsWithPostpatch.length; i++) {
        callHook$1(dirsWithPostpatch[i], "componentUpdated", vnode, oldVnode);
      }
    });
  }
  if (!isCreate) {
    for (key in oldDirs) {
      if (!newDirs[key]) {
        callHook$1(oldDirs[key], "unbind", oldVnode, oldVnode, isDestroy);
      }
    }
  }
}
var emptyModifiers = /* @__PURE__ */ Object.create(null);
function normalizeDirectives$1(dirs, vm) {
  var res = /* @__PURE__ */ Object.create(null);
  if (!dirs) {
    return res;
  }
  var i, dir;
  for (i = 0; i < dirs.length; i++) {
    dir = dirs[i];
    if (!dir.modifiers) {
      dir.modifiers = emptyModifiers;
    }
    res[getRawDirName(dir)] = dir;
    dir.def = resolveAsset(vm.$options, "directives", dir.name);
  }
  return res;
}
function getRawDirName(dir) {
  return dir.rawName || dir.name + "." + Object.keys(dir.modifiers || {}).join(".");
}
function callHook$1(dir, hook, vnode, oldVnode, isDestroy) {
  var fn = dir.def && dir.def[hook];
  if (fn) {
    try {
      fn(vnode.elm, dir, vnode, oldVnode, isDestroy);
    } catch (e) {
      handleError(e, vnode.context, "directive " + dir.name + " " + hook + " hook");
    }
  }
}
var baseModules = [
  ref,
  directives
];
function updateAttrs(oldVnode, vnode) {
  var opts = vnode.componentOptions;
  if (isDef(opts) && opts.Ctor.options.inheritAttrs === false) {
    return;
  }
  if (isUndef(oldVnode.data.attrs) && isUndef(vnode.data.attrs)) {
    return;
  }
  var key, cur, old;
  var elm = vnode.elm;
  var oldAttrs = oldVnode.data.attrs || {};
  var attrs2 = vnode.data.attrs || {};
  if (isDef(attrs2.__ob__)) {
    attrs2 = vnode.data.attrs = extend({}, attrs2);
  }
  for (key in attrs2) {
    cur = attrs2[key];
    old = oldAttrs[key];
    if (old !== cur) {
      setAttr(elm, key, cur, vnode.data.pre);
    }
  }
  if ((isIE || isEdge) && attrs2.value !== oldAttrs.value) {
    setAttr(elm, "value", attrs2.value);
  }
  for (key in oldAttrs) {
    if (isUndef(attrs2[key])) {
      if (isXlink(key)) {
        elm.removeAttributeNS(xlinkNS, getXlinkProp(key));
      } else if (!isEnumeratedAttr(key)) {
        elm.removeAttribute(key);
      }
    }
  }
}
function setAttr(el, key, value, isInPre) {
  if (isInPre || el.tagName.indexOf("-") > -1) {
    baseSetAttr(el, key, value);
  } else if (isBooleanAttr(key)) {
    if (isFalsyAttrValue(value)) {
      el.removeAttribute(key);
    } else {
      value = key === "allowfullscreen" && el.tagName === "EMBED" ? "true" : key;
      el.setAttribute(key, value);
    }
  } else if (isEnumeratedAttr(key)) {
    el.setAttribute(key, convertEnumeratedValue(key, value));
  } else if (isXlink(key)) {
    if (isFalsyAttrValue(value)) {
      el.removeAttributeNS(xlinkNS, getXlinkProp(key));
    } else {
      el.setAttributeNS(xlinkNS, key, value);
    }
  } else {
    baseSetAttr(el, key, value);
  }
}
function baseSetAttr(el, key, value) {
  if (isFalsyAttrValue(value)) {
    el.removeAttribute(key);
  } else {
    if (isIE && !isIE9 && el.tagName === "TEXTAREA" && key === "placeholder" && value !== "" && !el.__ieph) {
      var blocker = function(e) {
        e.stopImmediatePropagation();
        el.removeEventListener("input", blocker);
      };
      el.addEventListener("input", blocker);
      el.__ieph = true;
    }
    el.setAttribute(key, value);
  }
}
var attrs = {
  create: updateAttrs,
  update: updateAttrs
};
function updateClass(oldVnode, vnode) {
  var el = vnode.elm;
  var data = vnode.data;
  var oldData = oldVnode.data;
  if (isUndef(data.staticClass) && isUndef(data.class) && (isUndef(oldData) || isUndef(oldData.staticClass) && isUndef(oldData.class))) {
    return;
  }
  var cls = genClassForVnode(vnode);
  var transitionClass = el._transitionClasses;
  if (isDef(transitionClass)) {
    cls = concat(cls, stringifyClass(transitionClass));
  }
  if (cls !== el._prevClass) {
    el.setAttribute("class", cls);
    el._prevClass = cls;
  }
}
var klass = {
  create: updateClass,
  update: updateClass
};
var RANGE_TOKEN = "__r";
var CHECKBOX_RADIO_TOKEN = "__c";
function normalizeEvents(on) {
  if (isDef(on[RANGE_TOKEN])) {
    var event = isIE ? "change" : "input";
    on[event] = [].concat(on[RANGE_TOKEN], on[event] || []);
    delete on[RANGE_TOKEN];
  }
  if (isDef(on[CHECKBOX_RADIO_TOKEN])) {
    on.change = [].concat(on[CHECKBOX_RADIO_TOKEN], on.change || []);
    delete on[CHECKBOX_RADIO_TOKEN];
  }
}
var target$1;
function createOnceHandler$1(event, handler, capture) {
  var _target = target$1;
  return function onceHandler() {
    var res = handler.apply(null, arguments);
    if (res !== null) {
      remove$2(event, onceHandler, capture, _target);
    }
  };
}
var useMicrotaskFix = isUsingMicroTask && !(isFF && Number(isFF[1]) <= 53);
function add$1(name, handler, capture, passive) {
  if (useMicrotaskFix) {
    var attachedTimestamp = currentFlushTimestamp;
    var original = handler;
    handler = original._wrapper = function(e) {
      if (e.target === e.currentTarget || e.timeStamp >= attachedTimestamp || e.timeStamp <= 0 || e.target.ownerDocument !== document) {
        return original.apply(this, arguments);
      }
    };
  }
  target$1.addEventListener(name, handler, supportsPassive ? { capture, passive } : capture);
}
function remove$2(name, handler, capture, _target) {
  (_target || target$1).removeEventListener(name, handler._wrapper || handler, capture);
}
function updateDOMListeners(oldVnode, vnode) {
  if (isUndef(oldVnode.data.on) && isUndef(vnode.data.on)) {
    return;
  }
  var on = vnode.data.on || {};
  var oldOn = oldVnode.data.on || {};
  target$1 = vnode.elm;
  normalizeEvents(on);
  updateListeners(on, oldOn, add$1, remove$2, createOnceHandler$1, vnode.context);
  target$1 = void 0;
}
var events = {
  create: updateDOMListeners,
  update: updateDOMListeners
};
var svgContainer;
function updateDOMProps(oldVnode, vnode) {
  if (isUndef(oldVnode.data.domProps) && isUndef(vnode.data.domProps)) {
    return;
  }
  var key, cur;
  var elm = vnode.elm;
  var oldProps = oldVnode.data.domProps || {};
  var props2 = vnode.data.domProps || {};
  if (isDef(props2.__ob__)) {
    props2 = vnode.data.domProps = extend({}, props2);
  }
  for (key in oldProps) {
    if (!(key in props2)) {
      elm[key] = "";
    }
  }
  for (key in props2) {
    cur = props2[key];
    if (key === "textContent" || key === "innerHTML") {
      if (vnode.children) {
        vnode.children.length = 0;
      }
      if (cur === oldProps[key]) {
        continue;
      }
      if (elm.childNodes.length === 1) {
        elm.removeChild(elm.childNodes[0]);
      }
    }
    if (key === "value" && elm.tagName !== "PROGRESS") {
      elm._value = cur;
      var strCur = isUndef(cur) ? "" : String(cur);
      if (shouldUpdateValue(elm, strCur)) {
        elm.value = strCur;
      }
    } else if (key === "innerHTML" && isSVG(elm.tagName) && isUndef(elm.innerHTML)) {
      svgContainer = svgContainer || document.createElement("div");
      svgContainer.innerHTML = "<svg>" + cur + "</svg>";
      var svg = svgContainer.firstChild;
      while (elm.firstChild) {
        elm.removeChild(elm.firstChild);
      }
      while (svg.firstChild) {
        elm.appendChild(svg.firstChild);
      }
    } else if (cur !== oldProps[key]) {
      try {
        elm[key] = cur;
      } catch (e) {
      }
    }
  }
}
function shouldUpdateValue(elm, checkVal) {
  return !elm.composing && (elm.tagName === "OPTION" || isNotInFocusAndDirty(elm, checkVal) || isDirtyWithModifiers(elm, checkVal));
}
function isNotInFocusAndDirty(elm, checkVal) {
  var notInFocus = true;
  try {
    notInFocus = document.activeElement !== elm;
  } catch (e) {
  }
  return notInFocus && elm.value !== checkVal;
}
function isDirtyWithModifiers(elm, newVal) {
  var value = elm.value;
  var modifiers = elm._vModifiers;
  if (isDef(modifiers)) {
    if (modifiers.number) {
      return toNumber(value) !== toNumber(newVal);
    }
    if (modifiers.trim) {
      return value.trim() !== newVal.trim();
    }
  }
  return value !== newVal;
}
var domProps = {
  create: updateDOMProps,
  update: updateDOMProps
};
var parseStyleText = cached(function(cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function(item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res;
});
function normalizeStyleData(data) {
  var style2 = normalizeStyleBinding(data.style);
  return data.staticStyle ? extend(data.staticStyle, style2) : style2;
}
function normalizeStyleBinding(bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle);
  }
  if (typeof bindingStyle === "string") {
    return parseStyleText(bindingStyle);
  }
  return bindingStyle;
}
function getStyle(vnode, checkChild) {
  var res = {};
  var styleData;
  if (checkChild) {
    var childNode = vnode;
    while (childNode.componentInstance) {
      childNode = childNode.componentInstance._vnode;
      if (childNode && childNode.data && (styleData = normalizeStyleData(childNode.data))) {
        extend(res, styleData);
      }
    }
  }
  if (styleData = normalizeStyleData(vnode.data)) {
    extend(res, styleData);
  }
  var parentNode2 = vnode;
  while (parentNode2 = parentNode2.parent) {
    if (parentNode2.data && (styleData = normalizeStyleData(parentNode2.data))) {
      extend(res, styleData);
    }
  }
  return res;
}
var cssVarRE = /^--/;
var importantRE = /\s*!important$/;
var setProp = function(el, name, val) {
  if (cssVarRE.test(name)) {
    el.style.setProperty(name, val);
  } else if (importantRE.test(val)) {
    el.style.setProperty(hyphenate(name), val.replace(importantRE, ""), "important");
  } else {
    var normalizedName = normalize(name);
    if (Array.isArray(val)) {
      for (var i = 0, len = val.length; i < len; i++) {
        el.style[normalizedName] = val[i];
      }
    } else {
      el.style[normalizedName] = val;
    }
  }
};
var vendorNames = ["Webkit", "Moz", "ms"];
var emptyStyle;
var normalize = cached(function(prop) {
  emptyStyle = emptyStyle || document.createElement("div").style;
  prop = camelize$1(prop);
  if (prop !== "filter" && prop in emptyStyle) {
    return prop;
  }
  var capName = prop.charAt(0).toUpperCase() + prop.slice(1);
  for (var i = 0; i < vendorNames.length; i++) {
    var name = vendorNames[i] + capName;
    if (name in emptyStyle) {
      return name;
    }
  }
});
function updateStyle(oldVnode, vnode) {
  var data = vnode.data;
  var oldData = oldVnode.data;
  if (isUndef(data.staticStyle) && isUndef(data.style) && isUndef(oldData.staticStyle) && isUndef(oldData.style)) {
    return;
  }
  var cur, name;
  var el = vnode.elm;
  var oldStaticStyle = oldData.staticStyle;
  var oldStyleBinding = oldData.normalizedStyle || oldData.style || {};
  var oldStyle = oldStaticStyle || oldStyleBinding;
  var style2 = normalizeStyleBinding(vnode.data.style) || {};
  vnode.data.normalizedStyle = isDef(style2.__ob__) ? extend({}, style2) : style2;
  var newStyle = getStyle(vnode, true);
  for (name in oldStyle) {
    if (isUndef(newStyle[name])) {
      setProp(el, name, "");
    }
  }
  for (name in newStyle) {
    cur = newStyle[name];
    if (cur !== oldStyle[name]) {
      setProp(el, name, cur == null ? "" : cur);
    }
  }
}
var style = {
  create: updateStyle,
  update: updateStyle
};
var whitespaceRE = /\s+/;
function addClass(el, cls) {
  if (!cls || !(cls = cls.trim())) {
    return;
  }
  if (el.classList) {
    if (cls.indexOf(" ") > -1) {
      cls.split(whitespaceRE).forEach(function(c) {
        return el.classList.add(c);
      });
    } else {
      el.classList.add(cls);
    }
  } else {
    var cur = " " + (el.getAttribute("class") || "") + " ";
    if (cur.indexOf(" " + cls + " ") < 0) {
      el.setAttribute("class", (cur + cls).trim());
    }
  }
}
function removeClass(el, cls) {
  if (!cls || !(cls = cls.trim())) {
    return;
  }
  if (el.classList) {
    if (cls.indexOf(" ") > -1) {
      cls.split(whitespaceRE).forEach(function(c) {
        return el.classList.remove(c);
      });
    } else {
      el.classList.remove(cls);
    }
    if (!el.classList.length) {
      el.removeAttribute("class");
    }
  } else {
    var cur = " " + (el.getAttribute("class") || "") + " ";
    var tar = " " + cls + " ";
    while (cur.indexOf(tar) >= 0) {
      cur = cur.replace(tar, " ");
    }
    cur = cur.trim();
    if (cur) {
      el.setAttribute("class", cur);
    } else {
      el.removeAttribute("class");
    }
  }
}
function resolveTransition(def$$1) {
  if (!def$$1) {
    return;
  }
  if (typeof def$$1 === "object") {
    var res = {};
    if (def$$1.css !== false) {
      extend(res, autoCssTransition(def$$1.name || "v"));
    }
    extend(res, def$$1);
    return res;
  } else if (typeof def$$1 === "string") {
    return autoCssTransition(def$$1);
  }
}
var autoCssTransition = cached(function(name) {
  return {
    enterClass: name + "-enter",
    enterToClass: name + "-enter-to",
    enterActiveClass: name + "-enter-active",
    leaveClass: name + "-leave",
    leaveToClass: name + "-leave-to",
    leaveActiveClass: name + "-leave-active"
  };
});
var hasTransition = inBrowser && !isIE9;
var TRANSITION = "transition";
var ANIMATION = "animation";
var transitionProp = "transition";
var transitionEndEvent = "transitionend";
var animationProp = "animation";
var animationEndEvent = "animationend";
if (hasTransition) {
  if (window.ontransitionend === void 0 && window.onwebkittransitionend !== void 0) {
    transitionProp = "WebkitTransition";
    transitionEndEvent = "webkitTransitionEnd";
  }
  if (window.onanimationend === void 0 && window.onwebkitanimationend !== void 0) {
    animationProp = "WebkitAnimation";
    animationEndEvent = "webkitAnimationEnd";
  }
}
var raf = inBrowser ? window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : setTimeout : function(fn) {
  return fn();
};
function nextFrame(fn) {
  raf(function() {
    raf(fn);
  });
}
function addTransitionClass(el, cls) {
  var transitionClasses = el._transitionClasses || (el._transitionClasses = []);
  if (transitionClasses.indexOf(cls) < 0) {
    transitionClasses.push(cls);
    addClass(el, cls);
  }
}
function removeTransitionClass(el, cls) {
  if (el._transitionClasses) {
    remove(el._transitionClasses, cls);
  }
  removeClass(el, cls);
}
function whenTransitionEnds(el, expectedType, cb) {
  var ref2 = getTransitionInfo(el, expectedType);
  var type2 = ref2.type;
  var timeout = ref2.timeout;
  var propCount = ref2.propCount;
  if (!type2) {
    return cb();
  }
  var event = type2 === TRANSITION ? transitionEndEvent : animationEndEvent;
  var ended = 0;
  var end = function() {
    el.removeEventListener(event, onEnd);
    cb();
  };
  var onEnd = function(e) {
    if (e.target === el) {
      if (++ended >= propCount) {
        end();
      }
    }
  };
  setTimeout(function() {
    if (ended < propCount) {
      end();
    }
  }, timeout + 1);
  el.addEventListener(event, onEnd);
}
var transformRE = /\b(transform|all)(,|$)/;
function getTransitionInfo(el, expectedType) {
  var styles = window.getComputedStyle(el);
  var transitionDelays = (styles[transitionProp + "Delay"] || "").split(", ");
  var transitionDurations = (styles[transitionProp + "Duration"] || "").split(", ");
  var transitionTimeout = getTimeout(transitionDelays, transitionDurations);
  var animationDelays = (styles[animationProp + "Delay"] || "").split(", ");
  var animationDurations = (styles[animationProp + "Duration"] || "").split(", ");
  var animationTimeout = getTimeout(animationDelays, animationDurations);
  var type2;
  var timeout = 0;
  var propCount = 0;
  if (expectedType === TRANSITION) {
    if (transitionTimeout > 0) {
      type2 = TRANSITION;
      timeout = transitionTimeout;
      propCount = transitionDurations.length;
    }
  } else if (expectedType === ANIMATION) {
    if (animationTimeout > 0) {
      type2 = ANIMATION;
      timeout = animationTimeout;
      propCount = animationDurations.length;
    }
  } else {
    timeout = Math.max(transitionTimeout, animationTimeout);
    type2 = timeout > 0 ? transitionTimeout > animationTimeout ? TRANSITION : ANIMATION : null;
    propCount = type2 ? type2 === TRANSITION ? transitionDurations.length : animationDurations.length : 0;
  }
  var hasTransform = type2 === TRANSITION && transformRE.test(styles[transitionProp + "Property"]);
  return {
    type: type2,
    timeout,
    propCount,
    hasTransform
  };
}
function getTimeout(delays, durations) {
  while (delays.length < durations.length) {
    delays = delays.concat(delays);
  }
  return Math.max.apply(null, durations.map(function(d, i) {
    return toMs(d) + toMs(delays[i]);
  }));
}
function toMs(s) {
  return Number(s.slice(0, -1).replace(",", ".")) * 1e3;
}
function enter(vnode, toggleDisplay) {
  var el = vnode.elm;
  if (isDef(el._leaveCb)) {
    el._leaveCb.cancelled = true;
    el._leaveCb();
  }
  var data = resolveTransition(vnode.data.transition);
  if (isUndef(data)) {
    return;
  }
  if (isDef(el._enterCb) || el.nodeType !== 1) {
    return;
  }
  var css = data.css;
  var type2 = data.type;
  var enterClass = data.enterClass;
  var enterToClass = data.enterToClass;
  var enterActiveClass = data.enterActiveClass;
  var appearClass = data.appearClass;
  var appearToClass = data.appearToClass;
  var appearActiveClass = data.appearActiveClass;
  var beforeEnter = data.beforeEnter;
  var enter2 = data.enter;
  var afterEnter = data.afterEnter;
  var enterCancelled = data.enterCancelled;
  var beforeAppear = data.beforeAppear;
  var appear = data.appear;
  var afterAppear = data.afterAppear;
  var appearCancelled = data.appearCancelled;
  var duration = data.duration;
  var context = activeInstance;
  var transitionNode = activeInstance.$vnode;
  while (transitionNode && transitionNode.parent) {
    context = transitionNode.context;
    transitionNode = transitionNode.parent;
  }
  var isAppear = !context._isMounted || !vnode.isRootInsert;
  if (isAppear && !appear && appear !== "") {
    return;
  }
  var startClass = isAppear && appearClass ? appearClass : enterClass;
  var activeClass = isAppear && appearActiveClass ? appearActiveClass : enterActiveClass;
  var toClass = isAppear && appearToClass ? appearToClass : enterToClass;
  var beforeEnterHook = isAppear ? beforeAppear || beforeEnter : beforeEnter;
  var enterHook = isAppear ? typeof appear === "function" ? appear : enter2 : enter2;
  var afterEnterHook = isAppear ? afterAppear || afterEnter : afterEnter;
  var enterCancelledHook = isAppear ? appearCancelled || enterCancelled : enterCancelled;
  var explicitEnterDuration = toNumber(isObject$1(duration) ? duration.enter : duration);
  var expectsCSS = css !== false && !isIE9;
  var userWantsControl = getHookArgumentsLength(enterHook);
  var cb = el._enterCb = once(function() {
    if (expectsCSS) {
      removeTransitionClass(el, toClass);
      removeTransitionClass(el, activeClass);
    }
    if (cb.cancelled) {
      if (expectsCSS) {
        removeTransitionClass(el, startClass);
      }
      enterCancelledHook && enterCancelledHook(el);
    } else {
      afterEnterHook && afterEnterHook(el);
    }
    el._enterCb = null;
  });
  if (!vnode.data.show) {
    mergeVNodeHook(vnode, "insert", function() {
      var parent = el.parentNode;
      var pendingNode = parent && parent._pending && parent._pending[vnode.key];
      if (pendingNode && pendingNode.tag === vnode.tag && pendingNode.elm._leaveCb) {
        pendingNode.elm._leaveCb();
      }
      enterHook && enterHook(el, cb);
    });
  }
  beforeEnterHook && beforeEnterHook(el);
  if (expectsCSS) {
    addTransitionClass(el, startClass);
    addTransitionClass(el, activeClass);
    nextFrame(function() {
      removeTransitionClass(el, startClass);
      if (!cb.cancelled) {
        addTransitionClass(el, toClass);
        if (!userWantsControl) {
          if (isValidDuration(explicitEnterDuration)) {
            setTimeout(cb, explicitEnterDuration);
          } else {
            whenTransitionEnds(el, type2, cb);
          }
        }
      }
    });
  }
  if (vnode.data.show) {
    toggleDisplay && toggleDisplay();
    enterHook && enterHook(el, cb);
  }
  if (!expectsCSS && !userWantsControl) {
    cb();
  }
}
function leave(vnode, rm) {
  var el = vnode.elm;
  if (isDef(el._enterCb)) {
    el._enterCb.cancelled = true;
    el._enterCb();
  }
  var data = resolveTransition(vnode.data.transition);
  if (isUndef(data) || el.nodeType !== 1) {
    return rm();
  }
  if (isDef(el._leaveCb)) {
    return;
  }
  var css = data.css;
  var type2 = data.type;
  var leaveClass = data.leaveClass;
  var leaveToClass = data.leaveToClass;
  var leaveActiveClass = data.leaveActiveClass;
  var beforeLeave = data.beforeLeave;
  var leave2 = data.leave;
  var afterLeave = data.afterLeave;
  var leaveCancelled = data.leaveCancelled;
  var delayLeave = data.delayLeave;
  var duration = data.duration;
  var expectsCSS = css !== false && !isIE9;
  var userWantsControl = getHookArgumentsLength(leave2);
  var explicitLeaveDuration = toNumber(isObject$1(duration) ? duration.leave : duration);
  var cb = el._leaveCb = once(function() {
    if (el.parentNode && el.parentNode._pending) {
      el.parentNode._pending[vnode.key] = null;
    }
    if (expectsCSS) {
      removeTransitionClass(el, leaveToClass);
      removeTransitionClass(el, leaveActiveClass);
    }
    if (cb.cancelled) {
      if (expectsCSS) {
        removeTransitionClass(el, leaveClass);
      }
      leaveCancelled && leaveCancelled(el);
    } else {
      rm();
      afterLeave && afterLeave(el);
    }
    el._leaveCb = null;
  });
  if (delayLeave) {
    delayLeave(performLeave);
  } else {
    performLeave();
  }
  function performLeave() {
    if (cb.cancelled) {
      return;
    }
    if (!vnode.data.show && el.parentNode) {
      (el.parentNode._pending || (el.parentNode._pending = {}))[vnode.key] = vnode;
    }
    beforeLeave && beforeLeave(el);
    if (expectsCSS) {
      addTransitionClass(el, leaveClass);
      addTransitionClass(el, leaveActiveClass);
      nextFrame(function() {
        removeTransitionClass(el, leaveClass);
        if (!cb.cancelled) {
          addTransitionClass(el, leaveToClass);
          if (!userWantsControl) {
            if (isValidDuration(explicitLeaveDuration)) {
              setTimeout(cb, explicitLeaveDuration);
            } else {
              whenTransitionEnds(el, type2, cb);
            }
          }
        }
      });
    }
    leave2 && leave2(el, cb);
    if (!expectsCSS && !userWantsControl) {
      cb();
    }
  }
}
function isValidDuration(val) {
  return typeof val === "number" && !isNaN(val);
}
function getHookArgumentsLength(fn) {
  if (isUndef(fn)) {
    return false;
  }
  var invokerFns = fn.fns;
  if (isDef(invokerFns)) {
    return getHookArgumentsLength(Array.isArray(invokerFns) ? invokerFns[0] : invokerFns);
  } else {
    return (fn._length || fn.length) > 1;
  }
}
function _enter(_, vnode) {
  if (vnode.data.show !== true) {
    enter(vnode);
  }
}
var transition = inBrowser ? {
  create: _enter,
  activate: _enter,
  remove: function remove$$1(vnode, rm) {
    if (vnode.data.show !== true) {
      leave(vnode, rm);
    } else {
      rm();
    }
  }
} : {};
var platformModules = [
  attrs,
  klass,
  events,
  domProps,
  style,
  transition
];
var modules = platformModules.concat(baseModules);
var patch = createPatchFunction({ nodeOps, modules });
if (isIE9) {
  document.addEventListener("selectionchange", function() {
    var el = document.activeElement;
    if (el && el.vmodel) {
      trigger(el, "input");
    }
  });
}
var directive$2 = {
  inserted: function inserted(el, binding, vnode, oldVnode) {
    if (vnode.tag === "select") {
      if (oldVnode.elm && !oldVnode.elm._vOptions) {
        mergeVNodeHook(vnode, "postpatch", function() {
          directive$2.componentUpdated(el, binding, vnode);
        });
      } else {
        setSelected(el, binding, vnode.context);
      }
      el._vOptions = [].map.call(el.options, getValue);
    } else if (vnode.tag === "textarea" || isTextInputType(el.type)) {
      el._vModifiers = binding.modifiers;
      if (!binding.modifiers.lazy) {
        el.addEventListener("compositionstart", onCompositionStart);
        el.addEventListener("compositionend", onCompositionEnd);
        el.addEventListener("change", onCompositionEnd);
        if (isIE9) {
          el.vmodel = true;
        }
      }
    }
  },
  componentUpdated: function componentUpdated(el, binding, vnode) {
    if (vnode.tag === "select") {
      setSelected(el, binding, vnode.context);
      var prevOptions = el._vOptions;
      var curOptions = el._vOptions = [].map.call(el.options, getValue);
      if (curOptions.some(function(o, i) {
        return !looseEqual(o, prevOptions[i]);
      })) {
        var needReset = el.multiple ? binding.value.some(function(v) {
          return hasNoMatchingOption(v, curOptions);
        }) : binding.value !== binding.oldValue && hasNoMatchingOption(binding.value, curOptions);
        if (needReset) {
          trigger(el, "change");
        }
      }
    }
  }
};
function setSelected(el, binding, vm) {
  actuallySetSelected(el, binding);
  if (isIE || isEdge) {
    setTimeout(function() {
      actuallySetSelected(el, binding);
    }, 0);
  }
}
function actuallySetSelected(el, binding, vm) {
  var value = binding.value;
  var isMultiple = el.multiple;
  if (isMultiple && !Array.isArray(value)) {
    return;
  }
  var selected, option;
  for (var i = 0, l = el.options.length; i < l; i++) {
    option = el.options[i];
    if (isMultiple) {
      selected = looseIndexOf(value, getValue(option)) > -1;
      if (option.selected !== selected) {
        option.selected = selected;
      }
    } else {
      if (looseEqual(getValue(option), value)) {
        if (el.selectedIndex !== i) {
          el.selectedIndex = i;
        }
        return;
      }
    }
  }
  if (!isMultiple) {
    el.selectedIndex = -1;
  }
}
function hasNoMatchingOption(value, options) {
  return options.every(function(o) {
    return !looseEqual(o, value);
  });
}
function getValue(option) {
  return "_value" in option ? option._value : option.value;
}
function onCompositionStart(e) {
  e.target.composing = true;
}
function onCompositionEnd(e) {
  if (!e.target.composing) {
    return;
  }
  e.target.composing = false;
  trigger(e.target, "input");
}
function trigger(el, type2) {
  var e = document.createEvent("HTMLEvents");
  e.initEvent(type2, true, true);
  el.dispatchEvent(e);
}
function locateNode(vnode) {
  return vnode.componentInstance && (!vnode.data || !vnode.data.transition) ? locateNode(vnode.componentInstance._vnode) : vnode;
}
var show = {
  bind: function bind2(el, ref2, vnode) {
    var value = ref2.value;
    vnode = locateNode(vnode);
    var transition$$1 = vnode.data && vnode.data.transition;
    var originalDisplay = el.__vOriginalDisplay = el.style.display === "none" ? "" : el.style.display;
    if (value && transition$$1) {
      vnode.data.show = true;
      enter(vnode, function() {
        el.style.display = originalDisplay;
      });
    } else {
      el.style.display = value ? originalDisplay : "none";
    }
  },
  update: function update3(el, ref2, vnode) {
    var value = ref2.value;
    var oldValue = ref2.oldValue;
    if (!value === !oldValue) {
      return;
    }
    vnode = locateNode(vnode);
    var transition$$1 = vnode.data && vnode.data.transition;
    if (transition$$1) {
      vnode.data.show = true;
      if (value) {
        enter(vnode, function() {
          el.style.display = el.__vOriginalDisplay;
        });
      } else {
        leave(vnode, function() {
          el.style.display = "none";
        });
      }
    } else {
      el.style.display = value ? el.__vOriginalDisplay : "none";
    }
  },
  unbind: function unbind(el, binding, vnode, oldVnode, isDestroy) {
    if (!isDestroy) {
      el.style.display = el.__vOriginalDisplay;
    }
  }
};
var platformDirectives = {
  model: directive$2,
  show
};
var transitionProps = {
  name: String,
  appear: Boolean,
  css: Boolean,
  mode: String,
  type: String,
  enterClass: String,
  leaveClass: String,
  enterToClass: String,
  leaveToClass: String,
  enterActiveClass: String,
  leaveActiveClass: String,
  appearClass: String,
  appearActiveClass: String,
  appearToClass: String,
  duration: [Number, String, Object]
};
function getRealChild(vnode) {
  var compOptions = vnode && vnode.componentOptions;
  if (compOptions && compOptions.Ctor.options.abstract) {
    return getRealChild(getFirstComponentChild(compOptions.children));
  } else {
    return vnode;
  }
}
function extractTransitionData(comp) {
  var data = {};
  var options = comp.$options;
  for (var key in options.propsData) {
    data[key] = comp[key];
  }
  var listeners = options._parentListeners;
  for (var key$1 in listeners) {
    data[camelize$1(key$1)] = listeners[key$1];
  }
  return data;
}
function placeholder(h, rawChild) {
  if (/\d-keep-alive$/.test(rawChild.tag)) {
    return h("keep-alive", {
      props: rawChild.componentOptions.propsData
    });
  }
}
function hasParentTransition(vnode) {
  while (vnode = vnode.parent) {
    if (vnode.data.transition) {
      return true;
    }
  }
}
function isSameChild(child, oldChild) {
  return oldChild.key === child.key && oldChild.tag === child.tag;
}
var isNotTextNode = function(c) {
  return c.tag || isAsyncPlaceholder(c);
};
var isVShowDirective = function(d) {
  return d.name === "show";
};
var Transition = {
  name: "transition",
  props: transitionProps,
  abstract: true,
  render: function render2(h) {
    var this$1$1 = this;
    var children = this.$slots.default;
    if (!children) {
      return;
    }
    children = children.filter(isNotTextNode);
    if (!children.length) {
      return;
    }
    var mode = this.mode;
    var rawChild = children[0];
    if (hasParentTransition(this.$vnode)) {
      return rawChild;
    }
    var child = getRealChild(rawChild);
    if (!child) {
      return rawChild;
    }
    if (this._leaving) {
      return placeholder(h, rawChild);
    }
    var id = "__transition-" + this._uid + "-";
    child.key = child.key == null ? child.isComment ? id + "comment" : id + child.tag : isPrimitive(child.key) ? String(child.key).indexOf(id) === 0 ? child.key : id + child.key : child.key;
    var data = (child.data || (child.data = {})).transition = extractTransitionData(this);
    var oldRawChild = this._vnode;
    var oldChild = getRealChild(oldRawChild);
    if (child.data.directives && child.data.directives.some(isVShowDirective)) {
      child.data.show = true;
    }
    if (oldChild && oldChild.data && !isSameChild(child, oldChild) && !isAsyncPlaceholder(oldChild) && !(oldChild.componentInstance && oldChild.componentInstance._vnode.isComment)) {
      var oldData = oldChild.data.transition = extend({}, data);
      if (mode === "out-in") {
        this._leaving = true;
        mergeVNodeHook(oldData, "afterLeave", function() {
          this$1$1._leaving = false;
          this$1$1.$forceUpdate();
        });
        return placeholder(h, rawChild);
      } else if (mode === "in-out") {
        if (isAsyncPlaceholder(child)) {
          return oldRawChild;
        }
        var delayedLeave;
        var performLeave = function() {
          delayedLeave();
        };
        mergeVNodeHook(data, "afterEnter", performLeave);
        mergeVNodeHook(data, "enterCancelled", performLeave);
        mergeVNodeHook(oldData, "delayLeave", function(leave2) {
          delayedLeave = leave2;
        });
      }
    }
    return rawChild;
  }
};
var props = extend({
  tag: String,
  moveClass: String
}, transitionProps);
delete props.mode;
var TransitionGroup = {
  props,
  beforeMount: function beforeMount() {
    var this$1$1 = this;
    var update5 = this._update;
    this._update = function(vnode, hydrating) {
      var restoreActiveInstance = setActiveInstance(this$1$1);
      this$1$1.__patch__(this$1$1._vnode, this$1$1.kept, false, true);
      this$1$1._vnode = this$1$1.kept;
      restoreActiveInstance();
      update5.call(this$1$1, vnode, hydrating);
    };
  },
  render: function render3(h) {
    var tag = this.tag || this.$vnode.data.tag || "span";
    var map = /* @__PURE__ */ Object.create(null);
    var prevChildren = this.prevChildren = this.children;
    var rawChildren = this.$slots.default || [];
    var children = this.children = [];
    var transitionData = extractTransitionData(this);
    for (var i = 0; i < rawChildren.length; i++) {
      var c = rawChildren[i];
      if (c.tag) {
        if (c.key != null && String(c.key).indexOf("__vlist") !== 0) {
          children.push(c);
          map[c.key] = c;
          (c.data || (c.data = {})).transition = transitionData;
        }
      }
    }
    if (prevChildren) {
      var kept = [];
      var removed2 = [];
      for (var i$1 = 0; i$1 < prevChildren.length; i$1++) {
        var c$1 = prevChildren[i$1];
        c$1.data.transition = transitionData;
        c$1.data.pos = c$1.elm.getBoundingClientRect();
        if (map[c$1.key]) {
          kept.push(c$1);
        } else {
          removed2.push(c$1);
        }
      }
      this.kept = h(tag, null, kept);
      this.removed = removed2;
    }
    return h(tag, null, children);
  },
  updated: function updated2() {
    var children = this.prevChildren;
    var moveClass = this.moveClass || (this.name || "v") + "-move";
    if (!children.length || !this.hasMove(children[0].elm, moveClass)) {
      return;
    }
    children.forEach(callPendingCbs);
    children.forEach(recordPosition);
    children.forEach(applyTranslation);
    this._reflow = document.body.offsetHeight;
    children.forEach(function(c) {
      if (c.data.moved) {
        var el = c.elm;
        var s = el.style;
        addTransitionClass(el, moveClass);
        s.transform = s.WebkitTransform = s.transitionDuration = "";
        el.addEventListener(transitionEndEvent, el._moveCb = function cb(e) {
          if (e && e.target !== el) {
            return;
          }
          if (!e || /transform$/.test(e.propertyName)) {
            el.removeEventListener(transitionEndEvent, cb);
            el._moveCb = null;
            removeTransitionClass(el, moveClass);
          }
        });
      }
    });
  },
  methods: {
    hasMove: function hasMove(el, moveClass) {
      if (!hasTransition) {
        return false;
      }
      if (this._hasMove) {
        return this._hasMove;
      }
      var clone = el.cloneNode();
      if (el._transitionClasses) {
        el._transitionClasses.forEach(function(cls) {
          removeClass(clone, cls);
        });
      }
      addClass(clone, moveClass);
      clone.style.display = "none";
      this.$el.appendChild(clone);
      var info = getTransitionInfo(clone);
      this.$el.removeChild(clone);
      return this._hasMove = info.hasTransform;
    }
  }
};
function callPendingCbs(c) {
  if (c.elm._moveCb) {
    c.elm._moveCb();
  }
  if (c.elm._enterCb) {
    c.elm._enterCb();
  }
}
function recordPosition(c) {
  c.data.newPos = c.elm.getBoundingClientRect();
}
function applyTranslation(c) {
  var oldPos = c.data.pos;
  var newPos = c.data.newPos;
  var dx = oldPos.left - newPos.left;
  var dy = oldPos.top - newPos.top;
  if (dx || dy) {
    c.data.moved = true;
    var s = c.elm.style;
    s.transform = s.WebkitTransform = "translate(" + dx + "px," + dy + "px)";
    s.transitionDuration = "0s";
  }
}
var platformComponents = {
  Transition,
  TransitionGroup
};
Vue.config.mustUseProp = mustUseProp;
Vue.config.isReservedTag = isReservedTag;
Vue.config.isReservedAttr = isReservedAttr;
Vue.config.getTagNamespace = getTagNamespace;
Vue.config.isUnknownElement = isUnknownElement;
extend(Vue.options.directives, platformDirectives);
extend(Vue.options.components, platformComponents);
Vue.prototype.__patch__ = inBrowser ? patch : noop;
Vue.prototype.$mount = function(el, hydrating) {
  el = el && inBrowser ? query(el) : void 0;
  return mountComponent(this, el, hydrating);
};
if (inBrowser) {
  setTimeout(function() {
    if (config.devtools) {
      if (devtools) {
        devtools.emit("init", Vue);
      }
    }
  }, 0);
}
const Themeable = Vue.extend().extend({
  name: "themeable",
  provide() {
    return {
      theme: this.themeableProvide
    };
  },
  inject: {
    theme: {
      default: {
        isDark: false
      }
    }
  },
  props: {
    dark: {
      type: Boolean,
      default: null
    },
    light: {
      type: Boolean,
      default: null
    }
  },
  data() {
    return {
      themeableProvide: {
        isDark: false
      }
    };
  },
  computed: {
    appIsDark() {
      return this.$vuetify.theme.dark || false;
    },
    isDark() {
      if (this.dark === true) {
        return true;
      } else if (this.light === true) {
        return false;
      } else {
        return this.theme.isDark;
      }
    },
    themeClasses() {
      return {
        "theme--dark": this.isDark,
        "theme--light": !this.isDark
      };
    },
    rootIsDark() {
      if (this.dark === true) {
        return true;
      } else if (this.light === true) {
        return false;
      } else {
        return this.appIsDark;
      }
    },
    rootThemeClasses() {
      return {
        "theme--dark": this.rootIsDark,
        "theme--light": !this.rootIsDark
      };
    }
  },
  watch: {
    isDark: {
      handler(newVal, oldVal) {
        if (newVal !== oldVal) {
          this.themeableProvide.isDark = this.isDark;
        }
      },
      immediate: true
    }
  }
});
var Themeable$1 = Themeable;
function mixins(...args) {
  return Vue.extend({
    mixins: args
  });
}
var VSheet$1 = "";
function makeWatcher(property) {
  return function(val, oldVal) {
    for (const attr in oldVal) {
      if (!Object.prototype.hasOwnProperty.call(val, attr)) {
        this.$delete(this.$data[property], attr);
      }
    }
    for (const attr in val) {
      this.$set(this.$data[property], attr, val[attr]);
    }
  };
}
var BindsAttrs = Vue.extend({
  data: () => ({
    attrs$: {},
    listeners$: {}
  }),
  created() {
    this.$watch("$attrs", makeWatcher("attrs$"), {
      immediate: true
    });
    this.$watch("$listeners", makeWatcher("listeners$"), {
      immediate: true
    });
  }
});
function install(Vue$1, args = {}) {
  if (install.installed)
    return;
  install.installed = true;
  if (Vue !== Vue$1) {
    consoleError(`Multiple instances of Vue detected
See https://github.com/vuetifyjs/vuetify/issues/4068

If you're seeing "$attrs is readonly", it's caused by this`);
  }
  const components = args.components || {};
  const directives2 = args.directives || {};
  for (const name in directives2) {
    const directive2 = directives2[name];
    Vue$1.directive(name, directive2);
  }
  (function registerComponents(components2) {
    if (components2) {
      for (const key in components2) {
        const component = components2[key];
        if (component && !registerComponents(component.$_vuetify_subcomponents)) {
          Vue$1.component(key, component);
        }
      }
      return true;
    }
    return false;
  })(components);
  if (Vue$1.$_vuetify_installed)
    return;
  Vue$1.$_vuetify_installed = true;
  Vue$1.mixin({
    beforeCreate() {
      const options = this.$options;
      if (options.vuetify) {
        options.vuetify.init(this, this.$ssrContext);
        this.$vuetify = Vue$1.observable(options.vuetify.framework);
      } else {
        this.$vuetify = options.parent && options.parent.$vuetify || this;
      }
    },
    beforeMount() {
      if (this.$options.vuetify && this.$el && this.$el.hasAttribute("data-server-rendered")) {
        this.$vuetify.isHydrating = true;
        this.$vuetify.breakpoint.update(true);
      }
    },
    mounted() {
      if (this.$options.vuetify && this.$vuetify.isHydrating) {
        this.$vuetify.isHydrating = false;
        this.$vuetify.breakpoint.update();
      }
    }
  });
}
class Service {
  constructor() {
    this.framework = {};
  }
  init(root, ssrContext) {
  }
}
class Application extends Service {
  constructor() {
    super(...arguments);
    this.bar = 0;
    this.top = 0;
    this.left = 0;
    this.insetFooter = 0;
    this.right = 0;
    this.bottom = 0;
    this.footer = 0;
    this.application = {
      bar: {},
      top: {},
      left: {},
      insetFooter: {},
      right: {},
      bottom: {},
      footer: {}
    };
  }
  register(uid2, location, size) {
    this.application[location] = {
      [uid2]: size
    };
    this.update(location);
  }
  unregister(uid2, location) {
    if (this.application[location][uid2] == null)
      return;
    delete this.application[location][uid2];
    this.update(location);
  }
  update(location) {
    this[location] = Object.values(this.application[location]).reduce((acc, cur) => acc + cur, 0);
  }
}
Application.property = "application";
class Breakpoint extends Service {
  constructor(preset2) {
    super();
    this.xs = false;
    this.sm = false;
    this.md = false;
    this.lg = false;
    this.xl = false;
    this.xsOnly = false;
    this.smOnly = false;
    this.smAndDown = false;
    this.smAndUp = false;
    this.mdOnly = false;
    this.mdAndDown = false;
    this.mdAndUp = false;
    this.lgOnly = false;
    this.lgAndDown = false;
    this.lgAndUp = false;
    this.xlOnly = false;
    this.name = "xs";
    this.height = 0;
    this.width = 0;
    this.mobile = true;
    this.resizeTimeout = 0;
    const {
      mobileBreakpoint,
      scrollBarWidth,
      thresholds
    } = preset2[Breakpoint.property];
    this.mobileBreakpoint = mobileBreakpoint;
    this.scrollBarWidth = scrollBarWidth;
    this.thresholds = thresholds;
  }
  init() {
    this.update();
    if (typeof window === "undefined")
      return;
    window.addEventListener("resize", this.onResize.bind(this), {
      passive: true
    });
  }
  update(ssr = false) {
    const height = ssr ? 0 : this.getClientHeight();
    const width = ssr ? 0 : this.getClientWidth();
    const xs = width < this.thresholds.xs;
    const sm = width < this.thresholds.sm && !xs;
    const md2 = width < this.thresholds.md - this.scrollBarWidth && !(sm || xs);
    const lg = width < this.thresholds.lg - this.scrollBarWidth && !(md2 || sm || xs);
    const xl = width >= this.thresholds.lg - this.scrollBarWidth;
    this.height = height;
    this.width = width;
    this.xs = xs;
    this.sm = sm;
    this.md = md2;
    this.lg = lg;
    this.xl = xl;
    this.xsOnly = xs;
    this.smOnly = sm;
    this.smAndDown = (xs || sm) && !(md2 || lg || xl);
    this.smAndUp = !xs && (sm || md2 || lg || xl);
    this.mdOnly = md2;
    this.mdAndDown = (xs || sm || md2) && !(lg || xl);
    this.mdAndUp = !(xs || sm) && (md2 || lg || xl);
    this.lgOnly = lg;
    this.lgAndDown = (xs || sm || md2 || lg) && !xl;
    this.lgAndUp = !(xs || sm || md2) && (lg || xl);
    this.xlOnly = xl;
    switch (true) {
      case xs:
        this.name = "xs";
        break;
      case sm:
        this.name = "sm";
        break;
      case md2:
        this.name = "md";
        break;
      case lg:
        this.name = "lg";
        break;
      default:
        this.name = "xl";
        break;
    }
    if (typeof this.mobileBreakpoint === "number") {
      this.mobile = width < parseInt(this.mobileBreakpoint, 10);
      return;
    }
    const breakpoints2 = {
      xs: 0,
      sm: 1,
      md: 2,
      lg: 3,
      xl: 4
    };
    const current = breakpoints2[this.name];
    const max = breakpoints2[this.mobileBreakpoint];
    this.mobile = current <= max;
  }
  onResize() {
    clearTimeout(this.resizeTimeout);
    this.resizeTimeout = window.setTimeout(this.update.bind(this), 200);
  }
  getClientWidth() {
    if (typeof document === "undefined")
      return 0;
    return Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
  }
  getClientHeight() {
    if (typeof document === "undefined")
      return 0;
    return Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
  }
}
Breakpoint.property = "breakpoint";
const linear = (t) => t;
const easeInQuad = (t) => t ** 2;
const easeOutQuad = (t) => t * (2 - t);
const easeInOutQuad = (t) => t < 0.5 ? 2 * t ** 2 : -1 + (4 - 2 * t) * t;
const easeInCubic = (t) => t ** 3;
const easeOutCubic = (t) => --t ** 3 + 1;
const easeInOutCubic = (t) => t < 0.5 ? 4 * t ** 3 : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
const easeInQuart = (t) => t ** 4;
const easeOutQuart = (t) => 1 - --t ** 4;
const easeInOutQuart = (t) => t < 0.5 ? 8 * t * t * t * t : 1 - 8 * --t * t * t * t;
const easeInQuint = (t) => t ** 5;
const easeOutQuint = (t) => 1 + --t ** 5;
const easeInOutQuint = (t) => t < 0.5 ? 16 * t ** 5 : 1 + 16 * --t ** 5;
var easingPatterns = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  linear,
  easeInQuad,
  easeOutQuad,
  easeInOutQuad,
  easeInCubic,
  easeOutCubic,
  easeInOutCubic,
  easeInQuart,
  easeOutQuart,
  easeInOutQuart,
  easeInQuint,
  easeOutQuint,
  easeInOutQuint
}, Symbol.toStringTag, { value: "Module" }));
function getOffset(target2) {
  if (typeof target2 === "number") {
    return target2;
  }
  let el = $(target2);
  if (!el) {
    throw typeof target2 === "string" ? new Error(`Target element "${target2}" not found.`) : new TypeError(`Target must be a Number/Selector/HTMLElement/VueComponent, received ${type(target2)} instead.`);
  }
  let totalOffset = 0;
  while (el) {
    totalOffset += el.offsetTop;
    el = el.offsetParent;
  }
  return totalOffset;
}
function getContainer(container) {
  const el = $(container);
  if (el)
    return el;
  throw typeof container === "string" ? new Error(`Container element "${container}" not found.`) : new TypeError(`Container must be a Selector/HTMLElement/VueComponent, received ${type(container)} instead.`);
}
function type(el) {
  return el == null ? el : el.constructor.name;
}
function $(el) {
  if (typeof el === "string") {
    return document.querySelector(el);
  } else if (el && el._isVue) {
    return el.$el;
  } else if (el instanceof HTMLElement) {
    return el;
  } else {
    return null;
  }
}
function goTo(_target, _settings = {}) {
  const settings = __spreadValues({
    container: document.scrollingElement || document.body || document.documentElement,
    duration: 500,
    offset: 0,
    easing: "easeInOutCubic",
    appOffset: true
  }, _settings);
  const container = getContainer(settings.container);
  if (settings.appOffset && goTo.framework.application) {
    const isDrawer = container.classList.contains("v-navigation-drawer");
    const isClipped = container.classList.contains("v-navigation-drawer--clipped");
    const {
      bar,
      top
    } = goTo.framework.application;
    settings.offset += bar;
    if (!isDrawer || isClipped)
      settings.offset += top;
  }
  const startTime = performance.now();
  let targetLocation;
  if (typeof _target === "number") {
    targetLocation = getOffset(_target) - settings.offset;
  } else {
    targetLocation = getOffset(_target) - getOffset(container) - settings.offset;
  }
  const startLocation = container.scrollTop;
  if (targetLocation === startLocation)
    return Promise.resolve(targetLocation);
  const ease = typeof settings.easing === "function" ? settings.easing : easingPatterns[settings.easing];
  if (!ease)
    throw new TypeError(`Easing function "${settings.easing}" not found.`);
  return new Promise((resolve) => requestAnimationFrame(function step(currentTime) {
    const timeElapsed = currentTime - startTime;
    const progress = Math.abs(settings.duration ? Math.min(timeElapsed / settings.duration, 1) : 1);
    container.scrollTop = Math.floor(startLocation + (targetLocation - startLocation) * ease(progress));
    const clientHeight = container === document.body ? document.documentElement.clientHeight : container.clientHeight;
    if (progress === 1 || clientHeight + container.scrollTop === container.scrollHeight) {
      return resolve(targetLocation);
    }
    requestAnimationFrame(step);
  }));
}
goTo.framework = {};
goTo.init = () => {
};
class Goto extends Service {
  constructor() {
    super();
    return goTo;
  }
}
Goto.property = "goTo";
function addOnceEventListener(el, eventName, cb, options = false) {
  var once2 = (event) => {
    cb(event);
    el.removeEventListener(eventName, once2, options);
  };
  el.addEventListener(eventName, once2, options);
}
let passiveSupported = false;
try {
  if (typeof window !== "undefined") {
    const testListenerOpts = Object.defineProperty({}, "passive", {
      get: () => {
        passiveSupported = true;
      }
    });
    window.addEventListener("testListener", testListenerOpts, testListenerOpts);
    window.removeEventListener("testListener", testListenerOpts, testListenerOpts);
  }
} catch (e) {
  console.warn(e);
}
function addPassiveEventListener(el, event, cb, options) {
  el.addEventListener(event, cb, passiveSupported ? options : false);
}
function getNestedValue(obj, path, fallback2) {
  const last = path.length - 1;
  if (last < 0)
    return obj === void 0 ? fallback2 : obj;
  for (let i = 0; i < last; i++) {
    if (obj == null) {
      return fallback2;
    }
    obj = obj[path[i]];
  }
  if (obj == null)
    return fallback2;
  return obj[path[last]] === void 0 ? fallback2 : obj[path[last]];
}
function getObjectValueByPath(obj, path, fallback2) {
  if (obj == null || !path || typeof path !== "string")
    return fallback2;
  if (obj[path] !== void 0)
    return obj[path];
  path = path.replace(/\[(\w+)\]/g, ".$1");
  path = path.replace(/^\./, "");
  return getNestedValue(obj, path.split("."), fallback2);
}
function getZIndex(el) {
  if (!el || el.nodeType !== Node.ELEMENT_NODE)
    return 0;
  const index2 = +window.getComputedStyle(el).getPropertyValue("z-index");
  if (!index2)
    return getZIndex(el.parentNode);
  return index2;
}
function filterObjectOnKeys(obj, keys2) {
  const filtered = {};
  for (let i = 0; i < keys2.length; i++) {
    const key = keys2[i];
    if (typeof obj[key] !== "undefined") {
      filtered[key] = obj[key];
    }
  }
  return filtered;
}
function convertToUnit(str, unit = "px") {
  if (str == null || str === "") {
    return void 0;
  } else if (isNaN(+str)) {
    return String(str);
  } else {
    return `${Number(str)}${unit}`;
  }
}
function isObject(obj) {
  return obj !== null && typeof obj === "object";
}
const keyCodes = Object.freeze({
  enter: 13,
  tab: 9,
  delete: 46,
  esc: 27,
  space: 32,
  up: 38,
  down: 40,
  left: 37,
  right: 39,
  end: 35,
  home: 36,
  del: 46,
  backspace: 8,
  insert: 45,
  pageup: 33,
  pagedown: 34
});
function remapInternalIcon(vm, iconName) {
  const component = vm.$vuetify.icons.component;
  if (iconName.startsWith("$")) {
    const iconPath = `$vuetify.icons.values.${iconName.split("$").pop().split(".").pop()}`;
    const override = getObjectValueByPath(vm, iconPath, iconName);
    if (typeof override === "string")
      iconName = override;
    else
      return override;
  }
  if (component == null) {
    return iconName;
  }
  return {
    component,
    props: {
      icon: iconName
    }
  };
}
function keys(o) {
  return Object.keys(o);
}
const camelizeRE = /-(\w)/g;
const camelize = (str) => {
  return str.replace(camelizeRE, (_, c) => c ? c.toUpperCase() : "");
};
function upperFirst(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
function wrapInArray(v) {
  return v != null ? Array.isArray(v) ? v : [v] : [];
}
function getSlotType(vm, name, split) {
  if (vm.$slots[name] && vm.$scopedSlots[name] && vm.$scopedSlots[name].name) {
    return split ? "v-slot" : "scoped";
  }
  if (vm.$slots[name])
    return "normal";
  if (vm.$scopedSlots[name])
    return "scoped";
}
function getSlot(vm, name = "default", data, optional = false) {
  if (vm.$scopedSlots[name]) {
    return vm.$scopedSlots[name](data instanceof Function ? data() : data);
  } else if (vm.$slots[name] && (!data || optional)) {
    return vm.$slots[name];
  }
  return void 0;
}
function clamp(value, min = 0, max = 1) {
  return Math.max(min, Math.min(max, value));
}
function mergeDeep(source = {}, target2 = {}) {
  for (const key in target2) {
    const sourceProperty = source[key];
    const targetProperty = target2[key];
    if (isObject(sourceProperty) && isObject(targetProperty)) {
      source[key] = mergeDeep(sourceProperty, targetProperty);
      continue;
    }
    source[key] = targetProperty;
  }
  return source;
}
const icons$4 = {
  complete: "M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z",
  cancel: "M12,2C17.53,2 22,6.47 22,12C22,17.53 17.53,22 12,22C6.47,22 2,17.53 2,12C2,6.47 6.47,2 12,2M15.59,7L12,10.59L8.41,7L7,8.41L10.59,12L7,15.59L8.41,17L12,13.41L15.59,17L17,15.59L13.41,12L17,8.41L15.59,7Z",
  close: "M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z",
  delete: "M12,2C17.53,2 22,6.47 22,12C22,17.53 17.53,22 12,22C6.47,22 2,17.53 2,12C2,6.47 6.47,2 12,2M15.59,7L12,10.59L8.41,7L7,8.41L10.59,12L7,15.59L8.41,17L12,13.41L15.59,17L17,15.59L13.41,12L17,8.41L15.59,7Z",
  clear: "M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z",
  success: "M12,2C17.52,2 22,6.48 22,12C22,17.52 17.52,22 12,22C6.48,22 2,17.52 2,12C2,6.48 6.48,2 12,2M11,16.5L18,9.5L16.59,8.09L11,13.67L7.91,10.59L6.5,12L11,16.5Z",
  info: "M13,9H11V7H13M13,17H11V11H13M12,2C6.48,2 2,6.48 2,12C2,17.52 6.48,22 12,22C17.52,22 22,17.52 22,12C22,6.48 17.52,2 12,2Z",
  warning: "M11,4.5H13V15.5H11V4.5M13,17.5V19.5H11V17.5H13Z",
  error: "M13,14H11V10H13M13,18H11V16H13M1,21H23L12,2L1,21Z",
  prev: "M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z",
  next: "M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z",
  checkboxOn: "M10,17L5,12L6.41,10.58L10,14.17L17.59,6.58L19,8M19,3H5C3.89,3 3,3.89 3,5V19C3,20.1 3.9,21 5,21H19C20.1,21 21,20.1 21,19V5C21,3.89 20.1,3 19,3Z",
  checkboxOff: "M19,3H5C3.89,3 3,3.89 3,5V19C3,20.1 3.9,21 5,21H19C20.1,21 21,20.1 21,19V5C21,3.89 20.1,3 19,3M19,5V19H5V5H19Z",
  checkboxIndeterminate: "M17,13H7V11H17M19,3H5C3.89,3 3,3.89 3,5V19C3,20.1 3.9,21 5,21H19C20.1,21 21,20.1 21,19V5C21,3.89 20.1,3 19,3Z",
  delimiter: "M12,2C6.48,2 2,6.48 2,12C2,17.52 6.48,22 12,22C17.52,22 22,17.52 22,12C22,6.48 17.52,2 12,2Z",
  sort: "M13,20H11V8L5.5,13.5L4.08,12.08L12,4.16L19.92,12.08L18.5,13.5L13,8V20Z",
  expand: "M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z",
  menu: "M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z",
  subgroup: "M7,10L12,15L17,10H7Z",
  dropdown: "M7,10L12,15L17,10H7Z",
  radioOn: "M12,20C7.58,20 4,16.42 4,12C4,7.58 7.58,4 12,4C16.42,4 20,7.58 20,12C20,16.42 16.42,20 12,20M12,2C6.48,2 2,6.48 2,12C2,17.52 6.48,22 12,22C17.52,22 22,17.52 22,12C22,6.48 17.52,2 12,2M12,7C9.24,7 7,9.24 7,12C7,14.76 9.24,17 12,17C14.76,17 17,14.76 17,12C17,9.24 14.76,7 12,7Z",
  radioOff: "M12,20C7.58,20 4,16.42 4,12C4,7.58 7.58,4 12,4C16.42,4 20,7.58 20,12C20,16.42 16.42,20 12,20M12,2C6.48,2 2,6.48 2,12C2,17.52 6.48,22 12,22C17.52,22 22,17.52 22,12C22,6.48 17.52,2 12,2Z",
  edit: "M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z",
  ratingEmpty: "M12,15.39L8.24,17.66L9.23,13.38L5.91,10.5L10.29,10.13L12,6.09L13.71,10.13L18.09,10.5L14.77,13.38L15.76,17.66M22,9.24L14.81,8.63L12,2L9.19,8.63L2,9.24L7.45,13.97L5.82,21L12,17.27L18.18,21L16.54,13.97L22,9.24Z",
  ratingFull: "M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z",
  ratingHalf: "M12,15.4V6.1L13.71,10.13L18.09,10.5L14.77,13.39L15.76,17.67M22,9.24L14.81,8.63L12,2L9.19,8.63L2,9.24L7.45,13.97L5.82,21L12,17.27L18.18,21L16.54,13.97L22,9.24Z",
  loading: "M19,8L15,12H18C18,15.31 15.31,18 12,18C11,18 10.03,17.75 9.2,17.3L7.74,18.76C8.97,19.54 10.43,20 12,20C16.42,20 20,16.42 20,12H23M6,12C6,8.69 8.69,6 12,6C13,6 13.97,6.25 14.8,6.7L16.26,5.24C15.03,4.46 13.57,4 12,4C7.58,4 4,7.58 4,12H1L5,16L9,12",
  first: "M18.41,16.59L13.82,12L18.41,7.41L17,6L11,12L17,18L18.41,16.59M6,6H8V18H6V6Z",
  last: "M5.59,7.41L10.18,12L5.59,16.59L7,18L13,12L7,6L5.59,7.41M16,6H18V18H16V6Z",
  unfold: "M12,18.17L8.83,15L7.42,16.41L12,21L16.59,16.41L15.17,15M12,5.83L15.17,9L16.58,7.59L12,3L7.41,7.59L8.83,9L12,5.83Z",
  file: "M16.5,6V17.5C16.5,19.71 14.71,21.5 12.5,21.5C10.29,21.5 8.5,19.71 8.5,17.5V5C8.5,3.62 9.62,2.5 11,2.5C12.38,2.5 13.5,3.62 13.5,5V15.5C13.5,16.05 13.05,16.5 12.5,16.5C11.95,16.5 11.5,16.05 11.5,15.5V6H10V15.5C10,16.88 11.12,18 12.5,18C13.88,18 15,16.88 15,15.5V5C15,2.79 13.21,1 11,1C8.79,1 7,2.79 7,5V17.5C7,20.54 9.46,23 12.5,23C15.54,23 18,20.54 18,17.5V6H16.5Z",
  plus: "M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z",
  minus: "M19,13H5V11H19V13Z"
};
var mdiSvg = icons$4;
const icons$3 = {
  complete: "check",
  cancel: "cancel",
  close: "close",
  delete: "cancel",
  clear: "clear",
  success: "check_circle",
  info: "info",
  warning: "priority_high",
  error: "warning",
  prev: "chevron_left",
  next: "chevron_right",
  checkboxOn: "check_box",
  checkboxOff: "check_box_outline_blank",
  checkboxIndeterminate: "indeterminate_check_box",
  delimiter: "fiber_manual_record",
  sort: "arrow_upward",
  expand: "keyboard_arrow_down",
  menu: "menu",
  subgroup: "arrow_drop_down",
  dropdown: "arrow_drop_down",
  radioOn: "radio_button_checked",
  radioOff: "radio_button_unchecked",
  edit: "edit",
  ratingEmpty: "star_border",
  ratingFull: "star",
  ratingHalf: "star_half",
  loading: "cached",
  first: "first_page",
  last: "last_page",
  unfold: "unfold_more",
  file: "attach_file",
  plus: "add",
  minus: "remove"
};
var md = icons$3;
const icons$2 = {
  complete: "mdi-check",
  cancel: "mdi-close-circle",
  close: "mdi-close",
  delete: "mdi-close-circle",
  clear: "mdi-close",
  success: "mdi-check-circle",
  info: "mdi-information",
  warning: "mdi-exclamation",
  error: "mdi-alert",
  prev: "mdi-chevron-left",
  next: "mdi-chevron-right",
  checkboxOn: "mdi-checkbox-marked",
  checkboxOff: "mdi-checkbox-blank-outline",
  checkboxIndeterminate: "mdi-minus-box",
  delimiter: "mdi-circle",
  sort: "mdi-arrow-up",
  expand: "mdi-chevron-down",
  menu: "mdi-menu",
  subgroup: "mdi-menu-down",
  dropdown: "mdi-menu-down",
  radioOn: "mdi-radiobox-marked",
  radioOff: "mdi-radiobox-blank",
  edit: "mdi-pencil",
  ratingEmpty: "mdi-star-outline",
  ratingFull: "mdi-star",
  ratingHalf: "mdi-star-half-full",
  loading: "mdi-cached",
  first: "mdi-page-first",
  last: "mdi-page-last",
  unfold: "mdi-unfold-more-horizontal",
  file: "mdi-paperclip",
  plus: "mdi-plus",
  minus: "mdi-minus"
};
var mdi = icons$2;
const icons$1 = {
  complete: "fas fa-check",
  cancel: "fas fa-times-circle",
  close: "fas fa-times",
  delete: "fas fa-times-circle",
  clear: "fas fa-times-circle",
  success: "fas fa-check-circle",
  info: "fas fa-info-circle",
  warning: "fas fa-exclamation",
  error: "fas fa-exclamation-triangle",
  prev: "fas fa-chevron-left",
  next: "fas fa-chevron-right",
  checkboxOn: "fas fa-check-square",
  checkboxOff: "far fa-square",
  checkboxIndeterminate: "fas fa-minus-square",
  delimiter: "fas fa-circle",
  sort: "fas fa-sort-up",
  expand: "fas fa-chevron-down",
  menu: "fas fa-bars",
  subgroup: "fas fa-caret-down",
  dropdown: "fas fa-caret-down",
  radioOn: "far fa-dot-circle",
  radioOff: "far fa-circle",
  edit: "fas fa-edit",
  ratingEmpty: "far fa-star",
  ratingFull: "fas fa-star",
  ratingHalf: "fas fa-star-half",
  loading: "fas fa-sync",
  first: "fas fa-step-backward",
  last: "fas fa-step-forward",
  unfold: "fas fa-arrows-alt-v",
  file: "fas fa-paperclip",
  plus: "fas fa-plus",
  minus: "fas fa-minus"
};
var fa = icons$1;
const icons = {
  complete: "fa fa-check",
  cancel: "fa fa-times-circle",
  close: "fa fa-times",
  delete: "fa fa-times-circle",
  clear: "fa fa-times-circle",
  success: "fa fa-check-circle",
  info: "fa fa-info-circle",
  warning: "fa fa-exclamation",
  error: "fa fa-exclamation-triangle",
  prev: "fa fa-chevron-left",
  next: "fa fa-chevron-right",
  checkboxOn: "fa fa-check-square",
  checkboxOff: "fa fa-square-o",
  checkboxIndeterminate: "fa fa-minus-square",
  delimiter: "fa fa-circle",
  sort: "fa fa-sort-up",
  expand: "fa fa-chevron-down",
  menu: "fa fa-bars",
  subgroup: "fa fa-caret-down",
  dropdown: "fa fa-caret-down",
  radioOn: "fa fa-dot-circle-o",
  radioOff: "fa fa-circle-o",
  edit: "fa fa-pencil",
  ratingEmpty: "fa fa-star-o",
  ratingFull: "fa fa-star",
  ratingHalf: "fa fa-star-half-o",
  loading: "fa fa-refresh",
  first: "fa fa-step-backward",
  last: "fa fa-step-forward",
  unfold: "fa fa-angle-double-down",
  file: "fa fa-paperclip",
  plus: "fa fa-plus",
  minus: "fa fa-minus"
};
var fa4 = icons;
function convertToComponentDeclarations(component, iconSet) {
  const result = {};
  for (const key in iconSet) {
    result[key] = {
      component,
      props: {
        icon: iconSet[key].split(" fa-")
      }
    };
  }
  return result;
}
var faSvg = convertToComponentDeclarations("font-awesome-icon", fa);
var presets = Object.freeze({
  mdiSvg,
  md,
  mdi,
  fa,
  fa4,
  faSvg
});
class Icons extends Service {
  constructor(preset2) {
    super();
    const {
      iconfont,
      values,
      component
    } = preset2[Icons.property];
    this.component = component;
    this.iconfont = iconfont;
    this.values = mergeDeep(presets[iconfont], values);
  }
}
Icons.property = "icons";
const LANG_PREFIX = "$vuetify.";
const fallback = Symbol("Lang fallback");
function getTranslation(locale, key, usingDefault = false, defaultLocale) {
  const shortKey = key.replace(LANG_PREFIX, "");
  let translation = getObjectValueByPath(locale, shortKey, fallback);
  if (translation === fallback) {
    if (usingDefault) {
      consoleError(`Translation key "${shortKey}" not found in fallback`);
      translation = key;
    } else {
      consoleWarn(`Translation key "${shortKey}" not found, falling back to default`);
      translation = getTranslation(defaultLocale, key, true, defaultLocale);
    }
  }
  return translation;
}
class Lang extends Service {
  constructor(preset2) {
    super();
    this.defaultLocale = "en";
    const {
      current,
      locales,
      t
    } = preset2[Lang.property];
    this.current = current;
    this.locales = locales;
    this.translator = t || this.defaultTranslator;
  }
  currentLocale(key) {
    const translation = this.locales[this.current];
    const defaultLocale = this.locales[this.defaultLocale];
    return getTranslation(translation, key, false, defaultLocale);
  }
  t(key, ...params) {
    if (!key.startsWith(LANG_PREFIX))
      return this.replace(key, params);
    return this.translator(key, ...params);
  }
  defaultTranslator(key, ...params) {
    return this.replace(this.currentLocale(key), params);
  }
  replace(str, params) {
    return str.replace(/\{(\d+)\}/g, (match, index2) => {
      return String(params[+index2]);
    });
  }
}
Lang.property = "lang";
var main = "";
var en = {
  badge: "Badge",
  close: "Close",
  dataIterator: {
    noResultsText: "No matching records found",
    loadingText: "Loading items..."
  },
  dataTable: {
    itemsPerPageText: "Rows per page:",
    ariaLabel: {
      sortDescending: "Sorted descending.",
      sortAscending: "Sorted ascending.",
      sortNone: "Not sorted.",
      activateNone: "Activate to remove sorting.",
      activateDescending: "Activate to sort descending.",
      activateAscending: "Activate to sort ascending."
    },
    sortBy: "Sort by"
  },
  dataFooter: {
    itemsPerPageText: "Items per page:",
    itemsPerPageAll: "All",
    nextPage: "Next page",
    prevPage: "Previous page",
    firstPage: "First page",
    lastPage: "Last page",
    pageText: "{0}-{1} of {2}"
  },
  datePicker: {
    itemsSelected: "{0} selected",
    nextMonthAriaLabel: "Next month",
    nextYearAriaLabel: "Next year",
    prevMonthAriaLabel: "Previous month",
    prevYearAriaLabel: "Previous year"
  },
  noDataText: "No data available",
  carousel: {
    prev: "Previous visual",
    next: "Next visual",
    ariaLabel: {
      delimiter: "Carousel slide {0} of {1}"
    }
  },
  calendar: {
    moreEvents: "{0} more"
  },
  fileInput: {
    counter: "{0} files",
    counterSize: "{0} files ({1} in total)"
  },
  timePicker: {
    am: "AM",
    pm: "PM"
  },
  pagination: {
    ariaLabel: {
      wrapper: "Pagination Navigation",
      next: "Next page",
      previous: "Previous page",
      page: "Goto Page {0}",
      currentPage: "Current Page, Page {0}"
    }
  },
  rating: {
    ariaLabel: {
      icon: "Rating {0} of {1}"
    }
  }
};
const preset = {
  breakpoint: {
    mobileBreakpoint: 1264,
    scrollBarWidth: 16,
    thresholds: {
      xs: 600,
      sm: 960,
      md: 1280,
      lg: 1920
    }
  },
  icons: {
    iconfont: "mdi",
    values: {}
  },
  lang: {
    current: "en",
    locales: {
      en
    },
    t: void 0
  },
  rtl: false,
  theme: {
    dark: false,
    default: "light",
    disable: false,
    options: {
      cspNonce: void 0,
      customProperties: void 0,
      minifyTheme: void 0,
      themeCache: void 0,
      variations: true
    },
    themes: {
      light: {
        primary: "#1976D2",
        secondary: "#424242",
        accent: "#82B1FF",
        error: "#FF5252",
        info: "#2196F3",
        success: "#4CAF50",
        warning: "#FB8C00"
      },
      dark: {
        primary: "#2196F3",
        secondary: "#424242",
        accent: "#FF4081",
        error: "#FF5252",
        info: "#2196F3",
        success: "#4CAF50",
        warning: "#FB8C00"
      }
    }
  }
};
class Presets extends Service {
  constructor(parentPreset, parent) {
    super();
    const defaultPreset = mergeDeep({}, preset);
    const {
      userPreset
    } = parent;
    const _a = userPreset, {
      preset: globalPreset = {}
    } = _a, preset$1 = __objRest(_a, [
      "preset"
    ]);
    if (globalPreset.preset != null) {
      consoleWarn("Global presets do not support the **preset** option, it can be safely omitted");
    }
    parent.preset = mergeDeep(mergeDeep(defaultPreset, globalPreset), preset$1);
  }
}
Presets.property = "presets";
const srgbForwardMatrix = [[3.2406, -1.5372, -0.4986], [-0.9689, 1.8758, 0.0415], [0.0557, -0.204, 1.057]];
const srgbForwardTransform = (C) => C <= 31308e-7 ? C * 12.92 : 1.055 * C ** (1 / 2.4) - 0.055;
const srgbReverseMatrix = [[0.4124, 0.3576, 0.1805], [0.2126, 0.7152, 0.0722], [0.0193, 0.1192, 0.9505]];
const srgbReverseTransform = (C) => C <= 0.04045 ? C / 12.92 : ((C + 0.055) / 1.055) ** 2.4;
function fromXYZ$1(xyz) {
  const rgb = Array(3);
  const transform2 = srgbForwardTransform;
  const matrix = srgbForwardMatrix;
  for (let i = 0; i < 3; ++i) {
    rgb[i] = Math.round(clamp(transform2(matrix[i][0] * xyz[0] + matrix[i][1] * xyz[1] + matrix[i][2] * xyz[2])) * 255);
  }
  return (rgb[0] << 16) + (rgb[1] << 8) + (rgb[2] << 0);
}
function toXYZ$1(rgb) {
  const xyz = [0, 0, 0];
  const transform2 = srgbReverseTransform;
  const matrix = srgbReverseMatrix;
  const r = transform2((rgb >> 16 & 255) / 255);
  const g = transform2((rgb >> 8 & 255) / 255);
  const b = transform2((rgb >> 0 & 255) / 255);
  for (let i = 0; i < 3; ++i) {
    xyz[i] = matrix[i][0] * r + matrix[i][1] * g + matrix[i][2] * b;
  }
  return xyz;
}
function isCssColor(color) {
  return !!color && !!color.match(/^(#|var\(--|(rgb|hsl)a?\()/);
}
function colorToInt(color) {
  let rgb;
  if (typeof color === "number") {
    rgb = color;
  } else if (typeof color === "string") {
    let c = color[0] === "#" ? color.substring(1) : color;
    if (c.length === 3) {
      c = c.split("").map((char) => char + char).join("");
    }
    if (c.length !== 6) {
      consoleWarn(`'${color}' is not a valid rgb color`);
    }
    rgb = parseInt(c, 16);
  } else {
    throw new TypeError(`Colors can only be numbers or strings, recieved ${color == null ? color : color.constructor.name} instead`);
  }
  if (rgb < 0) {
    consoleWarn(`Colors cannot be negative: '${color}'`);
    rgb = 0;
  } else if (rgb > 16777215 || isNaN(rgb)) {
    consoleWarn(`'${color}' is not a valid rgb color`);
    rgb = 16777215;
  }
  return rgb;
}
function intToHex(color) {
  let hexColor = color.toString(16);
  if (hexColor.length < 6)
    hexColor = "0".repeat(6 - hexColor.length) + hexColor;
  return "#" + hexColor;
}
function colorToHex(color) {
  return intToHex(colorToInt(color));
}
const delta = 0.20689655172413793;
const cielabForwardTransform = (t) => t > delta ** 3 ? Math.cbrt(t) : t / (3 * delta ** 2) + 4 / 29;
const cielabReverseTransform = (t) => t > delta ? t ** 3 : 3 * delta ** 2 * (t - 4 / 29);
function fromXYZ(xyz) {
  const transform2 = cielabForwardTransform;
  const transformedY = transform2(xyz[1]);
  return [116 * transformedY - 16, 500 * (transform2(xyz[0] / 0.95047) - transformedY), 200 * (transformedY - transform2(xyz[2] / 1.08883))];
}
function toXYZ(lab) {
  const transform2 = cielabReverseTransform;
  const Ln = (lab[0] + 16) / 116;
  return [transform2(Ln + lab[1] / 500) * 0.95047, transform2(Ln), transform2(Ln - lab[2] / 200) * 1.08883];
}
function parse(theme, isItem = false, variations = true) {
  const _a = theme, {
    anchor
  } = _a, variant = __objRest(_a, [
    "anchor"
  ]);
  const colors = Object.keys(variant);
  const parsedTheme = {};
  for (let i = 0; i < colors.length; ++i) {
    const name = colors[i];
    const value = theme[name];
    if (value == null)
      continue;
    if (!variations) {
      parsedTheme[name] = {
        base: intToHex(colorToInt(value))
      };
    } else if (isItem) {
      if (name === "base" || name.startsWith("lighten") || name.startsWith("darken")) {
        parsedTheme[name] = colorToHex(value);
      }
    } else if (typeof value === "object") {
      parsedTheme[name] = parse(value, true, variations);
    } else {
      parsedTheme[name] = genVariations(name, colorToInt(value));
    }
  }
  if (!isItem) {
    parsedTheme.anchor = anchor || parsedTheme.base || parsedTheme.primary.base;
  }
  return parsedTheme;
}
const genBaseColor = (name, value) => {
  return `
.v-application .${name} {
  background-color: ${value} !important;
  border-color: ${value} !important;
}
.v-application .${name}--text {
  color: ${value} !important;
  caret-color: ${value} !important;
}`;
};
const genVariantColor = (name, variant, value) => {
  const [type2, n] = variant.split(/(\d)/, 2);
  return `
.v-application .${name}.${type2}-${n} {
  background-color: ${value} !important;
  border-color: ${value} !important;
}
.v-application .${name}--text.text--${type2}-${n} {
  color: ${value} !important;
  caret-color: ${value} !important;
}`;
};
const genColorVariableName = (name, variant = "base") => `--v-${name}-${variant}`;
const genColorVariable = (name, variant = "base") => `var(${genColorVariableName(name, variant)})`;
function genStyles(theme, cssVar = false) {
  const _a = theme, {
    anchor
  } = _a, variant = __objRest(_a, [
    "anchor"
  ]);
  const colors = Object.keys(variant);
  if (!colors.length)
    return "";
  let variablesCss = "";
  let css = "";
  const aColor = cssVar ? genColorVariable("anchor") : anchor;
  css += `.v-application a { color: ${aColor}; }`;
  cssVar && (variablesCss += `  ${genColorVariableName("anchor")}: ${anchor};
`);
  for (let i = 0; i < colors.length; ++i) {
    const name = colors[i];
    const value = theme[name];
    css += genBaseColor(name, cssVar ? genColorVariable(name) : value.base);
    cssVar && (variablesCss += `  ${genColorVariableName(name)}: ${value.base};
`);
    const variants = keys(value);
    for (let i2 = 0; i2 < variants.length; ++i2) {
      const variant2 = variants[i2];
      const variantValue = value[variant2];
      if (variant2 === "base")
        continue;
      css += genVariantColor(name, variant2, cssVar ? genColorVariable(name, variant2) : variantValue);
      cssVar && (variablesCss += `  ${genColorVariableName(name, variant2)}: ${variantValue};
`);
    }
  }
  if (cssVar) {
    variablesCss = `:root {
${variablesCss}}

`;
  }
  return variablesCss + css;
}
function genVariations(name, value) {
  const values = {
    base: intToHex(value)
  };
  for (let i = 5; i > 0; --i) {
    values[`lighten${i}`] = intToHex(lighten(value, i));
  }
  for (let i = 1; i <= 4; ++i) {
    values[`darken${i}`] = intToHex(darken(value, i));
  }
  return values;
}
function lighten(value, amount) {
  const lab = fromXYZ(toXYZ$1(value));
  lab[0] = lab[0] + amount * 10;
  return fromXYZ$1(toXYZ(lab));
}
function darken(value, amount) {
  const lab = fromXYZ(toXYZ$1(value));
  lab[0] = lab[0] - amount * 10;
  return fromXYZ$1(toXYZ(lab));
}
class Theme extends Service {
  constructor(preset2) {
    super();
    this.disabled = false;
    this.isDark = null;
    this.unwatch = null;
    this.vueMeta = null;
    const {
      dark,
      disable,
      options,
      themes
    } = preset2[Theme.property];
    this.dark = Boolean(dark);
    this.defaults = this.themes = themes;
    this.options = options;
    if (disable) {
      this.disabled = true;
      return;
    }
    this.themes = {
      dark: this.fillVariant(themes.dark, true),
      light: this.fillVariant(themes.light, false)
    };
  }
  set css(val) {
    if (this.vueMeta) {
      if (this.isVueMeta23) {
        this.applyVueMeta23();
      }
      return;
    }
    this.checkOrCreateStyleElement() && (this.styleEl.innerHTML = val);
  }
  set dark(val) {
    const oldDark = this.isDark;
    this.isDark = val;
    oldDark != null && this.applyTheme();
  }
  get dark() {
    return Boolean(this.isDark);
  }
  applyTheme() {
    if (this.disabled)
      return this.clearCss();
    this.css = this.generatedStyles;
  }
  clearCss() {
    this.css = "";
  }
  init(root, ssrContext) {
    if (this.disabled)
      return;
    if (root.$meta) {
      this.initVueMeta(root);
    } else if (ssrContext) {
      this.initSSR(ssrContext);
    }
    this.initTheme(root);
  }
  setTheme(theme, value) {
    this.themes[theme] = Object.assign(this.themes[theme], value);
    this.applyTheme();
  }
  resetThemes() {
    this.themes.light = Object.assign({}, this.defaults.light);
    this.themes.dark = Object.assign({}, this.defaults.dark);
    this.applyTheme();
  }
  checkOrCreateStyleElement() {
    this.styleEl = document.getElementById("vuetify-theme-stylesheet");
    if (this.styleEl)
      return true;
    this.genStyleElement();
    return Boolean(this.styleEl);
  }
  fillVariant(theme = {}, dark) {
    const defaultTheme = this.themes[dark ? "dark" : "light"];
    return Object.assign({}, defaultTheme, theme);
  }
  genStyleElement() {
    if (typeof document === "undefined")
      return;
    this.styleEl = document.createElement("style");
    this.styleEl.type = "text/css";
    this.styleEl.id = "vuetify-theme-stylesheet";
    if (this.options.cspNonce) {
      this.styleEl.setAttribute("nonce", this.options.cspNonce);
    }
    document.head.appendChild(this.styleEl);
  }
  initVueMeta(root) {
    this.vueMeta = root.$meta();
    if (this.isVueMeta23) {
      root.$nextTick(() => {
        this.applyVueMeta23();
      });
      return;
    }
    const metaKeyName = typeof this.vueMeta.getOptions === "function" ? this.vueMeta.getOptions().keyName : "metaInfo";
    const metaInfo = root.$options[metaKeyName] || {};
    root.$options[metaKeyName] = () => {
      metaInfo.style = metaInfo.style || [];
      const vuetifyStylesheet = metaInfo.style.find((s) => s.id === "vuetify-theme-stylesheet");
      if (!vuetifyStylesheet) {
        metaInfo.style.push({
          cssText: this.generatedStyles,
          type: "text/css",
          id: "vuetify-theme-stylesheet",
          nonce: (this.options || {}).cspNonce
        });
      } else {
        vuetifyStylesheet.cssText = this.generatedStyles;
      }
      return metaInfo;
    };
  }
  applyVueMeta23() {
    const {
      set: set2
    } = this.vueMeta.addApp("vuetify");
    set2({
      style: [{
        cssText: this.generatedStyles,
        type: "text/css",
        id: "vuetify-theme-stylesheet",
        nonce: this.options.cspNonce
      }]
    });
  }
  initSSR(ssrContext) {
    const nonce = this.options.cspNonce ? ` nonce="${this.options.cspNonce}"` : "";
    ssrContext.head = ssrContext.head || "";
    ssrContext.head += `<style type="text/css" id="vuetify-theme-stylesheet"${nonce}>${this.generatedStyles}</style>`;
  }
  initTheme(root) {
    if (typeof document === "undefined")
      return;
    if (this.unwatch) {
      this.unwatch();
      this.unwatch = null;
    }
    root.$once("hook:created", () => {
      const obs = Vue.observable({
        themes: this.themes
      });
      this.unwatch = root.$watch(() => obs.themes, () => this.applyTheme(), {
        deep: true
      });
    });
    this.applyTheme();
  }
  get currentTheme() {
    const target2 = this.dark ? "dark" : "light";
    return this.themes[target2];
  }
  get generatedStyles() {
    const theme = this.parsedTheme;
    const options = this.options || {};
    let css;
    if (options.themeCache != null) {
      css = options.themeCache.get(theme);
      if (css != null)
        return css;
    }
    css = genStyles(theme, options.customProperties);
    if (options.minifyTheme != null) {
      css = options.minifyTheme(css);
    }
    if (options.themeCache != null) {
      options.themeCache.set(theme, css);
    }
    return css;
  }
  get parsedTheme() {
    return parse(this.currentTheme || {}, void 0, getNestedValue(this.options, ["variations"], true));
  }
  get isVueMeta23() {
    return typeof this.vueMeta.addApp === "function";
  }
}
Theme.property = "theme";
class Vuetify {
  constructor(userPreset = {}) {
    this.framework = {
      isHydrating: false
    };
    this.installed = [];
    this.preset = {};
    this.userPreset = {};
    this.userPreset = userPreset;
    this.use(Presets);
    this.use(Application);
    this.use(Breakpoint);
    this.use(Goto);
    this.use(Icons);
    this.use(Lang);
    this.use(Theme);
  }
  init(root, ssrContext) {
    this.installed.forEach((property) => {
      const service = this.framework[property];
      service.framework = this.framework;
      service.init(root, ssrContext);
    });
    this.framework.rtl = Boolean(this.preset.rtl);
  }
  use(Service2) {
    const property = Service2.property;
    if (this.installed.includes(property))
      return;
    this.framework[property] = new Service2(this.preset, this);
    this.installed.push(property);
  }
}
Vuetify.install = install;
Vuetify.installed = false;
Vuetify.version = "2.4.5";
Vuetify.config = {
  silent: false
};
function createMessage(message, vm, parent) {
  if (Vuetify.config.silent)
    return;
  if (parent) {
    vm = {
      _isVue: true,
      $parent: parent,
      $options: vm
    };
  }
  if (vm) {
    vm.$_alreadyWarned = vm.$_alreadyWarned || [];
    if (vm.$_alreadyWarned.includes(message))
      return;
    vm.$_alreadyWarned.push(message);
  }
  return `[Vuetify] ${message}` + (vm ? generateComponentTrace(vm) : "");
}
function consoleWarn(message, vm, parent) {
  const newMessage = createMessage(message, vm, parent);
  newMessage != null && console.warn(newMessage);
}
function consoleError(message, vm, parent) {
  const newMessage = createMessage(message, vm, parent);
  newMessage != null && console.error(newMessage);
}
function breaking(original, replacement, vm, parent) {
  consoleError(`[BREAKING] '${original}' has been removed, use '${replacement}' instead. For more information, see the upgrade guide https://github.com/vuetifyjs/vuetify/releases/tag/v2.0.0#user-content-upgrade-guide`, vm, parent);
}
function removed(original, vm, parent) {
  consoleWarn(`[REMOVED] '${original}' has been removed. You can safely omit it.`, vm, parent);
}
const classifyRE = /(?:^|[-_])(\w)/g;
const classify = (str) => str.replace(classifyRE, (c) => c.toUpperCase()).replace(/[-_]/g, "");
function formatComponentName(vm, includeFile) {
  if (vm.$root === vm) {
    return "<Root>";
  }
  const options = typeof vm === "function" && vm.cid != null ? vm.options : vm._isVue ? vm.$options || vm.constructor.options : vm || {};
  let name = options.name || options._componentTag;
  const file = options.__file;
  if (!name && file) {
    const match = file.match(/([^/\\]+)\.vue$/);
    name = match && match[1];
  }
  return (name ? `<${classify(name)}>` : `<Anonymous>`) + (file && includeFile !== false ? ` at ${file}` : "");
}
function generateComponentTrace(vm) {
  if (vm._isVue && vm.$parent) {
    const tree = [];
    let currentRecursiveSequence = 0;
    while (vm) {
      if (tree.length > 0) {
        const last = tree[tree.length - 1];
        if (last.constructor === vm.constructor) {
          currentRecursiveSequence++;
          vm = vm.$parent;
          continue;
        } else if (currentRecursiveSequence > 0) {
          tree[tree.length - 1] = [last, currentRecursiveSequence];
          currentRecursiveSequence = 0;
        }
      }
      tree.push(vm);
      vm = vm.$parent;
    }
    return "\n\nfound in\n\n" + tree.map((vm2, i) => `${i === 0 ? "---> " : " ".repeat(5 + i * 2)}${Array.isArray(vm2) ? `${formatComponentName(vm2[0])}... (${vm2[1]} recursive calls)` : formatComponentName(vm2)}`).join("\n");
  } else {
    return `

(found in ${formatComponentName(vm)})`;
  }
}
var Colorable = Vue.extend({
  name: "colorable",
  props: {
    color: String
  },
  methods: {
    setBackgroundColor(color, data = {}) {
      if (typeof data.style === "string") {
        consoleError("style must be an object", this);
        return data;
      }
      if (typeof data.class === "string") {
        consoleError("class must be an object", this);
        return data;
      }
      if (isCssColor(color)) {
        data.style = __spreadProps(__spreadValues({}, data.style), {
          "background-color": `${color}`,
          "border-color": `${color}`
        });
      } else if (color) {
        data.class = __spreadProps(__spreadValues({}, data.class), {
          [color]: true
        });
      }
      return data;
    },
    setTextColor(color, data = {}) {
      if (typeof data.style === "string") {
        consoleError("style must be an object", this);
        return data;
      }
      if (typeof data.class === "string") {
        consoleError("class must be an object", this);
        return data;
      }
      if (isCssColor(color)) {
        data.style = __spreadProps(__spreadValues({}, data.style), {
          color: `${color}`,
          "caret-color": `${color}`
        });
      } else if (color) {
        const [colorName, colorModifier] = color.toString().trim().split(" ", 2);
        data.class = __spreadProps(__spreadValues({}, data.class), {
          [colorName + "--text"]: true
        });
        if (colorModifier) {
          data.class["text--" + colorModifier] = true;
        }
      }
      return data;
    }
  }
});
var Elevatable = Vue.extend({
  name: "elevatable",
  props: {
    elevation: [Number, String]
  },
  computed: {
    computedElevation() {
      return this.elevation;
    },
    elevationClasses() {
      const elevation = this.computedElevation;
      if (elevation == null)
        return {};
      if (isNaN(parseInt(elevation)))
        return {};
      return {
        [`elevation-${this.elevation}`]: true
      };
    }
  }
});
var Measurable = Vue.extend({
  name: "measurable",
  props: {
    height: [Number, String],
    maxHeight: [Number, String],
    maxWidth: [Number, String],
    minHeight: [Number, String],
    minWidth: [Number, String],
    width: [Number, String]
  },
  computed: {
    measurableStyles() {
      const styles = {};
      const height = convertToUnit(this.height);
      const minHeight = convertToUnit(this.minHeight);
      const minWidth = convertToUnit(this.minWidth);
      const maxHeight = convertToUnit(this.maxHeight);
      const maxWidth = convertToUnit(this.maxWidth);
      const width = convertToUnit(this.width);
      if (height)
        styles.height = height;
      if (minHeight)
        styles.minHeight = minHeight;
      if (minWidth)
        styles.minWidth = minWidth;
      if (maxHeight)
        styles.maxHeight = maxHeight;
      if (maxWidth)
        styles.maxWidth = maxWidth;
      if (width)
        styles.width = width;
      return styles;
    }
  }
});
var Roundable = Vue.extend({
  name: "roundable",
  props: {
    rounded: [Boolean, String],
    tile: Boolean
  },
  computed: {
    roundedClasses() {
      const composite = [];
      const rounded = typeof this.rounded === "string" ? String(this.rounded) : this.rounded === true;
      if (this.tile) {
        composite.push("rounded-0");
      } else if (typeof rounded === "string") {
        const values = rounded.split(" ");
        for (const value of values) {
          composite.push(`rounded-${value}`);
        }
      } else if (rounded) {
        composite.push("rounded");
      }
      return composite.length > 0 ? {
        [composite.join(" ")]: true
      } : {};
    }
  }
});
var VSheet = mixins(BindsAttrs, Colorable, Elevatable, Measurable, Roundable, Themeable$1).extend({
  name: "v-sheet",
  props: {
    outlined: Boolean,
    shaped: Boolean,
    tag: {
      type: String,
      default: "div"
    }
  },
  computed: {
    classes() {
      return __spreadValues(__spreadValues(__spreadValues({
        "v-sheet": true,
        "v-sheet--outlined": this.outlined,
        "v-sheet--shaped": this.shaped
      }, this.themeClasses), this.elevationClasses), this.roundedClasses);
    },
    styles() {
      return this.measurableStyles;
    }
  },
  render(h) {
    const data = {
      class: this.classes,
      style: this.styles,
      on: this.listeners$
    };
    return h(this.tag, this.setBackgroundColor(this.color, data), this.$slots.default);
  }
});
const pattern = {
  styleList: /;(?![^(]*\))/g,
  styleProp: /:(.*)/
};
function parseStyle(style2) {
  const styleMap = {};
  for (const s of style2.split(pattern.styleList)) {
    let [key, val] = s.split(pattern.styleProp);
    key = key.trim();
    if (!key) {
      continue;
    }
    if (typeof val === "string") {
      val = val.trim();
    }
    styleMap[camelize(key)] = val;
  }
  return styleMap;
}
function mergeData() {
  const mergeTarget = {};
  let i = arguments.length;
  let prop;
  while (i--) {
    for (prop of Object.keys(arguments[i])) {
      switch (prop) {
        case "class":
        case "directives":
          if (arguments[i][prop]) {
            mergeTarget[prop] = mergeClasses(mergeTarget[prop], arguments[i][prop]);
          }
          break;
        case "style":
          if (arguments[i][prop]) {
            mergeTarget[prop] = mergeStyles(mergeTarget[prop], arguments[i][prop]);
          }
          break;
        case "staticClass":
          if (!arguments[i][prop]) {
            break;
          }
          if (mergeTarget[prop] === void 0) {
            mergeTarget[prop] = "";
          }
          if (mergeTarget[prop]) {
            mergeTarget[prop] += " ";
          }
          mergeTarget[prop] += arguments[i][prop].trim();
          break;
        case "on":
        case "nativeOn":
          if (arguments[i][prop]) {
            mergeTarget[prop] = mergeListeners(mergeTarget[prop], arguments[i][prop]);
          }
          break;
        case "attrs":
        case "props":
        case "domProps":
        case "scopedSlots":
        case "staticStyle":
        case "hook":
        case "transition":
          if (!arguments[i][prop]) {
            break;
          }
          if (!mergeTarget[prop]) {
            mergeTarget[prop] = {};
          }
          mergeTarget[prop] = __spreadValues(__spreadValues({}, arguments[i][prop]), mergeTarget[prop]);
          break;
        default:
          if (!mergeTarget[prop]) {
            mergeTarget[prop] = arguments[i][prop];
          }
      }
    }
  }
  return mergeTarget;
}
function mergeStyles(target2, source) {
  if (!target2)
    return source;
  if (!source)
    return target2;
  target2 = wrapInArray(typeof target2 === "string" ? parseStyle(target2) : target2);
  return target2.concat(typeof source === "string" ? parseStyle(source) : source);
}
function mergeClasses(target2, source) {
  if (!source)
    return target2;
  if (!target2)
    return source;
  return target2 ? wrapInArray(target2).concat(source) : source;
}
function mergeListeners(...args) {
  if (!args[0])
    return args[1];
  if (!args[1])
    return args[0];
  const dest = {};
  for (let i = 2; i--; ) {
    const arg = args[i];
    for (const event in arg) {
      if (!arg[event])
        continue;
      if (dest[event]) {
        dest[event] = [].concat(arg[event], dest[event]);
      } else {
        dest[event] = arg[event];
      }
    }
  }
  return dest;
}
const availableProps = {
  absolute: Boolean,
  bottom: Boolean,
  fixed: Boolean,
  left: Boolean,
  right: Boolean,
  top: Boolean
};
function factory$2(selected = []) {
  return Vue.extend({
    name: "positionable",
    props: selected.length ? filterObjectOnKeys(availableProps, selected) : availableProps
  });
}
var Positionable = factory$2();
function defaultConditional() {
  return true;
}
function directive$1(e, el, binding) {
  const handler = typeof binding.value === "function" ? binding.value : binding.value.handler;
  const isActive = typeof binding.value === "object" && binding.value.closeConditional || defaultConditional;
  if (!e || isActive(e) === false)
    return;
  const elements = (typeof binding.value === "object" && binding.value.include || (() => []))();
  elements.push(el);
  !elements.some((el2) => el2.contains(e.target)) && setTimeout(() => {
    isActive(e) && handler && handler(e);
  }, 0);
}
const ClickOutside = {
  inserted(el, binding) {
    const onClick = (e) => directive$1(e, el, binding);
    const app = document.querySelector("[data-app]") || document.body;
    app.addEventListener("click", onClick, true);
    el._clickOutside = onClick;
  },
  unbind(el) {
    if (!el._clickOutside)
      return;
    const app = document.querySelector("[data-app]") || document.body;
    app && app.removeEventListener("click", el._clickOutside, true);
    delete el._clickOutside;
  }
};
var ClickOutside$1 = ClickOutside;
var VRipple = "";
const DELAY_RIPPLE = 80;
function transform(el, value) {
  el.style.transform = value;
  el.style.webkitTransform = value;
}
function opacity(el, value) {
  el.style.opacity = value.toString();
}
function isTouchEvent(e) {
  return e.constructor.name === "TouchEvent";
}
function isKeyboardEvent(e) {
  return e.constructor.name === "KeyboardEvent";
}
const calculate = (e, el, value = {}) => {
  let localX = 0;
  let localY = 0;
  if (!isKeyboardEvent(e)) {
    const offset = el.getBoundingClientRect();
    const target2 = isTouchEvent(e) ? e.touches[e.touches.length - 1] : e;
    localX = target2.clientX - offset.left;
    localY = target2.clientY - offset.top;
  }
  let radius = 0;
  let scale = 0.3;
  if (el._ripple && el._ripple.circle) {
    scale = 0.15;
    radius = el.clientWidth / 2;
    radius = value.center ? radius : radius + Math.sqrt((localX - radius) ** 2 + (localY - radius) ** 2) / 4;
  } else {
    radius = Math.sqrt(el.clientWidth ** 2 + el.clientHeight ** 2) / 2;
  }
  const centerX = `${(el.clientWidth - radius * 2) / 2}px`;
  const centerY = `${(el.clientHeight - radius * 2) / 2}px`;
  const x = value.center ? centerX : `${localX - radius}px`;
  const y = value.center ? centerY : `${localY - radius}px`;
  return {
    radius,
    scale,
    x,
    y,
    centerX,
    centerY
  };
};
const ripples = {
  show(e, el, value = {}) {
    if (!el._ripple || !el._ripple.enabled) {
      return;
    }
    const container = document.createElement("span");
    const animation = document.createElement("span");
    container.appendChild(animation);
    container.className = "v-ripple__container";
    if (value.class) {
      container.className += ` ${value.class}`;
    }
    const {
      radius,
      scale,
      x,
      y,
      centerX,
      centerY
    } = calculate(e, el, value);
    const size = `${radius * 2}px`;
    animation.className = "v-ripple__animation";
    animation.style.width = size;
    animation.style.height = size;
    el.appendChild(container);
    const computed = window.getComputedStyle(el);
    if (computed && computed.position === "static") {
      el.style.position = "relative";
      el.dataset.previousPosition = "static";
    }
    animation.classList.add("v-ripple__animation--enter");
    animation.classList.add("v-ripple__animation--visible");
    transform(animation, `translate(${x}, ${y}) scale3d(${scale},${scale},${scale})`);
    opacity(animation, 0);
    animation.dataset.activated = String(performance.now());
    setTimeout(() => {
      animation.classList.remove("v-ripple__animation--enter");
      animation.classList.add("v-ripple__animation--in");
      transform(animation, `translate(${centerX}, ${centerY}) scale3d(1,1,1)`);
      opacity(animation, 0.25);
    }, 0);
  },
  hide(el) {
    if (!el || !el._ripple || !el._ripple.enabled)
      return;
    const ripples2 = el.getElementsByClassName("v-ripple__animation");
    if (ripples2.length === 0)
      return;
    const animation = ripples2[ripples2.length - 1];
    if (animation.dataset.isHiding)
      return;
    else
      animation.dataset.isHiding = "true";
    const diff = performance.now() - Number(animation.dataset.activated);
    const delay = Math.max(250 - diff, 0);
    setTimeout(() => {
      animation.classList.remove("v-ripple__animation--in");
      animation.classList.add("v-ripple__animation--out");
      opacity(animation, 0);
      setTimeout(() => {
        const ripples3 = el.getElementsByClassName("v-ripple__animation");
        if (ripples3.length === 1 && el.dataset.previousPosition) {
          el.style.position = el.dataset.previousPosition;
          delete el.dataset.previousPosition;
        }
        animation.parentNode && el.removeChild(animation.parentNode);
      }, 300);
    }, delay);
  }
};
function isRippleEnabled(value) {
  return typeof value === "undefined" || !!value;
}
function rippleShow(e) {
  const value = {};
  const element = e.currentTarget;
  if (!element || !element._ripple || element._ripple.touched)
    return;
  if (isTouchEvent(e)) {
    element._ripple.touched = true;
    element._ripple.isTouch = true;
  } else {
    if (element._ripple.isTouch)
      return;
  }
  value.center = element._ripple.centered || isKeyboardEvent(e);
  if (element._ripple.class) {
    value.class = element._ripple.class;
  }
  if (isTouchEvent(e)) {
    if (element._ripple.showTimerCommit)
      return;
    element._ripple.showTimerCommit = () => {
      ripples.show(e, element, value);
    };
    element._ripple.showTimer = window.setTimeout(() => {
      if (element && element._ripple && element._ripple.showTimerCommit) {
        element._ripple.showTimerCommit();
        element._ripple.showTimerCommit = null;
      }
    }, DELAY_RIPPLE);
  } else {
    ripples.show(e, element, value);
  }
}
function rippleHide(e) {
  const element = e.currentTarget;
  if (!element || !element._ripple)
    return;
  window.clearTimeout(element._ripple.showTimer);
  if (e.type === "touchend" && element._ripple.showTimerCommit) {
    element._ripple.showTimerCommit();
    element._ripple.showTimerCommit = null;
    element._ripple.showTimer = setTimeout(() => {
      rippleHide(e);
    });
    return;
  }
  window.setTimeout(() => {
    if (element._ripple) {
      element._ripple.touched = false;
    }
  });
  ripples.hide(element);
}
function rippleCancelShow(e) {
  const element = e.currentTarget;
  if (!element || !element._ripple)
    return;
  if (element._ripple.showTimerCommit) {
    element._ripple.showTimerCommit = null;
  }
  window.clearTimeout(element._ripple.showTimer);
}
let keyboardRipple = false;
function keyboardRippleShow(e) {
  if (!keyboardRipple && (e.keyCode === keyCodes.enter || e.keyCode === keyCodes.space)) {
    keyboardRipple = true;
    rippleShow(e);
  }
}
function keyboardRippleHide(e) {
  keyboardRipple = false;
  rippleHide(e);
}
function updateRipple(el, binding, wasEnabled) {
  const enabled = isRippleEnabled(binding.value);
  if (!enabled) {
    ripples.hide(el);
  }
  el._ripple = el._ripple || {};
  el._ripple.enabled = enabled;
  const value = binding.value || {};
  if (value.center) {
    el._ripple.centered = true;
  }
  if (value.class) {
    el._ripple.class = binding.value.class;
  }
  if (value.circle) {
    el._ripple.circle = value.circle;
  }
  if (enabled && !wasEnabled) {
    el.addEventListener("touchstart", rippleShow, {
      passive: true
    });
    el.addEventListener("touchend", rippleHide, {
      passive: true
    });
    el.addEventListener("touchmove", rippleCancelShow, {
      passive: true
    });
    el.addEventListener("touchcancel", rippleHide);
    el.addEventListener("mousedown", rippleShow);
    el.addEventListener("mouseup", rippleHide);
    el.addEventListener("mouseleave", rippleHide);
    el.addEventListener("keydown", keyboardRippleShow);
    el.addEventListener("keyup", keyboardRippleHide);
    el.addEventListener("dragstart", rippleHide, {
      passive: true
    });
  } else if (!enabled && wasEnabled) {
    removeListeners(el);
  }
}
function removeListeners(el) {
  el.removeEventListener("mousedown", rippleShow);
  el.removeEventListener("touchstart", rippleShow);
  el.removeEventListener("touchend", rippleHide);
  el.removeEventListener("touchmove", rippleCancelShow);
  el.removeEventListener("touchcancel", rippleHide);
  el.removeEventListener("mouseup", rippleHide);
  el.removeEventListener("mouseleave", rippleHide);
  el.removeEventListener("keydown", keyboardRippleShow);
  el.removeEventListener("keyup", keyboardRippleHide);
  el.removeEventListener("dragstart", rippleHide);
}
function directive(el, binding, node) {
  updateRipple(el, binding, false);
}
function unbind2(el) {
  delete el._ripple;
  removeListeners(el);
}
function update4(el, binding) {
  if (binding.value === binding.oldValue) {
    return;
  }
  const wasEnabled = isRippleEnabled(binding.oldValue);
  updateRipple(el, binding, wasEnabled);
}
const Ripple = {
  bind: directive,
  unbind: unbind2,
  update: update4
};
var ripple = Ripple;
function factory$1(prop = "value", event = "input") {
  return Vue.extend({
    name: "toggleable",
    model: {
      prop,
      event
    },
    props: {
      [prop]: {
        required: false
      }
    },
    data() {
      return {
        isActive: !!this[prop]
      };
    },
    watch: {
      [prop](val) {
        this.isActive = !!val;
      },
      isActive(val) {
        !!val !== this[prop] && this.$emit(event, val);
      }
    }
  });
}
const Toggleable = factory$1();
var Toggleable$1 = Toggleable;
var VIcon$2 = "";
var Sizeable = Vue.extend({
  name: "sizeable",
  props: {
    large: Boolean,
    small: Boolean,
    xLarge: Boolean,
    xSmall: Boolean
  },
  computed: {
    medium() {
      return Boolean(!this.xSmall && !this.small && !this.large && !this.xLarge);
    },
    sizeableClasses() {
      return {
        "v-size--x-small": this.xSmall,
        "v-size--small": this.small,
        "v-size--default": this.medium,
        "v-size--large": this.large,
        "v-size--x-large": this.xLarge
      };
    }
  }
});
var SIZE_MAP;
(function(SIZE_MAP2) {
  SIZE_MAP2["xSmall"] = "12px";
  SIZE_MAP2["small"] = "16px";
  SIZE_MAP2["default"] = "24px";
  SIZE_MAP2["medium"] = "28px";
  SIZE_MAP2["large"] = "36px";
  SIZE_MAP2["xLarge"] = "40px";
})(SIZE_MAP || (SIZE_MAP = {}));
function isFontAwesome5(iconType) {
  return ["fas", "far", "fal", "fab", "fad"].some((val) => iconType.includes(val));
}
function isSvgPath(icon) {
  return /^[mzlhvcsqta]\s*[-+.0-9][^mlhvzcsqta]+/i.test(icon) && /[\dz]$/i.test(icon) && icon.length > 4;
}
const VIcon = mixins(BindsAttrs, Colorable, Sizeable, Themeable$1).extend({
  name: "v-icon",
  props: {
    dense: Boolean,
    disabled: Boolean,
    left: Boolean,
    right: Boolean,
    size: [Number, String],
    tag: {
      type: String,
      required: false,
      default: "i"
    }
  },
  computed: {
    medium() {
      return false;
    },
    hasClickListener() {
      return Boolean(this.listeners$.click || this.listeners$["!click"]);
    }
  },
  methods: {
    getIcon() {
      let iconName = "";
      if (this.$slots.default)
        iconName = this.$slots.default[0].text.trim();
      return remapInternalIcon(this, iconName);
    },
    getSize() {
      const sizes = {
        xSmall: this.xSmall,
        small: this.small,
        medium: this.medium,
        large: this.large,
        xLarge: this.xLarge
      };
      const explicitSize = keys(sizes).find((key) => sizes[key]);
      return explicitSize && SIZE_MAP[explicitSize] || convertToUnit(this.size);
    },
    getDefaultData() {
      return {
        staticClass: "v-icon notranslate",
        class: {
          "v-icon--disabled": this.disabled,
          "v-icon--left": this.left,
          "v-icon--link": this.hasClickListener,
          "v-icon--right": this.right,
          "v-icon--dense": this.dense
        },
        attrs: __spreadValues({
          "aria-hidden": !this.hasClickListener,
          disabled: this.hasClickListener && this.disabled,
          type: this.hasClickListener ? "button" : void 0
        }, this.attrs$),
        on: this.listeners$
      };
    },
    getSvgWrapperData() {
      const fontSize = this.getSize();
      const wrapperData = __spreadProps(__spreadValues({}, this.getDefaultData()), {
        style: fontSize ? {
          fontSize,
          height: fontSize,
          width: fontSize
        } : void 0
      });
      this.applyColors(wrapperData);
      return wrapperData;
    },
    applyColors(data) {
      data.class = __spreadValues(__spreadValues({}, data.class), this.themeClasses);
      this.setTextColor(this.color, data);
    },
    renderFontIcon(icon, h) {
      const newChildren = [];
      const data = this.getDefaultData();
      let iconType = "material-icons";
      const delimiterIndex = icon.indexOf("-");
      const isMaterialIcon = delimiterIndex <= -1;
      if (isMaterialIcon) {
        newChildren.push(icon);
      } else {
        iconType = icon.slice(0, delimiterIndex);
        if (isFontAwesome5(iconType))
          iconType = "";
      }
      data.class[iconType] = true;
      data.class[icon] = !isMaterialIcon;
      const fontSize = this.getSize();
      if (fontSize)
        data.style = {
          fontSize
        };
      this.applyColors(data);
      return h(this.hasClickListener ? "button" : this.tag, data, newChildren);
    },
    renderSvgIcon(icon, h) {
      const svgData = {
        class: "v-icon__svg",
        attrs: {
          xmlns: "http://www.w3.org/2000/svg",
          viewBox: "0 0 24 24",
          role: "img",
          "aria-hidden": true
        }
      };
      const size = this.getSize();
      if (size) {
        svgData.style = {
          fontSize: size,
          height: size,
          width: size
        };
      }
      return h(this.hasClickListener ? "button" : "span", this.getSvgWrapperData(), [h("svg", svgData, [h("path", {
        attrs: {
          d: icon
        }
      })])]);
    },
    renderSvgIconComponent(icon, h) {
      const data = {
        class: {
          "v-icon__component": true
        }
      };
      const size = this.getSize();
      if (size) {
        data.style = {
          fontSize: size,
          height: size,
          width: size
        };
      }
      this.applyColors(data);
      const component = icon.component;
      data.props = icon.props;
      data.nativeOn = data.on;
      return h(this.hasClickListener ? "button" : "span", this.getSvgWrapperData(), [h(component, data)]);
    }
  },
  render(h) {
    const icon = this.getIcon();
    if (typeof icon === "string") {
      if (isSvgPath(icon)) {
        return this.renderSvgIcon(icon, h);
      }
      return this.renderFontIcon(icon, h);
    }
    return this.renderSvgIconComponent(icon, h);
  }
});
var VIcon$1 = Vue.extend({
  name: "v-icon",
  $_wrapperFor: VIcon,
  functional: true,
  render(h, {
    data,
    children
  }) {
    let iconName = "";
    if (data.domProps) {
      iconName = data.domProps.textContent || data.domProps.innerHTML || iconName;
      delete data.domProps.textContent;
      delete data.domProps.innerHTML;
    }
    return h(VIcon, data, iconName ? [iconName] : children);
  }
});
var VBtn$1 = "";
var VProgressCircular$1 = "";
var VProgressCircular = Colorable.extend({
  name: "v-progress-circular",
  props: {
    button: Boolean,
    indeterminate: Boolean,
    rotate: {
      type: [Number, String],
      default: 0
    },
    size: {
      type: [Number, String],
      default: 32
    },
    width: {
      type: [Number, String],
      default: 4
    },
    value: {
      type: [Number, String],
      default: 0
    }
  },
  data: () => ({
    radius: 20
  }),
  computed: {
    calculatedSize() {
      return Number(this.size) + (this.button ? 8 : 0);
    },
    circumference() {
      return 2 * Math.PI * this.radius;
    },
    classes() {
      return {
        "v-progress-circular--indeterminate": this.indeterminate,
        "v-progress-circular--button": this.button
      };
    },
    normalizedValue() {
      if (this.value < 0) {
        return 0;
      }
      if (this.value > 100) {
        return 100;
      }
      return parseFloat(this.value);
    },
    strokeDashArray() {
      return Math.round(this.circumference * 1e3) / 1e3;
    },
    strokeDashOffset() {
      return (100 - this.normalizedValue) / 100 * this.circumference + "px";
    },
    strokeWidth() {
      return Number(this.width) / +this.size * this.viewBoxSize * 2;
    },
    styles() {
      return {
        height: convertToUnit(this.calculatedSize),
        width: convertToUnit(this.calculatedSize)
      };
    },
    svgStyles() {
      return {
        transform: `rotate(${Number(this.rotate)}deg)`
      };
    },
    viewBoxSize() {
      return this.radius / (1 - Number(this.width) / +this.size);
    }
  },
  methods: {
    genCircle(name, offset) {
      return this.$createElement("circle", {
        class: `v-progress-circular__${name}`,
        attrs: {
          fill: "transparent",
          cx: 2 * this.viewBoxSize,
          cy: 2 * this.viewBoxSize,
          r: this.radius,
          "stroke-width": this.strokeWidth,
          "stroke-dasharray": this.strokeDashArray,
          "stroke-dashoffset": offset
        }
      });
    },
    genSvg() {
      const children = [this.indeterminate || this.genCircle("underlay", 0), this.genCircle("overlay", this.strokeDashOffset)];
      return this.$createElement("svg", {
        style: this.svgStyles,
        attrs: {
          xmlns: "http://www.w3.org/2000/svg",
          viewBox: `${this.viewBoxSize} ${this.viewBoxSize} ${2 * this.viewBoxSize} ${2 * this.viewBoxSize}`
        }
      }, children);
    },
    genInfo() {
      return this.$createElement("div", {
        staticClass: "v-progress-circular__info"
      }, this.$slots.default);
    }
  },
  render(h) {
    return h("div", this.setTextColor(this.color, {
      staticClass: "v-progress-circular",
      attrs: {
        role: "progressbar",
        "aria-valuemin": 0,
        "aria-valuemax": 100,
        "aria-valuenow": this.indeterminate ? void 0 : this.normalizedValue
      },
      class: this.classes,
      style: this.styles,
      on: this.$listeners
    }), [this.genSvg(), this.genInfo()]);
  }
});
function generateWarning(child, parent) {
  return () => consoleWarn(`The ${child} component must be used inside a ${parent}`);
}
function inject(namespace, child, parent) {
  const defaultImpl = child && parent ? {
    register: generateWarning(child, parent),
    unregister: generateWarning(child, parent)
  } : null;
  return Vue.extend({
    name: "registrable-inject",
    inject: {
      [namespace]: {
        default: defaultImpl
      }
    }
  });
}
function factory(namespace, child, parent) {
  return inject(namespace, child, parent).extend({
    name: "groupable",
    props: {
      activeClass: {
        type: String,
        default() {
          if (!this[namespace])
            return void 0;
          return this[namespace].activeClass;
        }
      },
      disabled: Boolean
    },
    data() {
      return {
        isActive: false
      };
    },
    computed: {
      groupClasses() {
        if (!this.activeClass)
          return {};
        return {
          [this.activeClass]: this.isActive
        };
      }
    },
    created() {
      this[namespace] && this[namespace].register(this);
    },
    beforeDestroy() {
      this[namespace] && this[namespace].unregister(this);
    },
    methods: {
      toggle() {
        this.$emit("change");
      }
    }
  });
}
factory("itemGroup");
var Routable = Vue.extend({
  name: "routable",
  directives: {
    Ripple: ripple
  },
  props: {
    activeClass: String,
    append: Boolean,
    disabled: Boolean,
    exact: {
      type: Boolean,
      default: void 0
    },
    exactActiveClass: String,
    link: Boolean,
    href: [String, Object],
    to: [String, Object],
    nuxt: Boolean,
    replace: Boolean,
    ripple: {
      type: [Boolean, Object],
      default: null
    },
    tag: String,
    target: String
  },
  data: () => ({
    isActive: false,
    proxyClass: ""
  }),
  computed: {
    classes() {
      const classes = {};
      if (this.to)
        return classes;
      if (this.activeClass)
        classes[this.activeClass] = this.isActive;
      if (this.proxyClass)
        classes[this.proxyClass] = this.isActive;
      return classes;
    },
    computedRipple() {
      var _this$ripple;
      return (_this$ripple = this.ripple) != null ? _this$ripple : !this.disabled && this.isClickable;
    },
    isClickable() {
      if (this.disabled)
        return false;
      return Boolean(this.isLink || this.$listeners.click || this.$listeners["!click"] || this.$attrs.tabindex);
    },
    isLink() {
      return this.to || this.href || this.link;
    },
    styles: () => ({})
  },
  watch: {
    $route: "onRouteChange"
  },
  methods: {
    click(e) {
      this.$emit("click", e);
    },
    generateRouteLink() {
      let exact = this.exact;
      let tag;
      const data = {
        attrs: {
          tabindex: "tabindex" in this.$attrs ? this.$attrs.tabindex : void 0
        },
        class: this.classes,
        style: this.styles,
        props: {},
        directives: [{
          name: "ripple",
          value: this.computedRipple
        }],
        [this.to ? "nativeOn" : "on"]: __spreadProps(__spreadValues({}, this.$listeners), {
          click: this.click
        }),
        ref: "link"
      };
      if (typeof this.exact === "undefined") {
        exact = this.to === "/" || this.to === Object(this.to) && this.to.path === "/";
      }
      if (this.to) {
        let activeClass = this.activeClass;
        let exactActiveClass = this.exactActiveClass || activeClass;
        if (this.proxyClass) {
          activeClass = `${activeClass} ${this.proxyClass}`.trim();
          exactActiveClass = `${exactActiveClass} ${this.proxyClass}`.trim();
        }
        tag = this.nuxt ? "nuxt-link" : "router-link";
        Object.assign(data.props, {
          to: this.to,
          exact,
          activeClass,
          exactActiveClass,
          append: this.append,
          replace: this.replace
        });
      } else {
        tag = this.href && "a" || this.tag || "div";
        if (tag === "a" && this.href)
          data.attrs.href = this.href;
      }
      if (this.target)
        data.attrs.target = this.target;
      return {
        tag,
        data
      };
    },
    onRouteChange() {
      if (!this.to || !this.$refs.link || !this.$route)
        return;
      const activeClass = `${this.activeClass} ${this.proxyClass || ""}`.trim();
      const path = `_vnode.data.class.${activeClass}`;
      this.$nextTick(() => {
        if (getObjectValueByPath(this.$refs.link, path)) {
          this.toggle();
        }
      });
    },
    toggle: () => {
    }
  }
});
const baseMixins$2 = mixins(VSheet, Routable, Positionable, Sizeable, factory("btnToggle"), factory$1("inputValue"));
var VBtn = baseMixins$2.extend().extend({
  name: "v-btn",
  props: {
    activeClass: {
      type: String,
      default() {
        if (!this.btnToggle)
          return "";
        return this.btnToggle.activeClass;
      }
    },
    block: Boolean,
    depressed: Boolean,
    fab: Boolean,
    icon: Boolean,
    loading: Boolean,
    outlined: Boolean,
    plain: Boolean,
    retainFocusOnClick: Boolean,
    rounded: Boolean,
    tag: {
      type: String,
      default: "button"
    },
    text: Boolean,
    tile: Boolean,
    type: {
      type: String,
      default: "button"
    },
    value: null
  },
  data: () => ({
    proxyClass: "v-btn--active"
  }),
  computed: {
    classes() {
      return __spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadProps(__spreadValues({
        "v-btn": true
      }, Routable.options.computed.classes.call(this)), {
        "v-btn--absolute": this.absolute,
        "v-btn--block": this.block,
        "v-btn--bottom": this.bottom,
        "v-btn--disabled": this.disabled,
        "v-btn--is-elevated": this.isElevated,
        "v-btn--fab": this.fab,
        "v-btn--fixed": this.fixed,
        "v-btn--has-bg": this.hasBg,
        "v-btn--icon": this.icon,
        "v-btn--left": this.left,
        "v-btn--loading": this.loading,
        "v-btn--outlined": this.outlined,
        "v-btn--plain": this.plain,
        "v-btn--right": this.right,
        "v-btn--round": this.isRound,
        "v-btn--rounded": this.rounded,
        "v-btn--router": this.to,
        "v-btn--text": this.text,
        "v-btn--tile": this.tile,
        "v-btn--top": this.top
      }), this.themeClasses), this.groupClasses), this.elevationClasses), this.sizeableClasses);
    },
    computedElevation() {
      if (this.disabled)
        return void 0;
      return Elevatable.options.computed.computedElevation.call(this);
    },
    computedRipple() {
      var _this$ripple;
      const defaultRipple = this.icon || this.fab ? {
        circle: true
      } : true;
      if (this.disabled)
        return false;
      else
        return (_this$ripple = this.ripple) != null ? _this$ripple : defaultRipple;
    },
    hasBg() {
      return !this.text && !this.plain && !this.outlined && !this.icon;
    },
    isElevated() {
      return Boolean(!this.icon && !this.text && !this.outlined && !this.depressed && !this.disabled && !this.plain && (this.elevation == null || Number(this.elevation) > 0));
    },
    isRound() {
      return Boolean(this.icon || this.fab);
    },
    styles() {
      return __spreadValues({}, this.measurableStyles);
    }
  },
  created() {
    const breakingProps = [["flat", "text"], ["outline", "outlined"], ["round", "rounded"]];
    breakingProps.forEach(([original, replacement]) => {
      if (this.$attrs.hasOwnProperty(original))
        breaking(original, replacement, this);
    });
  },
  methods: {
    click(e) {
      !this.retainFocusOnClick && !this.fab && e.detail && this.$el.blur();
      this.$emit("click", e);
      this.btnToggle && this.toggle();
    },
    genContent() {
      return this.$createElement("span", {
        staticClass: "v-btn__content"
      }, this.$slots.default);
    },
    genLoader() {
      return this.$createElement("span", {
        class: "v-btn__loader"
      }, this.$slots.loader || [this.$createElement(VProgressCircular, {
        props: {
          indeterminate: true,
          size: 23,
          width: 2
        }
      })]);
    }
  },
  render(h) {
    const children = [this.genContent(), this.loading && this.genLoader()];
    const {
      tag,
      data
    } = this.generateRouteLink();
    const setColor = this.hasBg ? this.setBackgroundColor : this.setTextColor;
    if (tag === "button") {
      data.attrs.type = this.type;
      data.attrs.disabled = this.disabled;
    }
    data.attrs.value = ["string", "number"].includes(typeof this.value) ? this.value : JSON.stringify(this.value);
    return h(tag, this.disabled ? data : setColor(this.color, data), children);
  }
});
var VThemeProvider = Themeable$1.extend({
  name: "v-theme-provider",
  props: {
    root: Boolean
  },
  computed: {
    isDark() {
      return this.root ? this.rootIsDark : Themeable$1.options.computed.isDark.call(this);
    }
  },
  render() {
    return this.$slots.default && this.$slots.default.find((node) => !node.isComment && node.text !== " ");
  }
});
var Delayable = Vue.extend().extend({
  name: "delayable",
  props: {
    openDelay: {
      type: [Number, String],
      default: 0
    },
    closeDelay: {
      type: [Number, String],
      default: 0
    }
  },
  data: () => ({
    openTimeout: void 0,
    closeTimeout: void 0
  }),
  methods: {
    clearDelay() {
      clearTimeout(this.openTimeout);
      clearTimeout(this.closeTimeout);
    },
    runDelay(type2, cb) {
      this.clearDelay();
      const delay = parseInt(this[`${type2}Delay`], 10);
      this[`${type2}Timeout`] = setTimeout(cb || (() => {
        this.isActive = {
          open: true,
          close: false
        }[type2];
      }), delay);
    }
  }
});
const baseMixins$1 = mixins(Delayable, Toggleable$1);
var Activatable = baseMixins$1.extend({
  name: "activatable",
  props: {
    activator: {
      default: null,
      validator: (val) => {
        return ["string", "object"].includes(typeof val);
      }
    },
    disabled: Boolean,
    internalActivator: Boolean,
    openOnHover: Boolean,
    openOnFocus: Boolean
  },
  data: () => ({
    activatorElement: null,
    activatorNode: [],
    events: ["click", "mouseenter", "mouseleave", "focus"],
    listeners: {}
  }),
  watch: {
    activator: "resetActivator",
    openOnFocus: "resetActivator",
    openOnHover: "resetActivator"
  },
  mounted() {
    const slotType = getSlotType(this, "activator", true);
    if (slotType && ["v-slot", "normal"].includes(slotType)) {
      consoleError(`The activator slot must be bound, try '<template v-slot:activator="{ on }"><v-btn v-on="on">'`, this);
    }
    this.addActivatorEvents();
  },
  beforeDestroy() {
    this.removeActivatorEvents();
  },
  methods: {
    addActivatorEvents() {
      if (!this.activator || this.disabled || !this.getActivator())
        return;
      this.listeners = this.genActivatorListeners();
      const keys2 = Object.keys(this.listeners);
      for (const key of keys2) {
        this.getActivator().addEventListener(key, this.listeners[key]);
      }
    },
    genActivator() {
      const node = getSlot(this, "activator", Object.assign(this.getValueProxy(), {
        on: this.genActivatorListeners(),
        attrs: this.genActivatorAttributes()
      })) || [];
      this.activatorNode = node;
      return node;
    },
    genActivatorAttributes() {
      return {
        role: "button",
        "aria-haspopup": true,
        "aria-expanded": String(this.isActive)
      };
    },
    genActivatorListeners() {
      if (this.disabled)
        return {};
      const listeners = {};
      if (this.openOnHover) {
        listeners.mouseenter = (e) => {
          this.getActivator(e);
          this.runDelay("open");
        };
        listeners.mouseleave = (e) => {
          this.getActivator(e);
          this.runDelay("close");
        };
      } else {
        listeners.click = (e) => {
          const activator = this.getActivator(e);
          if (activator)
            activator.focus();
          e.stopPropagation();
          this.isActive = !this.isActive;
        };
      }
      if (this.openOnFocus) {
        listeners.focus = (e) => {
          this.getActivator(e);
          e.stopPropagation();
          this.isActive = !this.isActive;
        };
      }
      return listeners;
    },
    getActivator(e) {
      if (this.activatorElement)
        return this.activatorElement;
      let activator = null;
      if (this.activator) {
        const target2 = this.internalActivator ? this.$el : document;
        if (typeof this.activator === "string") {
          activator = target2.querySelector(this.activator);
        } else if (this.activator.$el) {
          activator = this.activator.$el;
        } else {
          activator = this.activator;
        }
      } else if (this.activatorNode.length === 1 || this.activatorNode.length && !e) {
        const vm = this.activatorNode[0].componentInstance;
        if (vm && vm.$options.mixins && vm.$options.mixins.some((m) => m.options && ["activatable", "menuable"].includes(m.options.name))) {
          activator = vm.getActivator();
        } else {
          activator = this.activatorNode[0].elm;
        }
      } else if (e) {
        activator = e.currentTarget || e.target;
      }
      this.activatorElement = activator;
      return this.activatorElement;
    },
    getContentSlot() {
      return getSlot(this, "default", this.getValueProxy(), true);
    },
    getValueProxy() {
      const self = this;
      return {
        get value() {
          return self.isActive;
        },
        set value(isActive) {
          self.isActive = isActive;
        }
      };
    },
    removeActivatorEvents() {
      if (!this.activator || !this.activatorElement)
        return;
      const keys2 = Object.keys(this.listeners);
      for (const key of keys2) {
        this.activatorElement.removeEventListener(key, this.listeners[key]);
      }
      this.listeners = {};
    },
    resetActivator() {
      this.removeActivatorEvents();
      this.activatorElement = null;
      this.getActivator();
      this.addActivatorEvents();
    }
  }
});
function searchChildren(children) {
  const results = [];
  for (let index2 = 0; index2 < children.length; index2++) {
    const child = children[index2];
    if (child.isActive && child.isDependent) {
      results.push(child);
    } else {
      results.push(...searchChildren(child.$children));
    }
  }
  return results;
}
var Dependent = mixins().extend({
  name: "dependent",
  data() {
    return {
      closeDependents: true,
      isActive: false,
      isDependent: true
    };
  },
  watch: {
    isActive(val) {
      if (val)
        return;
      const openDependents = this.getOpenDependents();
      for (let index2 = 0; index2 < openDependents.length; index2++) {
        openDependents[index2].isActive = false;
      }
    }
  },
  methods: {
    getOpenDependents() {
      if (this.closeDependents)
        return searchChildren(this.$children);
      return [];
    },
    getOpenDependentElements() {
      const result = [];
      const openDependents = this.getOpenDependents();
      for (let index2 = 0; index2 < openDependents.length; index2++) {
        result.push(...openDependents[index2].getClickableDependentElements());
      }
      return result;
    },
    getClickableDependentElements() {
      const result = [this.$el];
      if (this.$refs.content)
        result.push(this.$refs.content);
      if (this.overlay)
        result.push(this.overlay.$el);
      result.push(...this.getOpenDependentElements());
      return result;
    }
  }
});
var Bootable = Vue.extend().extend({
  name: "bootable",
  props: {
    eager: Boolean
  },
  data: () => ({
    isBooted: false
  }),
  computed: {
    hasContent() {
      return this.isBooted || this.eager || this.isActive;
    }
  },
  watch: {
    isActive() {
      this.isBooted = true;
    }
  },
  created() {
    if ("lazy" in this.$attrs) {
      removed("lazy", this);
    }
  },
  methods: {
    showLazyContent(content) {
      return this.hasContent && content ? content() : [this.$createElement()];
    }
  }
});
function validateAttachTarget(val) {
  const type2 = typeof val;
  if (type2 === "boolean" || type2 === "string")
    return true;
  return val.nodeType === Node.ELEMENT_NODE;
}
var Detachable = mixins(Bootable).extend({
  name: "detachable",
  props: {
    attach: {
      default: false,
      validator: validateAttachTarget
    },
    contentClass: {
      type: String,
      default: ""
    }
  },
  data: () => ({
    activatorNode: null,
    hasDetached: false
  }),
  watch: {
    attach() {
      this.hasDetached = false;
      this.initDetach();
    },
    hasContent() {
      this.$nextTick(this.initDetach);
    }
  },
  beforeMount() {
    this.$nextTick(() => {
      if (this.activatorNode) {
        const activator = Array.isArray(this.activatorNode) ? this.activatorNode : [this.activatorNode];
        activator.forEach((node) => {
          if (!node.elm)
            return;
          if (!this.$el.parentNode)
            return;
          const target2 = this.$el === this.$el.parentNode.firstChild ? this.$el : this.$el.nextSibling;
          this.$el.parentNode.insertBefore(node.elm, target2);
        });
      }
    });
  },
  mounted() {
    this.hasContent && this.initDetach();
  },
  deactivated() {
    this.isActive = false;
  },
  beforeDestroy() {
    try {
      if (this.$refs.content && this.$refs.content.parentNode) {
        this.$refs.content.parentNode.removeChild(this.$refs.content);
      }
      if (this.activatorNode) {
        const activator = Array.isArray(this.activatorNode) ? this.activatorNode : [this.activatorNode];
        activator.forEach((node) => {
          node.elm && node.elm.parentNode && node.elm.parentNode.removeChild(node.elm);
        });
      }
    } catch (e) {
      console.log(e);
    }
  },
  methods: {
    getScopeIdAttrs() {
      const scopeId = getObjectValueByPath(this.$vnode, "context.$options._scopeId");
      return scopeId && {
        [scopeId]: ""
      };
    },
    initDetach() {
      if (this._isDestroyed || !this.$refs.content || this.hasDetached || this.attach === "" || this.attach === true || this.attach === "attach")
        return;
      let target2;
      if (this.attach === false) {
        target2 = document.querySelector("[data-app]");
      } else if (typeof this.attach === "string") {
        target2 = document.querySelector(this.attach);
      } else {
        target2 = this.attach;
      }
      if (!target2) {
        consoleWarn(`Unable to locate target ${this.attach || "[data-app]"}`, this);
        return;
      }
      target2.appendChild(this.$refs.content);
      this.hasDetached = true;
    }
  }
});
var Stackable = Vue.extend().extend({
  name: "stackable",
  data() {
    return {
      stackElement: null,
      stackExclude: null,
      stackMinZIndex: 0,
      isActive: false
    };
  },
  computed: {
    activeZIndex() {
      if (typeof window === "undefined")
        return 0;
      const content = this.stackElement || this.$refs.content;
      const index2 = !this.isActive ? getZIndex(content) : this.getMaxZIndex(this.stackExclude || [content]) + 2;
      if (index2 == null)
        return index2;
      return parseInt(index2);
    }
  },
  methods: {
    getMaxZIndex(exclude = []) {
      const base = this.$el;
      const zis = [this.stackMinZIndex, getZIndex(base)];
      const activeElements = [...document.getElementsByClassName("v-menu__content--active"), ...document.getElementsByClassName("v-dialog__content--active")];
      for (let index2 = 0; index2 < activeElements.length; index2++) {
        if (!exclude.includes(activeElements[index2])) {
          zis.push(getZIndex(activeElements[index2]));
        }
      }
      return Math.max(...zis);
    }
  }
});
var Returnable = Vue.extend({
  name: "returnable",
  props: {
    returnValue: null
  },
  data: () => ({
    isActive: false,
    originalValue: null
  }),
  watch: {
    isActive(val) {
      if (val) {
        this.originalValue = this.returnValue;
      } else {
        this.$emit("update:return-value", this.originalValue);
      }
    }
  },
  methods: {
    save(value) {
      this.originalValue = value;
      setTimeout(() => {
        this.isActive = false;
      });
    }
  }
});
var VDialog$1 = "";
var VOverlay$1 = "";
var VOverlay = mixins(Colorable, Themeable$1, Toggleable$1).extend({
  name: "v-overlay",
  props: {
    absolute: Boolean,
    color: {
      type: String,
      default: "#212121"
    },
    dark: {
      type: Boolean,
      default: true
    },
    opacity: {
      type: [Number, String],
      default: 0.46
    },
    value: {
      default: true
    },
    zIndex: {
      type: [Number, String],
      default: 5
    }
  },
  computed: {
    __scrim() {
      const data = this.setBackgroundColor(this.color, {
        staticClass: "v-overlay__scrim",
        style: {
          opacity: this.computedOpacity
        }
      });
      return this.$createElement("div", data);
    },
    classes() {
      return __spreadValues({
        "v-overlay--absolute": this.absolute,
        "v-overlay--active": this.isActive
      }, this.themeClasses);
    },
    computedOpacity() {
      return Number(this.isActive ? this.opacity : 0);
    },
    styles() {
      return {
        zIndex: this.zIndex
      };
    }
  },
  methods: {
    genContent() {
      return this.$createElement("div", {
        staticClass: "v-overlay__content"
      }, this.$slots.default);
    }
  },
  render(h) {
    const children = [this.__scrim];
    if (this.isActive)
      children.push(this.genContent());
    return h("div", {
      staticClass: "v-overlay",
      class: this.classes,
      style: this.styles
    }, children);
  }
});
var Overlayable = Vue.extend().extend({
  name: "overlayable",
  props: {
    hideOverlay: Boolean,
    overlayColor: String,
    overlayOpacity: [Number, String]
  },
  data() {
    return {
      animationFrame: 0,
      overlay: null
    };
  },
  watch: {
    hideOverlay(value) {
      if (!this.isActive)
        return;
      if (value)
        this.removeOverlay();
      else
        this.genOverlay();
    }
  },
  beforeDestroy() {
    this.removeOverlay();
  },
  methods: {
    createOverlay() {
      const overlay = new VOverlay({
        propsData: {
          absolute: this.absolute,
          value: false,
          color: this.overlayColor,
          opacity: this.overlayOpacity
        }
      });
      overlay.$mount();
      const parent = this.absolute ? this.$el.parentNode : document.querySelector("[data-app]");
      parent && parent.insertBefore(overlay.$el, parent.firstChild);
      this.overlay = overlay;
    },
    genOverlay() {
      this.hideScroll();
      if (this.hideOverlay)
        return;
      if (!this.overlay)
        this.createOverlay();
      this.animationFrame = requestAnimationFrame(() => {
        if (!this.overlay)
          return;
        if (this.activeZIndex !== void 0) {
          this.overlay.zIndex = String(this.activeZIndex - 1);
        } else if (this.$el) {
          this.overlay.zIndex = getZIndex(this.$el);
        }
        this.overlay.value = true;
      });
      return true;
    },
    removeOverlay(showScroll = true) {
      if (this.overlay) {
        addOnceEventListener(this.overlay.$el, "transitionend", () => {
          if (!this.overlay || !this.overlay.$el || !this.overlay.$el.parentNode || this.overlay.value)
            return;
          this.overlay.$el.parentNode.removeChild(this.overlay.$el);
          this.overlay.$destroy();
          this.overlay = null;
        });
        cancelAnimationFrame(this.animationFrame);
        this.overlay.value = false;
      }
      showScroll && this.showScroll();
    },
    scrollListener(e) {
      if (e.type === "keydown") {
        if (["INPUT", "TEXTAREA", "SELECT"].includes(e.target.tagName) || e.target.isContentEditable)
          return;
        const up = [keyCodes.up, keyCodes.pageup];
        const down = [keyCodes.down, keyCodes.pagedown];
        if (up.includes(e.keyCode)) {
          e.deltaY = -1;
        } else if (down.includes(e.keyCode)) {
          e.deltaY = 1;
        } else {
          return;
        }
      }
      if (e.target === this.overlay || e.type !== "keydown" && e.target === document.body || this.checkPath(e))
        e.preventDefault();
    },
    hasScrollbar(el) {
      if (!el || el.nodeType !== Node.ELEMENT_NODE)
        return false;
      const style2 = window.getComputedStyle(el);
      return ["auto", "scroll"].includes(style2.overflowY) && el.scrollHeight > el.clientHeight;
    },
    shouldScroll(el, delta2) {
      if (el.scrollTop === 0 && delta2 < 0)
        return true;
      return el.scrollTop + el.clientHeight === el.scrollHeight && delta2 > 0;
    },
    isInside(el, parent) {
      if (el === parent) {
        return true;
      } else if (el === null || el === document.body) {
        return false;
      } else {
        return this.isInside(el.parentNode, parent);
      }
    },
    checkPath(e) {
      const path = e.path || this.composedPath(e);
      const delta2 = e.deltaY;
      if (e.type === "keydown" && path[0] === document.body) {
        const dialog = this.$refs.dialog;
        const selected = window.getSelection().anchorNode;
        if (dialog && this.hasScrollbar(dialog) && this.isInside(selected, dialog)) {
          return this.shouldScroll(dialog, delta2);
        }
        return true;
      }
      for (let index2 = 0; index2 < path.length; index2++) {
        const el = path[index2];
        if (el === document)
          return true;
        if (el === document.documentElement)
          return true;
        if (el === this.$refs.content)
          return true;
        if (this.hasScrollbar(el))
          return this.shouldScroll(el, delta2);
      }
      return true;
    },
    composedPath(e) {
      if (e.composedPath)
        return e.composedPath();
      const path = [];
      let el = e.target;
      while (el) {
        path.push(el);
        if (el.tagName === "HTML") {
          path.push(document);
          path.push(window);
          return path;
        }
        el = el.parentElement;
      }
      return path;
    },
    hideScroll() {
      if (this.$vuetify.breakpoint.smAndDown) {
        document.documentElement.classList.add("overflow-y-hidden");
      } else {
        addPassiveEventListener(window, "wheel", this.scrollListener, {
          passive: false
        });
        window.addEventListener("keydown", this.scrollListener);
      }
    },
    showScroll() {
      document.documentElement.classList.remove("overflow-y-hidden");
      window.removeEventListener("wheel", this.scrollListener);
      window.removeEventListener("keydown", this.scrollListener);
    }
  }
});
const baseMixins = mixins(Activatable, Dependent, Detachable, Overlayable, Returnable, Stackable, Toggleable$1);
var VDialog = baseMixins.extend({
  name: "v-dialog",
  directives: {
    ClickOutside: ClickOutside$1
  },
  props: {
    dark: Boolean,
    disabled: Boolean,
    fullscreen: Boolean,
    light: Boolean,
    maxWidth: {
      type: [String, Number],
      default: "none"
    },
    noClickAnimation: Boolean,
    origin: {
      type: String,
      default: "center center"
    },
    persistent: Boolean,
    retainFocus: {
      type: Boolean,
      default: true
    },
    scrollable: Boolean,
    transition: {
      type: [String, Boolean],
      default: "dialog-transition"
    },
    width: {
      type: [String, Number],
      default: "auto"
    }
  },
  data() {
    return {
      activatedBy: null,
      animate: false,
      animateTimeout: -1,
      isActive: !!this.value,
      stackMinZIndex: 200,
      previousActiveElement: null
    };
  },
  computed: {
    classes() {
      return {
        [`v-dialog ${this.contentClass}`.trim()]: true,
        "v-dialog--active": this.isActive,
        "v-dialog--persistent": this.persistent,
        "v-dialog--fullscreen": this.fullscreen,
        "v-dialog--scrollable": this.scrollable,
        "v-dialog--animated": this.animate
      };
    },
    contentClasses() {
      return {
        "v-dialog__content": true,
        "v-dialog__content--active": this.isActive
      };
    },
    hasActivator() {
      return Boolean(!!this.$slots.activator || !!this.$scopedSlots.activator);
    }
  },
  watch: {
    isActive(val) {
      if (val) {
        this.show();
        this.hideScroll();
      } else {
        var _this$previousActiveE;
        this.removeOverlay();
        this.unbind();
        (_this$previousActiveE = this.previousActiveElement) == null ? void 0 : _this$previousActiveE.focus();
      }
    },
    fullscreen(val) {
      if (!this.isActive)
        return;
      if (val) {
        this.hideScroll();
        this.removeOverlay(false);
      } else {
        this.showScroll();
        this.genOverlay();
      }
    }
  },
  created() {
    if (this.$attrs.hasOwnProperty("full-width")) {
      removed("full-width", this);
    }
  },
  beforeMount() {
    this.$nextTick(() => {
      this.isBooted = this.isActive;
      this.isActive && this.show();
    });
  },
  beforeDestroy() {
    if (typeof window !== "undefined")
      this.unbind();
  },
  methods: {
    animateClick() {
      this.animate = false;
      this.$nextTick(() => {
        this.animate = true;
        window.clearTimeout(this.animateTimeout);
        this.animateTimeout = window.setTimeout(() => this.animate = false, 150);
      });
    },
    closeConditional(e) {
      const target2 = e.target;
      return !(this._isDestroyed || !this.isActive || this.$refs.content.contains(target2) || this.overlay && target2 && !this.overlay.$el.contains(target2)) && this.activeZIndex >= this.getMaxZIndex();
    },
    hideScroll() {
      if (this.fullscreen) {
        document.documentElement.classList.add("overflow-y-hidden");
      } else {
        Overlayable.options.methods.hideScroll.call(this);
      }
    },
    show() {
      !this.fullscreen && !this.hideOverlay && this.genOverlay();
      this.$nextTick(() => {
        this.$nextTick(() => {
          this.previousActiveElement = document.activeElement;
          this.$refs.content.focus();
          this.bind();
        });
      });
    },
    bind() {
      window.addEventListener("focusin", this.onFocusin);
    },
    unbind() {
      window.removeEventListener("focusin", this.onFocusin);
    },
    onClickOutside(e) {
      this.$emit("click:outside", e);
      if (this.persistent) {
        this.noClickAnimation || this.animateClick();
      } else {
        this.isActive = false;
      }
    },
    onKeydown(e) {
      if (e.keyCode === keyCodes.esc && !this.getOpenDependents().length) {
        if (!this.persistent) {
          this.isActive = false;
          const activator = this.getActivator();
          this.$nextTick(() => activator && activator.focus());
        } else if (!this.noClickAnimation) {
          this.animateClick();
        }
      }
      this.$emit("keydown", e);
    },
    onFocusin(e) {
      if (!e || !this.retainFocus)
        return;
      const target2 = e.target;
      if (!!target2 && ![document, this.$refs.content].includes(target2) && !this.$refs.content.contains(target2) && this.activeZIndex >= this.getMaxZIndex() && !this.getOpenDependentElements().some((el) => el.contains(target2))) {
        const focusable = this.$refs.content.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
        const el = [...focusable].find((el2) => !el2.hasAttribute("disabled"));
        el && el.focus();
      }
    },
    genContent() {
      return this.showLazyContent(() => [this.$createElement(VThemeProvider, {
        props: {
          root: true,
          light: this.light,
          dark: this.dark
        }
      }, [this.$createElement("div", {
        class: this.contentClasses,
        attrs: __spreadValues({
          role: "document",
          tabindex: this.isActive ? 0 : void 0
        }, this.getScopeIdAttrs()),
        on: {
          keydown: this.onKeydown
        },
        style: {
          zIndex: this.activeZIndex
        },
        ref: "content"
      }, [this.genTransition()])])]);
    },
    genTransition() {
      const content = this.genInnerContent();
      if (!this.transition)
        return content;
      return this.$createElement("transition", {
        props: {
          name: this.transition,
          origin: this.origin,
          appear: true
        }
      }, [content]);
    },
    genInnerContent() {
      const data = {
        class: this.classes,
        ref: "dialog",
        directives: [{
          name: "click-outside",
          value: {
            handler: this.onClickOutside,
            closeConditional: this.closeConditional,
            include: this.getOpenDependentElements
          }
        }, {
          name: "show",
          value: this.isActive
        }],
        style: {
          transformOrigin: this.origin
        }
      };
      if (!this.fullscreen) {
        data.style = __spreadProps(__spreadValues({}, data.style), {
          maxWidth: this.maxWidth === "none" ? void 0 : convertToUnit(this.maxWidth),
          width: this.width === "auto" ? void 0 : convertToUnit(this.width)
        });
      }
      return this.$createElement("div", data, this.getContentSlot());
    }
  },
  render(h) {
    return h("div", {
      staticClass: "v-dialog__container",
      class: {
        "v-dialog__container--attached": this.attach === "" || this.attach === true || this.attach === "attach"
      },
      attrs: {
        role: "dialog"
      }
    }, [this.genActivator(), this.genContent()]);
  }
});
var VGrid = "";
const breakpoints$1 = ["sm", "md", "lg", "xl"];
const breakpointProps = (() => {
  return breakpoints$1.reduce((props2, val) => {
    props2[val] = {
      type: [Boolean, String, Number],
      default: false
    };
    return props2;
  }, {});
})();
const offsetProps = (() => {
  return breakpoints$1.reduce((props2, val) => {
    props2["offset" + upperFirst(val)] = {
      type: [String, Number],
      default: null
    };
    return props2;
  }, {});
})();
const orderProps = (() => {
  return breakpoints$1.reduce((props2, val) => {
    props2["order" + upperFirst(val)] = {
      type: [String, Number],
      default: null
    };
    return props2;
  }, {});
})();
const propMap$1 = {
  col: Object.keys(breakpointProps),
  offset: Object.keys(offsetProps),
  order: Object.keys(orderProps)
};
function breakpointClass$1(type2, prop, val) {
  let className = type2;
  if (val == null || val === false) {
    return void 0;
  }
  if (prop) {
    const breakpoint = prop.replace(type2, "");
    className += `-${breakpoint}`;
  }
  if (type2 === "col" && (val === "" || val === true)) {
    return className.toLowerCase();
  }
  className += `-${val}`;
  return className.toLowerCase();
}
const cache$1 = /* @__PURE__ */ new Map();
var VCol = Vue.extend({
  name: "v-col",
  functional: true,
  props: __spreadProps(__spreadValues(__spreadProps(__spreadValues(__spreadProps(__spreadValues({
    cols: {
      type: [Boolean, String, Number],
      default: false
    }
  }, breakpointProps), {
    offset: {
      type: [String, Number],
      default: null
    }
  }), offsetProps), {
    order: {
      type: [String, Number],
      default: null
    }
  }), orderProps), {
    alignSelf: {
      type: String,
      default: null,
      validator: (str) => ["auto", "start", "end", "center", "baseline", "stretch"].includes(str)
    },
    tag: {
      type: String,
      default: "div"
    }
  }),
  render(h, {
    props: props2,
    data,
    children,
    parent
  }) {
    let cacheKey = "";
    for (const prop in props2) {
      cacheKey += String(props2[prop]);
    }
    let classList = cache$1.get(cacheKey);
    if (!classList) {
      classList = [];
      let type2;
      for (type2 in propMap$1) {
        propMap$1[type2].forEach((prop) => {
          const value = props2[prop];
          const className = breakpointClass$1(type2, prop, value);
          if (className)
            classList.push(className);
        });
      }
      const hasColClasses = classList.some((className) => className.startsWith("col-"));
      classList.push({
        col: !hasColClasses || !props2.cols,
        [`col-${props2.cols}`]: props2.cols,
        [`offset-${props2.offset}`]: props2.offset,
        [`order-${props2.order}`]: props2.order,
        [`align-self-${props2.alignSelf}`]: props2.alignSelf
      });
      cache$1.set(cacheKey, classList);
    }
    return h(props2.tag, mergeData(data, {
      class: classList
    }), children);
  }
});
const breakpoints = ["sm", "md", "lg", "xl"];
const ALIGNMENT = ["start", "end", "center"];
function makeProps(prefix, def2) {
  return breakpoints.reduce((props2, val) => {
    props2[prefix + upperFirst(val)] = def2();
    return props2;
  }, {});
}
const alignValidator = (str) => [...ALIGNMENT, "baseline", "stretch"].includes(str);
const alignProps = makeProps("align", () => ({
  type: String,
  default: null,
  validator: alignValidator
}));
const justifyValidator = (str) => [...ALIGNMENT, "space-between", "space-around"].includes(str);
const justifyProps = makeProps("justify", () => ({
  type: String,
  default: null,
  validator: justifyValidator
}));
const alignContentValidator = (str) => [...ALIGNMENT, "space-between", "space-around", "stretch"].includes(str);
const alignContentProps = makeProps("alignContent", () => ({
  type: String,
  default: null,
  validator: alignContentValidator
}));
const propMap = {
  align: Object.keys(alignProps),
  justify: Object.keys(justifyProps),
  alignContent: Object.keys(alignContentProps)
};
const classMap = {
  align: "align",
  justify: "justify",
  alignContent: "align-content"
};
function breakpointClass(type2, prop, val) {
  let className = classMap[type2];
  if (val == null) {
    return void 0;
  }
  if (prop) {
    const breakpoint = prop.replace(type2, "");
    className += `-${breakpoint}`;
  }
  className += `-${val}`;
  return className.toLowerCase();
}
const cache = /* @__PURE__ */ new Map();
var VRow = Vue.extend({
  name: "v-row",
  functional: true,
  props: __spreadValues(__spreadProps(__spreadValues(__spreadProps(__spreadValues({
    tag: {
      type: String,
      default: "div"
    },
    dense: Boolean,
    noGutters: Boolean,
    align: {
      type: String,
      default: null,
      validator: alignValidator
    }
  }, alignProps), {
    justify: {
      type: String,
      default: null,
      validator: justifyValidator
    }
  }), justifyProps), {
    alignContent: {
      type: String,
      default: null,
      validator: alignContentValidator
    }
  }), alignContentProps),
  render(h, {
    props: props2,
    data,
    children
  }) {
    let cacheKey = "";
    for (const prop in props2) {
      cacheKey += String(props2[prop]);
    }
    let classList = cache.get(cacheKey);
    if (!classList) {
      classList = [];
      let type2;
      for (type2 in propMap) {
        propMap[type2].forEach((prop) => {
          const value = props2[prop];
          const className = breakpointClass(type2, prop, value);
          if (className)
            classList.push(className);
        });
      }
      classList.push({
        "no-gutters": props2.noGutters,
        "row--dense": props2.dense,
        [`align-${props2.align}`]: props2.align,
        [`justify-${props2.justify}`]: props2.justify,
        [`align-content-${props2.alignContent}`]: props2.alignContent
      });
      cache.set(cacheKey, classList);
    }
    return h(props2.tag, mergeData(data, {
      staticClass: "row",
      class: classList
    }), children);
  }
});
var render4 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("v-dialog", { attrs: { "persistent": "", "content-class": "confirmation-box" }, on: { "click:outside": function($event) {
    return _vm.clickOutsideFnc();
  } }, model: { value: _vm.isShow, callback: function($$v) {
    _vm.isShow = $$v;
  }, expression: "isShow" } }, [_c("v-row", { staticClass: "ma-0 mt-2 justify-center" }, [_c("v-col", { staticClass: "pa-0 text-center" }, [_c("v-icon", { attrs: { "color": _vm.dialog.color ? _vm.dialog.color : "default", "size": "150" } }, [_vm._v(_vm._s(_vm.dialog.icon))]), _c("h3", { staticClass: "mt-2" }, [_vm._v(_vm._s(_vm.dialog.title))]), _vm.dialog.message ? _c("span", { domProps: { "innerHTML": _vm._s(_vm.dialog.message) } }) : _vm._e()], 1)], 1), _c("v-row", { staticClass: "ma-0 mt-4 justify-center" }, _vm._l(_vm.dialog.buttons, function(button, index2) {
    return _c("v-col", { key: "button-confirmation-" + index2, staticClass: "pa-0 confirmation-button" }, [_c("v-btn", { attrs: { "color": button.color, "text": "", "width": "100%" }, on: { "click": function($event) {
      return _vm.handleClick(button.result);
    } } }, [_vm._v(_vm._s(button.text))])], 1);
  }), 1)], 1);
};
var staticRenderFns = [];
var ConfirmationBox_vue_vue_type_style_index_0_lang = "";
function normalizeComponent(scriptExports, render5, staticRenderFns2, functionalTemplate, injectStyles, scopeId, moduleIdentifier, shadowMode) {
  var options = typeof scriptExports === "function" ? scriptExports.options : scriptExports;
  if (render5) {
    options.render = render5;
    options.staticRenderFns = staticRenderFns2;
    options._compiled = true;
  }
  if (functionalTemplate) {
    options.functional = true;
  }
  if (scopeId) {
    options._scopeId = "data-v-" + scopeId;
  }
  var hook;
  if (moduleIdentifier) {
    hook = function(context) {
      context = context || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext;
      if (!context && typeof __VUE_SSR_CONTEXT__ !== "undefined") {
        context = __VUE_SSR_CONTEXT__;
      }
      if (injectStyles) {
        injectStyles.call(this, context);
      }
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier);
      }
    };
    options._ssrRegister = hook;
  } else if (injectStyles) {
    hook = shadowMode ? function() {
      injectStyles.call(this, (options.functional ? this.parent : this).$root.$options.shadowRoot);
    } : injectStyles;
  }
  if (hook) {
    if (options.functional) {
      options._injectStyles = hook;
      var originalRender = options.render;
      options.render = function renderWithStyleInjection(h, context) {
        hook.call(context);
        return originalRender(h, context);
      };
    } else {
      var existing = options.beforeCreate;
      options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
    }
  }
  return {
    exports: scriptExports,
    options
  };
}
const __vue2_script = {
  name: "ConfirmationBox",
  components: {
    VDialog,
    VRow,
    VCol,
    VIcon: VIcon$1,
    VBtn
  },
  props: {
    icon: {
      type: String,
      default: "mdi-help-circle-outline"
    },
    color: {
      type: String,
      default: "primary"
    },
    title: {
      type: String,
      default: "Are you sure?"
    },
    clickOutside: {
      type: [Boolean, String, Number, Object],
      default: false
    }
  },
  data() {
    return {
      isShow: false,
      dialog: {
        title: this.title,
        color: this.color,
        icon: this.icon,
        message: "",
        close: this.clickOutside,
        buttons: [{ text: "Ok", result: true, color: "primary" }]
      },
      callback: () => {
      },
      errorCallback: () => {
      }
    };
  },
  methods: {
    setCallback(fn) {
      this.callback = fn;
    },
    setErrorCallback(fn) {
      this.errorCallback = fn;
    },
    resetState() {
      this.dialog = {
        title: this.title,
        color: this.color,
        icon: this.icon,
        message: "",
        close: this.clickOutside,
        buttons: [{ text: "Ok", result: true, color: "primary" }]
      };
    },
    clickOutsideFnc() {
      if (this.dialog.close !== null) {
        this.handleClick(this.dialog.close);
      }
    },
    handleClick(res) {
      this.isShow = false;
      this.callback(res);
    },
    open(params) {
      this.resetState();
      Object.assign(this.dialog, params);
      this.isShow = true;
    }
  }
};
const __cssModules = {};
var __component__ = /* @__PURE__ */ normalizeComponent(__vue2_script, render4, staticRenderFns, false, __vue2_injectStyles, null, null, null);
function __vue2_injectStyles(context) {
  for (let o in __cssModules) {
    this[o] = __cssModules[o];
  }
}
var ConfirmationBox = /* @__PURE__ */ function() {
  return __component__.exports;
}();
var index = {
  install(Vue2, vuetify, options = {}) {
    if (this.installed) {
      return;
    }
    this.installed = true;
    this.options = options || {};
    const Ctor = Vue2.extend(Object.assign({}, { vuetify }, ConfirmationBox));
    const box = (params) => {
      const component = new Ctor(Object.assign({}, ConfirmationBox, {
        propsData: Object.assign({}, this.options)
      }));
      if (typeof params === "string") {
        params = { message: params };
      }
      if (typeof params === "object" && !Array.isArray(params)) {
        const container = document.querySelector("[data-app=true]") || document.body;
        return new Promise((resolve, reject) => {
          component.setCallback((response) => {
            container.removeChild(component.$el);
            resolve(response);
          });
          component.setErrorCallback((error) => {
            container.removeChild(component.$el);
            reject(error);
          });
          container.appendChild(component.$mount().$el);
          component.open(params);
        });
      }
    };
    Vue2.prototype.$confirmationBox = box;
  }
};
export { index as default };
