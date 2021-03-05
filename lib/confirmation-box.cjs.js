'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var Vue = _interopDefault(require('vue'));

function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function (obj) {
      return typeof obj;
    };
  } else {
    _typeof = function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

var events = new Vue({
  name: 'ConfirmationBox'
});

//
Vue.directive('focus', {
  inserted: function inserted(el) {
    el.focus();
  }
});
var script = {
  name: 'ConfirmationBox',
  props: {
    icon: {
      type: String,
      default: 'mdi-help-circle-outline'
    },
    color: {
      type: String,
      default: 'primary'
    },
    title: {
      type: String,
      default: 'Are you sure?'
    },
    clickOutside: {
      type: [Boolean, String, Number, Object],
      default: false
    }
  },
  data: function data() {
    return {
      isShow: false,
      dialog: {
        title: this.title,
        color: this.color,
        icon: this.icon,
        message: '',
        close: this.clickOutside,
        buttons: [{
          text: 'Ok',
          result: true,
          color: 'primary'
        }]
      },
      callback: function callback() {},
      errorCallback: function errorCallback() {}
    };
  },
  mounted: function mounted() {
    var _this = this;

    if (!document) return;
    events.$on('open', this.open);
    events.$on('close', function () {
      _this.errorCallback('Confirmation box forcibly closed!');
    });
  },
  methods: {
    resetState: function resetState() {
      this.dialog = {
        title: this.title,
        color: this.color,
        icon: this.icon,
        message: '',
        close: this.clickOutside,
        buttons: [{
          text: 'Ok',
          result: true,
          color: 'primary'
        }]
      };
    },
    clickOutsideFnc: function clickOutsideFnc() {
      if (this.dialog.close !== null) {
        this.handleClick(this.dialog.close);
      }
    },
    handleClick: function handleClick(res) {
      this.callback(res);
      this.isShow = false;
    },
    open: function open(params, fn1, fn2) {
      this.resetState();
      Object.assign(this.dialog, params);
      this.callback = fn1;
      this.errorCallback = fn2;
      this.isShow = true;
    }
  }
};

function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier
/* server only */
, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
  if (typeof shadowMode !== 'boolean') {
    createInjectorSSR = createInjector;
    createInjector = shadowMode;
    shadowMode = false;
  } // Vue.extend constructor export interop.


  var options = typeof script === 'function' ? script.options : script; // render functions

  if (template && template.render) {
    options.render = template.render;
    options.staticRenderFns = template.staticRenderFns;
    options._compiled = true; // functional template

    if (isFunctionalTemplate) {
      options.functional = true;
    }
  } // scopedId


  if (scopeId) {
    options._scopeId = scopeId;
  }

  var hook;

  if (moduleIdentifier) {
    // server build
    hook = function hook(context) {
      // 2.3 injection
      context = context || // cached call
      this.$vnode && this.$vnode.ssrContext || // stateful
      this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext; // functional
      // 2.2 with runInNewContext: true

      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__;
      } // inject component styles


      if (style) {
        style.call(this, createInjectorSSR(context));
      } // register component module identifier for async chunk inference


      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier);
      }
    }; // used by ssr in case component is cached and beforeCreate
    // never gets called


    options._ssrRegister = hook;
  } else if (style) {
    hook = shadowMode ? function () {
      style.call(this, createInjectorShadow(this.$root.$options.shadowRoot));
    } : function (context) {
      style.call(this, createInjector(context));
    };
  }

  if (hook) {
    if (options.functional) {
      // register for functional component in vue file
      var originalRender = options.render;

      options.render = function renderWithStyleInjection(h, context) {
        hook.call(context);
        return originalRender(h, context);
      };
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate;
      options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
    }
  }

  return script;
}

var normalizeComponent_1 = normalizeComponent;

var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
function createInjector(context) {
  return function (id, style) {
    return addStyle(id, style);
  };
}
var HEAD = document.head || document.getElementsByTagName('head')[0];
var styles = {};

