import { defineStore } from "pinia";


export const useCIDstore = defineStore('cid',{
    state:()=>{
        return {
            operation: '',
            jumpOptions:[
                {label:'一跳',value:'0'},
                {label:'二跳',value:'1'},
            ],
            platformOptions:[
                {label:'淘宝',value:'0'},
                {label:'京东',value:'1'},
                {label:'拼多多',value:'2'},
            ],
            orderStatusOptions:[
                {label:'全部',value:'0'},
                {label:'已付款',value:'1'},
                {label:'已收货',value:'2'},
                {label:'已结算',value:'3'},
                {label:'已失效',value:'4'},
            ],
        }
    },
    actions: {
        setOperation(op: string) {
            this.operation = op
        },
    }
})