import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import aes from "./aes";
import { ElMessage } from "element-plus";

class NewAxios{
    instance:AxiosInstance;
    constructor(options: { baseURL:string,timeout:number }) {
        this.instance = axios.create({
            baseURL:options.baseURL,
            timeout: options.timeout
        });

        this.instance.interceptors.request.use(
            (config: AxiosRequestConfig) => {
                if (config && config.headers) {
                    config.headers['Authorization'] = localStorage.getItem('token') || ''
                    config.headers['x-access-token'] = aes.encrypt('uxdfppium' + Date.now().toString())
                    console.log('source data', config.data)
                    console.log('encrypt x-access-token', config.headers['x-access-token'])
                    console.log('decrypt x-access-token', aes.decrypt(config.headers['x-access-token']))
                    config.data = aes.encrypt(JSON.stringify(config.data))
                    config.params = aes.encrypt(JSON.stringify(config.params))
                    console.log('encrypt data', config.data)
                    console.log('decrypt data', aes.decrypt(config.data))
                    console.log('encrypt params', config.params)
                    console.log('decrypt params', aes.decrypt(config.params))
                }
                return config;
            },
            (error: AxiosError) => {
                console.log(error);
                return Promise.reject();
            }
        );

        this.instance.interceptors.response.use(
            (response: AxiosResponse) => {
                if (response.status === 200) {
                    if(response.data.status===401||response.data.status===402){
                        throw response.data;
                    }else {
                        console.log('res-:', response.data.res, JSON.parse(aes.decrypt(response.data.res)))
                        return JSON.parse(aes.decrypt(response.data.res));
                    }
                } else {
                    throw JSON.parse(aes.decrypt(response.data.res));
                }
            },
            (error: AxiosError) => {
                console.log('ssss',error)
                if(error.response&&error.response.status==404){
                    ElMessage.error('查无数据')
                }
                return Promise.reject(error);
            }
        );
    }
}
 export default NewAxios