function addStyle(id, css) {
  var group = isOldIE ? css.media || 'default' : id;
  var style = styles[group] || (styles[group] = {
    ids: new Set(),
    styles: []
  });

  if (!style.ids.has(id)) {
    style.ids.add(id);
    var code = css.source;

    if (css.map) {
      // https://developer.chrome.com/devtools/docs/javascript-debugging
      // this makes source maps inside style tags work properly in Chrome
      code += '\n/*# sourceURL=' + css.map.sources[0] + ' */'; // http://stackoverflow.com/a/26603875

      code += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) + ' */';
    }

    if (!style.element) {
      style.element = document.createElement('style');
      style.element.type = 'text/css';
      if (css.media) style.element.setAttribute('media', css.media);
      HEAD.appendChild(style.element);
    }

    if ('styleSheet' in style.element) {
      style.styles.push(code);
      style.element.styleSheet.cssText = style.styles.filter(Boolean).join('\n');
    } else {
      var index = style.ids.size - 1;
      var textNode = document.createTextNode(code);
      var nodes = style.element.childNodes;
      if (nodes[index]) style.element.removeChild(nodes[index]);
      if (nodes.length) style.element.insertBefore(textNode, nodes[index]);else style.element.appendChild(textNode);
    }
  }
}

var browser = createInjector;

/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('v-dialog',{attrs:{"persistent":"","content-class":"confirmation-box"},on:{"click:outside":function($event){return _vm.clickOutsideFnc()}},model:{value:(_vm.isShow),callback:function ($$v) {_vm.isShow=$$v;},expression:"isShow"}},[_c('v-row',{staticClass:"ma-0 mt-2 justify-center"},[_c('v-col',{staticClass:"pa-0 text-center"},[_c('v-icon',{attrs:{"color":_vm.dialog.color ? _vm.dialog.color : 'default',"size":"150"}},[_vm._v(_vm._s(_vm.dialog.icon))]),_vm._v(" "),_c('h3',{staticClass:"mt-2"},[_vm._v(_vm._s(_vm.dialog.title))]),_vm._v(" "),(_vm.dialog.message)?_c('span',[_vm._v(_vm._s(_vm.dialog.message))]):_vm._e()],1)],1),_vm._v(" "),_c('v-row',{staticClass:"ma-0 mt-4 justify-center"},_vm._l((_vm.dialog.buttons),function(button,index){return _c('v-col',{key:'button-confirmation-' + index,staticClass:"pa-0 confirmation-button"},[_c('v-btn',{attrs:{"color":button.color,"text":"","width":"100%"},on:{"click":function($event){return _vm.handleClick(button.result)}}},[_vm._v(_vm._s(button.text))])],1)}),1)],1)};
var __vue_staticRenderFns__ = [];

  /* style */
  const __vue_inject_styles__ = function (inject) {
    if (!inject) return
    inject("data-v-81ef2d0e_0", { source: ".confirmation-box{width:350px!important;background-color:#fff;border-radius:25px!important}.confirmation-box .v-icon::after{height:unset!important}.confirmation-button .v-btn{border-radius:0;border-top:1px solid rgba(0,0,0,.12);border-right:1px solid rgba(0,0,0,.12)}.confirmation-button:last-of-type .v-btn{border-right:none}", map: undefined, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__ = undefined;
  /* module identifier */
  const __vue_module_identifier__ = undefined;
  /* functional template */
  const __vue_is_functional_template__ = false;
  /* style inject SSR */
  

  
  var ConfirmationBox = normalizeComponent_1(
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    browser,
    undefined
  );

var index = {
  install: function install(Vue$$1) {
    if (this.installed) {
      return;
    }

    this.installed = true;
    Vue$$1.component('confirmationBox', ConfirmationBox);

    var box = function box(params) {
      if (typeof params === 'string') {
        params = {
          message: params
        };
      }

      if (_typeof(params) === 'object' && !Array.isArray(params)) {
        return new Promise(function (resolve, reject) {
          events.$emit('open', params, function (response) {
            resolve(response);
          }, function (error) {
            reject(error);
          });
        });
      }
    };

    box.close = function () {
      events.$emit('close');
    };

    Vue$$1.prototype.$confirmationBox = box;
    Vue$$1.confirmationBox = box;
  }
};

module.exports = index;
