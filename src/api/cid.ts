import { cid_service } from "../utils/request";
//上传
export const uploadFile =  (data:any)=>{
    return cid_service({
        url:'api/v1/upload_file',
        method:'post' ,
        data
    })
}

//电商登录
export const fetchLoginData = (data:any) => {
    return cid_service({
        url: 'api/v1/cid/cid/login',
        method: 'post',
        data
    });
};
//商品列表
export const cidGoodsListB = (data:{adzone_id:string, keyword:string, page_index:number, page_size:number }) => {
    return cid_service({
        url: 'api/v1/cid/commodity_background',
        method: 'get',
        params:data
    });
};
//客户列表 销售平台,0：淘宝，1：京东，2：拼多多
export const cidCustomerListB = (data:{platform:string, keyword:string, page_index:number, page_size:number }) => {
    return cid_service({
        url: 'api/v1/cid/customers',
        method: 'get',
        params:data
    });
};
//添加客户
export const cidCustomerAddB = (data:{nickname:string, username:string, password:string, taobao_adzone_id:string,jd_adzone_id:string,pdd_adzone_id:string,email:string,platform:string }) => {
    return cid_service({
        url: 'api/v1/cid/customers',
        method: 'post',
        data
    });
};
//编辑
export const cidCustomerEditB = (data:{id:number,nickname:string, username:string, password:string, taobao_adzone_id:string,jd_adzone_id:string,pdd_adzone_id:string,email:string,platform:string }) => {
    return cid_service({
        url: 'api/v1/cid/customers/update',
        method: 'patch',
        data
    });
};
//删除客户
export const cidCustomerDeleteB = (data:{username:string }) => {
    return cid_service({
        url: 'api/v1/cid/customers/delete',
        method: 'post',
        data
    });
};
//进入账号
export const cidCustomerEnter = (data:{id:string }) => {
    return cid_service({
        url: 'api/v1/cid/customers/enter_account',
        method: 'post',
        data
    });
};

//管理员列表
export const cidAdminListB = (data:{ keyword:string, page_index:number, page_size:number }) => {
    return cid_service({
        url: 'api/v1/cid/admins',
        method: 'get',
        params:data
    });
};
//添加客户
export const cidAdminAddB = (data:{nickname:string, username:string, password:string }) => {
    return cid_service({
        url: 'api/v1/cid/admins',
        method: 'post',
        data
    });
};


//fe
//商品列表
export const cidGoodsList = (data:{seller_name:string, keywords:string, page_index:number, page_size:number }) => {
    return cid_service({
        url: 'api/v1/cid/taobao_commodity',
        method: 'get',
        params:data
    });
};
//商品id检测
export const cidGoodsIdCheck = (data:{commodity_id:string,commodity_name:string }) => {
    return cid_service({
        url: 'api/v1/cid/taobao_commodity/gain_commodity_info',
        method: 'get',
        params:data
    });
};
//新建商品
export const cidGoodsAdd = (data:{commodity_id:string,commodity_name:string,seller_id:string,seller_name:string,jump_type:string,
    details_page_url:string,advertising_platform:string,commodity_platform:string,landing_page_background:string,landing_page_button:string }) => {
    return cid_service({
        url: 'api/v1/cid/taobao_commodity',
        method: 'post',
        data
    });
};
//编辑
export const cidGoodsEdit = (data:{id:string,commodity_id:string,commodity_name:string,seller_id:string,seller_name:string,jump_type:string,
    details_page_url:string,advertising_platform:string,commodity_platform:string,landing_page_background:string,landing_page_button:string }) => {
    return cid_service({
        url: 'api/v1/cid/taobao_commodity/patch',
        method: 'patch',
        data
    });
};
//删除
export const cidGoodsDelete = (data:{id:string }) => {
    return cid_service({
        url: 'api/v1/cid/taobao_commodity/delete',
        method: 'post',
        data
    });
};
//商品落地页
export const cidGoodsDetail = (data:any) => {
    return cid_service({
        url: 'api/v1/cid/taobao_commodity/landing_page',
        method: 'get',
        params:data
    });
};

//商品数据列表
export const cidGoodsDataList = (data:{page_index:number,page_size:number,commodity_name:string,commodity_id:string, }) => {
    return cid_service({
        url: 'api/v1/cid/taobao_data',
        method: 'get',
        params:data
    });
};

//商品订单明细
export const cidGoodsOrderList = (data:{commodity_id:any,order_id:string,state:string,page_index:number,page_size:number, }) => {
    return cid_service({
        url: 'api/v1/cid/taobao_data/show',
        method: 'get',
        params:data
    });
};

//账号列表
export const cidUserList = (data:{nickname:string,username:string,page_index:number,page_size:number, }) => {
    return cid_service({
        url: 'api/v1/cid/account_manager',
        method: 'get',
        params:data
    });
};

//新增
export const cidUserAdd = (data:{nickname:string,username:string,password:string, taobao_adzone_id:string,jd_adzone_id:string,pdd_adzone_id:string,platform:string}) => {
    return cid_service({
        url: 'api/v1/cid/account_manager',
        method: 'post',
        data
    });
};

//编辑
export const cidUserEdit = (data:{id:string,nickname:string,username:string,password:string, taobao_adzone_id:string,jd_adzone_id:string,pdd_adzone_id:string,platform:string }) => {
    return cid_service({
        url: 'api/v1/cid/account_manager/update',
        method: 'patch',
        data
    });
};

//删除
export const cidUserDelete = (data:{id:string,type:string}) => {
    return cid_service({
        url: 'api/v1/cid/account_manager/delete',
        method: 'post',
        data
    });
};

