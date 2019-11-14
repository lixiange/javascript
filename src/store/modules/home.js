import * as types from '../actions-type'
import {category,getlist} from '../../api/home'
export default{
    //每一个里都设置，这个文件中的对象只有在这个文件夹中才能访问
    namespaced:true,
    state:{
        categories:[],
        selectIndex:-1,

    },
    mutations:{
      [types.GET_CATEGORY](state,payload){
            state.categories=payload
        },
        [types.SELECT_INDEX](state,index){
            state.selectIndex=index
        }
    },
    actions:{
       async [types.GET_CATEGORY]({commit}){
        let res=await category();
        
        commit(types.GET_CATEGORY,res)
        },
      
    }
}