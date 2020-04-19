import Vue from 'vue';

export default function create(Component, props) {
  const vm = new Vue({ // 先创建实例 (独立项目组件树之外)
    render(h) { // h 就是 createElement，它返回 VNode      
      return h(Component, { props })
    }
  }).$mount();

  document.body.appendChild(vm.$el);  // 手动挂载 （必须手动挂载）

  // 销毁方法
  let comp = vm.$children[0];
  comp.remove = function () {
    document.body.removeChild(vm.$el);
    vm.$destroy();
  }
  console.log(vm); // Vue instance
  console.log(comp); // VueComponent instance
  return comp;
}