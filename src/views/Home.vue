<template>
    <div>
      <!-- 头部 -->
        <homeheader :categories=categories @change=change></homeheader>
     <!-- 轮播图 -->
     <cube-slide style="height:200px;width:100%;max-width:100%" :data="items"/>
     
      <div class="content">
        
     <div class="view-wrapper">
  <cube-recycle-list class="list" ref="list" :size="size" :on-fetch="setfilms" :offset="offset">
    <template slot="item" slot-scope="{ data }">
      <div :id="data.id" class="item" @click="handleClick(data)">
        <div class="avatar" :style="{backgroundImage: 'url(' + (data.avatar || '') + ')'}"></div>
        <div class="bubble">
           <img :src="data.pic" alt="">
          <div class="title">
            <p>{{ data.title }}</p>
          <div>{{data.info}}</div>
          </div>
        </div>
       
      </div>
    </template>
  </cube-recycle-list>
  
  <div style="width:100%;text-align:center" v-if='this.hasMore'>
    <cube-loading style="margin-left:170px" :size="28" ></cube-loading>
    <span >正在加载中</span>
  </div>
   
</div>
      </div>
    </div>
    
</template>
<script>
import homeheader from "@/components/HomeHeader.vue";
import {category,slide,getlist} from '../api/home'
import * as types from '../store/actions-type.js'

import {createNamespacedHelpers} from 'vuex';
let {mapState,mapActions,mapMutations} = createNamespacedHelpers('home')
export default {
  name:'home',
   async created(){
     this.offsetIndex=0;
    
//    let res=  await category()  
//    console.log(res)
   this[types.GET_CATEGORY]()
   let res=await slide();
   
     this.items=res
     this.setfilms()
   
   
    },
 
  data() {
    return {
      items: [
      ],
      size: 5,
      offset: 100,
      hasMore:true,
     // size:3,
      movelist:null
    };
  
  },
  computed:{
    ...mapState(['categories','selectIndex'])
  },
  components:{
      homeheader
  },
  methods:{

      ...mapActions([types.GET_CATEGORY]),
      ...mapMutations([types.SELECT_INDEX]),
      change(index){
       this[types.SELECT_INDEX](index)
       this.hasMore=true //当点击了菜单，把hasMore置为true
       this.offsetIndex=0;
       this.$refs.list.reset()
      },
    async  setfilms(){
      let index=this.selectIndex
        if(this.hasMore){
            let res =await getlist(index,this.offsetIndex,this.size)
            let {result,hasMore}=res;
            this.hasMore=hasMore;
            this.offsetIndex=this.offsetIndex+result.length;
         
            return result;
        }else{
          return false
        }
      },
  }
  
};
</script>
<style lang="stylus" scoped>

  .content{
     max-height: calc(100vh - 50px - 200px - 65px );
     overflow scroll
   
  }
  .bubble{
    display flex
    justify-content space-around
    align-items center
    margin-top 20px
    img{
      width 100px
      height 150px

    }
    div{
     font-weight fold 
     font-size 30px
     line-height 40px
    }

  }
</style>