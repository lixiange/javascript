import axios from '../utils/ajaxRequest'
import {getUrlConcat} from '../utils/common'

export const category=()=>{
    return axios.request({
      
        url:'/category',
        method:'get',
    })
}
export const slide=()=>{
    return axios.request({
        url:'/slides',
        method:'get'
    })
}
export const getlist=(currentIndex,offset,size)=>{

    return axios.request({
        method:'get',
        url:`/lessonList/${currentIndex}?offset=${offset}&size=${size}`
    })
}