import Vue from 'vue'
import './cube-ui'
import App from './App.vue'
import router from './router'
import store from './store'
import 'amfe-flexible'

Vue.config.productionTip = false
//封装一个$dispatch,逐层遍历父元素，调用每个父元素中的eventName
Vue.prototype.$dispatch=function(eventName,value){
  let parent=this.$parent;
  while(parent){
    parent.$emit(eventName,value)
    parent=parent.$parent;
    
  }
}
//封装一个空的vue实例作为事件总线，在其他的任意组件中采用发布订阅的方式来实现数据传递
Vue.prototype.$event=new Vue()
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
