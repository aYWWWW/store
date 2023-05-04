// 配置axions
import axios from "axios";


// 创建实例对象

const instance = axios.create({
    baseURL:"http://106.15.3.117:3000/",  //请求地址前缀
    timeout:5000        //超时时间
})

// 添加拦截器

instance.interceptors.request.use((config)=>{
     // 对响应数据做点什么
    config.headers.Authorization=sessionStorage.getItem("token")
    return config
},(error)=>{

//    对响应错误做点什么
    return Promise.reject(error);
})

instance.interceptors.response.use((res)=>{
    return res.data
},(error)=>{
    return Promise.reject(error)
})
export default instance

