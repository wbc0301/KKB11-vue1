/*
  1：创建一个插件
  2：创建 Store类
  3：实现4个东西： state/getter/mutations/actions
  4：数据响应式
 */
let Vue = null;
class Store {
  constructor(options) {
    
    this.state = new Vue({
      data: options.state
    });
    this.mutations = options.mutations;
    this.actions = options.actions;
    options.getters && this.handleGetters(options.getters)
  }

  commit = (type, arg) => { // 声明为箭头函数，why？ 实现commit
    this.mutations[type](this.state, arg);
  };

  dispatch(type, arg) {     // 实现actions
    this.actions[type]({ commit: this.commit, state: this.state }, arg);
  }

  handleGetters(getters) {
    this.getters = {};
    Object.keys(getters).forEach(key => { // 遍历getters所有key
      Object.defineProperty(this.getters, key, { // 为this.getters定义若干属性，这些属性是只读的    $store.getters.score
        get: () => {
          return getters[key](this.state);
        }
      })
    })
  }
}

function install(_Vue) {
  Vue = _Vue;
  Vue.mixin({
    beforeCreate() {
      if (this.$options.store) { // this是 Vue实例  （不是 VueComponent 的实例） 仅在根组件执行一次
        Vue.prototype.$store = this.$options.store;
      }
    }
  });
}

export default { Store, install };
