let _Vue = null;

export default class VueRouter {
  static install(Vue) {
    // 1. 判断当前插件是否已经被安装
    if (VueRouter.install.installed) {
      return;
    }
    VueRouter.install.installed = true;
    // 2. 把 vue 构造函数记录到全局变量
    _Vue = Vue;
    // 3. 把创建 vue 实例时候传入的 router 对象注入到 vue 实例上
    // 混入
    _Vue.mixin({
      beforeCreate() {
        // 组件中没有 router 这个对象
        if (this.$options.router) {
          _Vue.prototype.$router = this.$options.router;
          this.$options.router.init();
        }
      }
    });
  }

  constructor(options) {
    this.options = options;
    this.routerMap = {};
    this.data = _Vue.observable({
      current: "/"
    });
  }

  createRouteMap() {
    // 遍历所有的路由规则，把路由规则解析成键值对的形式 存储到 routeMap 中
    this.options.routes.forEach(route => {
      this.routerMap[route.path] = route.component;
    });
  }

  initComponents(Vue) {
    Vue.component("router-link", {
      props: {
        to: String
      },
      render(h) {
        return h(
          "a",
          {
            attrs: {
              href: `#${this.to}`
            },
            on: {
              click: this.clickHandler
            }
          },
          [this.$slots.default]
        );
      },
      methods: {
        clickHandler(e) {
          window.location.hash = `#${this.to}`;
          this.$router.data.current = this.to;
          e.preventDefault();
        }
      }
    });

    const self = this;

    Vue.component("router-view", {
      render(h) {
        const component = self.routerMap[self.data.current];
        return h(component);
      }
    });
  }

  initEvent() {
    window.addEventListener("load", this.hashChange.bind(this));
    window.addEventListener("hashchange", this.hashChange.bind(this));
  }

  hashChange() {
    if (!window.location.hash) {
      window.location.hash = "#/";
    }
    this.data.current = window.location.hash.substring(1);
  }

  init() {
    this.createRouteMap();
    this.initComponents(_Vue);
    this.initEvent();
  }
}
