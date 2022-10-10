import { defineStore } from "pinia";

export const useIndex = defineStore('index',{
    state:()=>{
        return {
            sexOptions:['男','女'],
            userStatusOptions:['正常','待注销','已注销']
        }
    },
    actions:{

    }
})