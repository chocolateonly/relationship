import axios, {AxiosInstance, AxiosError, AxiosResponse, AxiosRequestConfig} from 'axios';
import { ElMessage } from 'element-plus';
const service:AxiosInstance = axios.create({
    // baseURL: process.env.NODE_ENV == 'production' ? "https://flora-api.relationshipapp.com/" : process.env.NODE_ENV == 'development' ? "https://flora-staging.relationshipapp.com/" : "https://flora-test.relationshipapp.com/",
    baseURL: "https://1d13-27-27-88-181.ngrok.io/",
    timeout: 50000000000000
});

service.interceptors.request.use(
    (config: AxiosRequestConfig) => {
        if (config && config.headers) {
        config.headers['Authorization'] = localStorage.getItem('token') || ''
        config.headers['x-access-token'] = localStorage.getItem('tokenmd5') || ''
        }
        return config;
    },
    (error: AxiosError) => {
        console.log(error);
        return Promise.reject();
    }
);

service.interceptors.response.use(
    (response: AxiosResponse) => {
        if (response.status === 200) {
            if(response.data.status==402||response.data.status==401){
                ElMessage.error(response.data.message);
                throw response.data;
            }else{
                return response.data;
            }
        } else {
            throw response;
        }
    },
    (error: AxiosError) => {
        return Promise.reject(error);
    }
);


//关系app后台管理接口
const serviceapp:AxiosInstance = axios.create({
    // baseURL: process.env.NODE_ENV == 'production' ? "https://flora-api.relationshipapp.com/" : process.env.NODE_ENV == 'development' ? "https://flora-staging.relationshipapp.com/" : "https://flora-test.relationshipapp.com/",
    baseURL: "http://f4o4119385.qicp.vip/",
    timeout: 50000000000000
});

serviceapp.interceptors.request.use(
    (config: AxiosRequestConfig) => {
        if (config && config.headers) {
            config.headers['Authorization'] = localStorage.getItem('token') || ''
            config.headers['x-access-token'] = localStorage.getItem('tokenmd5') || ''
        }
        return config;
    },
    (error: AxiosError) => {
        console.log(error);
        return Promise.reject();
    }
);

serviceapp.interceptors.response.use(
    (response: AxiosResponse) => {
        if (response.status === 200) {
            return response.data;
        } else {
            Promise.reject();
        }
    },
    (error: AxiosError) => {
        console.log(error);
        return Promise.reject();
    }
);

export {service,serviceapp};