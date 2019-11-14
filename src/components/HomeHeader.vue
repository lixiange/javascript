<template>

  <div>
    <!-- 头 -->
    <div class="header">
    主页面
    <i class="iconfont iconmore1" @click="showDrawer"></i>
  </div>
  <!-- {{categories}} -->
  <!-- 抽屉 -->
<cube-drawer
  ref="drawer"
  title="想看"
  :data="data"
  :selected-index="selectedIndex"
  @select="selectHandler"
  @cancel="cancelHandler"
  
  ></cube-drawer>
  </div>
</template>
<script>
import { category } from '../api/home';
export default {
  props:{
    categories:{
      type:Array,
      
    }
  },
  data() {
    return {
       selectedIndex: [],
    };
  },
  computed:{
   data() {
      let allActive = [{ text: "全部电影", value: -1 }];
      return this.categories.length > 0
        ? [[...allActive, ...this.categories]]
        : [allActive];
    }
  },
  methods:{
       showDrawer() {
      this.$refs.drawer.show()
    },
    
    selectHandler(selectedVal, selectedIndex, selectedText) {
      this.$emit('change',selectedVal)
    // console.log(selectedIndex)
     // console.log(selectedText)
    },
    cancelHandler() {
      console.log('cancel')
    }
  }
};
</script>
<style lang="stylus" scoped>
      .header{
       
        height 30px
        display flex
        justify-content space-between
        line-height 30px
        background #cccccc
        padding 10px
    }
</style>>