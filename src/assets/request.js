import axios from "axios";
import qs from "qs";
import router from '../router/index'
import { Message } from 'element-ui'

const service = axios.create({
    // baseURL: 'http://192.168.100.87:8080/dossier',  // api的base_url 
    baseURL: 'http://192.168.2.99:8080/dossier',
    timeout: 50000  // 请求超时时间
})

service.interceptors.request.use(config => {
    console.log(config)
    if (localStorage.getItem('auth')) {
        config.headers['kf-token'] = localStorage.getItem('auth');
    }
    config.method === 'post' 
        ? config.data = qs.stringify(config.data)
        : config.params = {...config.params};
    config.headers['Content-Type'] = 'application/x-www-form-urlencoded';

    return config;
}, error => {  //请求错误处理
    Promise.reject(error);
})
service.interceptors.response.use(
    response => {  //成功请求到数据
        //这里根据后端提供的数据进行对应的处理
        if (response.data.code == '0') {
            
            //请求成功
            return response.data;
        }else if(response.data.code == '402'){
            //登录超时
            setTimeout(()=>{
                Message.info('登录超时, 请重新登录');
            },1000)
            setTimeout(()=>{
                router.push('./login')
            },3000)
            
        }else if(response.data.code == '601'){
            Message.info(response.data.msg);
        }else if(response.data.code == '500'){
            Message.info('操作异常或信息填写错误，请重新再试一次');
        }
    },
    error => {  //响应错误处理
        return Promise.reject(error)
    }
)

export default service;
