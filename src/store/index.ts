import { defineStore,createPinia } from "pinia";
import piniaPluginPersist from 'pinia-plugin-persist'
import { useSidebarStore } from "./sidebar";
const store = createPinia()
store.use(piniaPluginPersist)
export default store
interface Permission{
    index:string,
    permiss:number,
    role_name:string,
    title:string,
}
export const useIndex = defineStore('index',{
    state:()=>{
        return {
            sexOptions:['男','女'],
            userStatusOptions:['正常','待注销','已注销'],
            handleStatusOptions:['待处理','已处理'],
            userinfo:<any>{
                nickname:''
            },
            //当前用户已有操作权限
            permissions:<Array<Permission>>[],
            //当前用户不能访问的路由
            no_permission_routes:<Array<string>>[]
        }
    },
    persist: {
        enabled: true, // 开启数据缓存
        strategies: [
            {
                key: 'index_store',
                storage: localStorage // 默认是sessionStorage
            }
        ],
    },
    actions:{
        //获取用户信息 和 权限
       setUserinfo(){
           const sidebarStore = useSidebarStore()
           //获取系统菜单
           sidebarStore.setSideAllMenu()

           sidebarStore.setMenu(sidebarStore.side_menu_list)
           //处理人事系统操作权限及菜单权限
           const userinfo = localStorage.getItem('ms_cid_userinfo')
           if(!userinfo) return;
          const user = JSON.parse(userinfo);
          if(user.token) {
              this.userinfo = user
          }
       },
    }
})