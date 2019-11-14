import Vue from 'vue'
import VueRouter from 'vue-router'
import home from '@/views/Home.vue'
import loadable from '@/utils/loading'


Vue.use(VueRouter)

const routes = [
  {
    path:'/',
    redirect:'/home'
  },
 {
  path:'/home',
  name:'home',
  meta:{keepAlive:true,idx:0},
  component:home
 },
 {
  path:'/profile',
  name:'profile',
  component:loadable(()=>import('@/views/Profile.vue')),
  meta:{keepAlive:false,idx:2},
 },
 {
  path:'/movie',
  name:'movie',
  component:loadable(()=>import('@/views/Movie.vue')),
  meta:{keepAlive:false,idx:1},
 }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
