# fed-e-task-03-01

手写 Vue Router、手写响应式实现、虚拟 DOM 和 Diff 算法

### 一、简答题

#### 1、当我们点击按钮的时候动态给 data 增加的成员是否是响应式数据，如果不是的话，如何把新增成员设置成响应式数据，它的内部原理是什么。

```javascript
let vm = new Vue({
 el: '#el'
 data: {
  o: 'object',
  dog: {}
 },
 method: {
  clickHandler () {
   // 该 name 属性是否是响应式的
   this.dog.name = 'Trump'
  }
 }
})
```

不是响应式数据。

设置为响应式的两种方式：

1. 给 dog 的属性 name 设置一个初始值，可以为空字符串或者 undefined

> 由于 Vue 不允许动态添加根级响应式 property，所以你必须在初始化实例前声明所有根级响应式 property，哪怕只是一个空值

原理：初始化的时候通过 **Object.defineProperty()** 给对象属性设置监听（Vue 2.x）。如果不声明 property，将不会有监听。

```javascript
let vm = new Vue({
    el: '#el'
    data: {
     o: 'object',
     dog: {
        name: ''
     }
    },
    method: {
     clickHandler () {
      this.dog.name = 'Trump'
     }
    }
   })
```

2. 通过 **Vue.set(object, propertyName, value)** 方法向嵌套对象添加响应式 , 还可以使用 **vm.\$set** 实例方法，这也是全局 Vue.set 方法的别名

原理：通过 **vm.\$set** 设置值，内部调用 **defineReactive()** 监听对象，实则还是 **Object.defineProperty()** （Vue 2.x）

```javascript
 let vm = new Vue({
  el: '#el'
  data: {
   o: 'object',
   dog: {
      name: ''
    }
  },
  method: {
   clickHandler () {
    this.$set(this.data.dog, name, 'Trump')
   }
  }
 })
```

#### 2、请简述 Diff 算法的执行过程

- 找同级别的子节点进行比较，然后再找下一级别的节点比较。
- 在进行同级别节点比较的时候，首先会对新老节点数组的开始和结尾节点设置标记索引，遍历的过程中移动索引
- 在对开始和结束节点比较的时候，总共有四种情况
  - oldStartVnode / newStartVnode (旧开始节点/新开始节点)
  - oldEndVnode / newEndVnode (旧结束节点/新结束节点)
  - oldStartVnode/ newEndVnode (旧开始节点/新结束节点)
  - oldEndVnode/ newStartVnode (旧结束节点/新开始节点)
- 如果不是以上 4 种情况
  - 遍历新节点，使用 newStartVNode 的 kye 在老节点数组中找相同节点
  - 如果没有找到，说明 newStartVnode 是新节点
    - 创建新节点对应的 dom 元素，插入到 dom 中
  - 如果找到了
    - 判断新节点和找到的老节点 sel 选择器是否相同
    - 如果不相同，说明节点被修改了
      - 重新创建对应的 dom 元素，插入 dom 树中
    - 如果相同，把 elmToMove 对应的 dom 元素，移动到左边
- 循环结束
  - 如果老节点的数组先遍历完，说明新节点有剩余，把剩余节点批量插入到右边
  - 如果新节点的数组先遍历完，说明老节点有剩余，把剩余节点批量删除

### 二、编程题

#### 1、模拟 VueRouter 的 hash 模式的实现，实现思路和 History 模式类似，把 URL 中的 # 后面的内容作为路由的地址，可以通过 hashchange 事件监听路由地址的变化。

vue-hash-demo -> vue-router -> index.js

#### 2、在模拟 Vue.js 响应式源码的基础上实现 v-html 指令，以及 v-on 指令。

#### 3、参考 Snabbdom 提供的电影列表的示例，利用 Snabbdom 实现类似的效果，如图：
