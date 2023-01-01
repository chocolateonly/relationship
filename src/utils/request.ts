import {AxiosInstance} from 'axios';
import NewAxios from "./http";

/**
 * 菜单模块控制
 * 电商CID-用户端,电商CID-管理平台,
 * 'cid_fe_menu'|'cid_be_menu'
 * 对应sidebar store 设置的菜单
 */
type Keys = 'cid_fe_menu'|'cid_be_menu'
export const menu:Array<Keys> = ['cid_be_menu','cid_fe_menu']

//用户端访问地址 用于落地页
export const customer_platform = window.origin+'/'

// export const baseUrl  = 'http://192.168.30.138:3000/'
export const baseUrl = process.env.NODE_ENV == 'production' ? "https://rsbi-api.relationshipapp.com/" : "https://rsbi-staging.relationshipapp.com/"


const cidServiceAxios = new NewAxios({
    baseURL:baseUrl,
    timeout:50000000000000
})

//电商管理
const cid_service:AxiosInstance = cidServiceAxios.instance

export { cid_service}
