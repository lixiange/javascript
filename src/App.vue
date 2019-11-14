<template>
  <div id="app">
   <div class="container">
     <transition :name='move'>
        <keep-alive >
        <router-view v-if="$route.meta.keepAlive"></router-view>
     </keep-alive>
     </transition>
      <transition :name='move'>
        <router-view v-if="!$route.meta.keepAlive"></router-view>
     </transition>
    
   </div>
   <div class="footer">
       <cube-tab-bar
    v-model="selectedLabelDefault"
    :data="tabs"
  
    @change="changeHandler">
  </cube-tab-bar>
   </div>
   
  </div>
</template>
<script>

export default {
  components:{
    
  },
  data(){
    return{
      move:'',
        selectedLabelDefault: '/',
      tabs: [{
        label: '主页',
        value:'/home',
        icon: 'cubeic-home'
      }, {
        label: '电影中心',
        value:'/movie',
        icon: 'cubeic-like'
      },  {
        label: '我的',
        value:'/profile',
        icon: 'cubeic-person'
      }]
    }
  },
  watch:{
    $route:{
      handler(to,from){
      //  console.log(to)
        this.selectedLabelDefault=to.path;
        if(to && from){
          // 点击了tabbar
          if(to.meta.idx > from.meta.idx){
            this.move = "slide-left"
          }else{
            this.move = "slide-right"
          }
        }

            
       
        }
    }
  },
  
  methods:{

    changeHandler (label) {
     this.$router.push(label)
     
    }
  },
  
  
}
</script>
<style lang='stylus' >
 #app, html,body{
   font-size 8px
   width 100%
   height 100%
 }
 #app{
  
   display flex
   flex-direction column
 }
 .container{
    flex 1
  }
  .footer{
    height 50px
    background-color #ccc ;
   
  }
  .cube-tab{
    i{
      font-size 15px
    }
  }
 .slide-left-enter-active, .slide-left-leave-active,.slide-right-enter-active, .slide-right-leave-active{
  transition all 0.3s linear;
}
.slide-left-enter-active,.slide-right-enter-active{
  position absolute
  top 0
  left 0 
  width 100%
}
.slide-left-enter{
  transform: translate3d(100%, 0, 0);
}
.slide-left-leave-to{
   transform: translate3d(-100%, 0, 0);
}
.slide-right-enter{
   transform: translate3d(-100%, 0, 0);
}
.slide-right-leave-to{
  transform: translate3d(100%, 0, 0);
}
  
  
 
</style>
