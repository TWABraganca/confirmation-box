function p(e, t, i, l, s, o, c, d) {
  var n = typeof e == "function" ? e.options : e;
  t && (n.render = t, n.staticRenderFns = i, n._compiled = !0), l && (n.functional = !0), o && (n._scopeId = "data-v-" + o);
  var a;
  if (c ? (a = function(r) {
    r = r || // cached call
    this.$vnode && this.$vnode.ssrContext || // stateful
    this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext, !r && typeof __VUE_SSR_CONTEXT__ < "u" && (r = __VUE_SSR_CONTEXT__), s && s.call(this, r), r && r._registeredComponents && r._registeredComponents.add(c);
  }, n._ssrRegister = a) : s && (a = d ? function() {
    s.call(
      this,
      (n.functional ? this.parent : this).$root.$options.shadowRoot
    );
  } : s), a)
    if (n.functional) {
      n._injectStyles = a;
      var m = n.render;
      n.render = function(g, f) {
        return a.call(f), m(g, f);
      };
    } else {
      var u = n.beforeCreate;
      n.beforeCreate = u ? [].concat(u, a) : [a];
    }
  return {
    exports: e,
    options: n
  };
}
const _ = {
  name: "ConfirmationBox",
  props: {
    icon: {
      type: [Boolean, String],
      default: !1
    },
    iconSize: {
      type: Number,
      default: 12
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
      default: !1
    },
    theme: {
      type: Object,
      default: () => {
      }
    }
  },
  data() {
    return {
      dialog: {
        title: this.title,
        color: this.color,
        icon: this.icon,
        iconSize: this.iconSize,
        message: "",
        close: this.clickOutside,
        buttons: [{ text: "Ok", result: !0, color: "primary" }]
      },
      callback: () => {
      },
      errorCallback: () => {
      }
    };
  },
  mounted() {
    window.addEventListener("click", this.clickOutsideFnc);
  },
  destroyed() {
    window.removeEventListener("click", this.clickOutsideFnc);
  },
  methods: {
    swapHoverEffect(e, t = "transparent") {
      const i = e.target;
      if (t !== "transparent") {
        const l = this.getRGBColor(this.theme[t] || t);
        i.style.backgroundColor = `rgba(${l[0]}, ${l[1]}, ${l[2]}, 0.1)`;
      } else
        i.style.backgroundColor = t;
    },
    setIconStyle(e) {
      const t = this.getRGBColor(e), i = t[0] * 0.299 + t[1] * 0.587 + t[2] * 0.114;
      return {
        backgroundColor: this.theme[e] || e,
        color: i > 186 ? "black" : "white",
        width: this.dialog.iconSize * 1.8 + "px",
        height: this.dialog.iconSize * 1.8 + "px",
        fontSize: this.dialog.iconSize + "px"
      };
    },
    setColors(e) {
      return {
        color: this.theme[e] || e
      };
    },
    getRGBColor(e) {
      const t = document.createElement("canvas");
      t.width = 1, t.height = 1;
      const i = t.getContext("2d");
      return i.fillStyle = this.theme[e] || e, i.fillRect(0, 0, 1, 1), i.getImageData(0, 0, 1, 1).data;
    },
    open(e) {
      this.resetState(), Object.assign(this.dialog, e);
    },
    handleClick(e) {
      this.callback(e);
    },
    clickOutsideFnc() {
      let e = document.getElementById("my-modal");
      event.target == e && this.dialog.close !== null && this.handleClick(this.dialog.close);
    },
    setCallback(e) {
      this.callback = e;
    },
    setErrorCallback(e) {
      this.errorCallback = e;
    },
    resetState() {
      this.dialog = {
        title: this.title,
        color: this.color,
        icon: this.icon,
        iconSize: this.iconSize,
        message: "",
        close: this.clickOutside,
        buttons: [{ text: "Ok", result: !0, color: "primary" }]
      };
    }
  }
};
var C = function() {
  var t = this, i = t._self._c;
  return i("div", { staticClass: "fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center", attrs: { id: "my-modal" } }, [i("div", { staticClass: "confirmation-box relative w-96 shadow-lg" }, [i("div", { staticClass: "p-5 text-center flex flex-col" }, [t.dialog.icon ? i("div", { staticClass: "confirmation-icon mx-auto flex items-center justify-center rounded-full", style: t.setIconStyle(t.dialog.color) }, [i("i", { class: t.dialog.icon })]) : t._e(), i("h3", { staticClass: "confirmation-title text-lg leading-6 font-medium text-gray-900 mt-4" }, [t._v(" " + t._s(t.dialog.title) + " ")]), t.dialog.message ? i("div", { staticClass: "confirmation-text mt-1 p-1" }, [i("span", { staticClass: "text-sm text-gray-500", domProps: { innerHTML: t._s(t.dialog.message) } })]) : t._e()]), i("div", { staticClass: "rounded-[inherit] flex" }, t._l(t.dialog.buttons, function(l, s) {
    return i("button", { key: "button-confirmation-" + s, staticClass: "confirmation-button px-4 py-2 text-base font-medium w-full shadow-sm", style: t.setColors(l.color), on: { click: function(o) {
      return t.handleClick(l.result);
    }, mouseover: function(o) {
      return t.swapHoverEffect(o, l.color);
    }, mouseleave: function(o) {
      return t.swapHoverEffect(o);
    } } }, [t._v(" " + t._s(l.text) + " ")]);
  }), 0)])]);
}, y = [], v = /* @__PURE__ */ p(
  _,
  C,
  y,
  !1,
  null,
  "18049181",
  null,
  null
);
const h = v.exports, b = {
  install(e, t = {}) {
    if (this.installed)
      return;
    this.installed = !0, this.options = t || {};
    const i = e.extend(Object.assign({}, h)), l = (s) => {
      const o = new i(
        Object.assign({}, h, {
          propsData: Object.assign({}, this.options)
        })
      );
      if (typeof s == "string" && (s = { message: s }), typeof s == "object" && !Array.isArray(s)) {
        const c = document.querySelector("[data-app=true]") || document.body;
        return new Promise((d, n) => {
          o.setCallback((a) => {
            c.removeChild(o.$el), o.$destroy(), d(a);
          }), o.setErrorCallback((a) => {
            c.removeChild(o.$el), o.$destroy(), n(a);
          }), c.appendChild(o.$mount().$el), o.open(s);
        });
      }
    };
    e.prototype.$confirmationBox = l;
  }
};
export {
  b as default
};
