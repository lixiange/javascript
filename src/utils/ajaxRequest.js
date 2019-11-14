import axios from 'axios'
import{Toast} from 'cube-ui'

class ajaxRequest{
    constructor(){
        this.baseURL=process.env.NODE_ENV !=='production'?'http://localhost:3000/api':"www.baidu.com"
        this.timeout=5000;
        this.toast=Toast.$create({
            txt:'Loading...',
            time:0
        })
        this.queue={}
    }
    merge(options){
        return{...options,baseURL:this.baseURL,timeout:this.timeout}

    }
    setInterceptor(install,url){
        install.interceptors.request.use((config)=>{
            if(Object.keys(this.queue).length==0){
                this.toast.show()
            }
            this.queue[url]==url;
                
                return config
           
        },error=>{
            return Promise.reject(error)
        })
        install.interceptors.response.use((response)=>{
            delete this.queue[url]
            if(Object.keys(this.queue).length===0){
                this.toast.hide()
            }
            return response.data.data
        },error=>{
            return Promise.reject(error)
        })
    }
    request(options){
      
        let install=axios.create();
        let config=this.merge(options)
        this.setInterceptor(install,options.url)
        return install(config)
    }
}

export default new ajaxRequest()