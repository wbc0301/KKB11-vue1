/* 
  理解vue-router实现原理
  1：实现插件
  2：URL变化监听
  3：路由配置解析：   {'/': Home}
  4: 实现全局组件：<router-link> <router-view>
*/

// 创建 router插件   Vue插件必须有一个 install 方法
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

  init() {
    this.bindEvents();    //监听url变化
    this.createRouteMap(this.$options); //解析路由配置
    this.initComponent(); // 实现两个组件
  }

  bindEvents() {  // 监听URL变化
    window.addEventListener("load", this.onHashChange.bind(this));
    window.addEventListener("hashchange", this.onHashChange.bind(this));
  }
  onHashChange() { // hashchange是改变current
    this.app.currentUrl = window.location.hash.slice(1) || "/";
  }
  createRouteMap(options) {
    options.routes.forEach(item => {
      this.routeMap[item.path] = item.component;
    });
  }
  initComponent() { // <router-link to="">fff</router-link>
    Vue.component("router-link", {
      props: { to: String },
      render(h) { // h(tag, data, children)
        return h("a", { attrs: { href: "#" + this.to } }, [
          this.$slots.default
        ]);
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

VueRouter.install = function (vue) {
  Vue = vue;
  Vue.mixin({  // 混入
    beforeCreate() {
      if (this.$options.router) { // this是 Vue实例  （不是 VueComponent 的实例） 仅在根组件执行一次
        Vue.prototype.$router = this.$options.router;
        this.$options.router.init();
      }
    }
  });
};

export default VueRouter;
