class KVue {
  constructor(options) {
    this.$options = options;
    this.$data = options.data;
    this.observe(this.$data); // 响应化
    // new Watcher(this, 'test'); // 测试代码
    // this.test;
    new Compile(options.el, this); // 创建编译器
    if (options.created) {
      options.created.call(this);
    }
  }
  observe($data) { // 递归遍历，使传递进来的对象响应化
    if (!$data || typeof $data !== "object") return;
    Object.keys($data).forEach(key => {  // 遍历
      this.defineReactive($data, key, $data[key]); // 对key做响应式处理
      this.proxyData(key);
    });
  }
  defineReactive($data, key, val) { // @@@ 666 这个函数被调用时形成了闭包，只要KVue实例存在，对$data的劫持就不能被回收
    this.observe(val);// 递归
    const dep = new Dep();// 创建Dep实例：Dep和key一对一对应
    Object.defineProperty($data, key, {// 给obj定义属性
      get() {  
        Dep.target && dep.addwatcher(Dep.target); // 将Dep.target指向的Watcher实例加入到Dep中      
        return val;
      },
      set(newVal) {
        if (newVal !== val) {
          val = newVal;
          dep.notify();
        }
      }
    });
  }
  proxyData(key) {  // 在vue根上定义属性代理data中的数据
    Object.defineProperty(this, key, {
      get() {
        return this.$data[key];
      },
      set(newVal) {
        this.$data[key] = newVal;
      }
    });
  }
}
class Dep { // Dep:管理若干watcher实例，通知watcher更新，它和key一对一关系
  constructor() {
    this.watchers = [];
  }
  addwatcher(watcher) {
    this.watchers.push(watcher);
  }
  notify() {
    this.watchers.forEach(watcher => watcher.update());
  }
}
class Watcher { // 保存ui中依赖，实现update函数可以更新之
  constructor(vm, key, cb) {
    this.vm = vm;
    this.key = key;
    this.cb = cb;
    Dep.target = this; // 将当前实例指向Dep.target
    this.vm[this.key]; // 读一次key触发getter
    Dep.target = null;
  }
  update() {
    this.cb.call(this.vm, this.vm[this.key])
    // console.log(`${this.key}属性更新了`);
  }
}
