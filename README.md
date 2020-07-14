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

### 二、编程题

#### 1、模拟 VueRouter 的 hash 模式的实现，实现思路和 History 模式类似，把 URL 中的 # 后面的内容作为路由的地址，可以通过 hashchange 事件监听路由地址的变化。

#### 2、在模拟 Vue.js 响应式源码的基础上实现 v-html 指令，以及 v-on 指令。

#### 3、参考 Snabbdom 提供的电影列表的示例，利用 Snabbdom 实现类似的效果，如图：
