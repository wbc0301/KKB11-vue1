/* 
  理解vue-router实现原理
  1：实现插件
  2：URL变化监听
  3：路由配置解析：   {'/': Home}
  4: 实现全局组件：<router-link> <router-view>
*/
let Vue = null;
class VueRouter {
  constructor(options) {
    this.$options = options;
    this.routeMap = {};
    this.app = new Vue({ // 路由响应式   vue-router 内部利用了Vue的响应式，所以和vue是强绑定的关系，只能用在vue中，不同于react-router
      data: {
        currentUrl: '/'
      }
    });
  }

  _init() {
    this._bindEvents();
    this._createRouteMap(this.$options);
    this._initComponent();
  }

  _bindEvents() {  // 监听URL变化
    window.addEventListener("load", this._onHashChange.bind(this));
    window.addEventListener("hashchange", this._onHashChange.bind(this));
  }
  _onHashChange() { // hashchange 是改变 current
    this.app.currentUrl = window.location.hash.slice(1) || "/";
  }
  _createRouteMap(options) { // 解析路由配置
    options.routes.forEach(item => {
      this.routeMap[item.path] = item.component;
    });
  }
  _initComponent() {  // 实现两个全局组件  <router-link to="">fff</router-link>
    Vue.component("router-link", {
      props: { to: String },
      render(h) { // h(tag, data, children) // 没有编译器，所有不能写成template
        return h("a", { attrs: { href: "#" + this.to } }, [this.$slots.default]);
      }
    });
    Vue.component("router-view", {
      render: h => {
        const comp = this.routeMap[this.app.currentUrl];
        return h(comp);
      }
    });
  }
}

VueRouter.install = function (vue) { // Vue插件必须有一个 install 方法
  Vue = vue;
  vue.mixin({
    beforeCreate() {
      if (this.$options.router) { // this是Vue实例  （不是 VueComponent 的实例） 仅在根组件执行一次
        vue.prototype.$router = this.$options.router;
        this.$options.router._init();
      }
    }
  });
};

export default VueRouter;
