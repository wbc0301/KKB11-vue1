import Vue from 'vue';

export default function create(Component, props) {
    // 先创建实例 (独立项目组件树之外)
    const vm = new Vue({
        render(h) {
            // h 就是 createElement，它返回 VNode
            return h(Component, {props})
        }
    }).$mount();

    // 手动挂载 （必须手动挂载）
    document.body.appendChild(vm.$el);

    // 销毁方法
    let comp = vm.$children[0];
    comp.remove = function() {
        document.body.removeChild(vm.$el);
        vm.$destroy();
    }
    return comp;
}