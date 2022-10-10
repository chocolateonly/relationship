import {service} from '../utils/request';

//验证登录信息
export const fetchLoginData = (data: any) => {
    return service({
        url:'api/v1/login/verify_password',
        method: 'post',
        data
    });
};

//---------无用
//查询简历库信息
export const fetchResumeLibrary = (query: any) => {
    const url = 'api/v1/personnel/resumes';
    return service({
        url,
        method: 'get',
        params: query
    });
};

//添加简历
export const addResumeLibrary = (data: any) => {
    const url = 'api/v1/personnel/resumes';
    return service({
        url,
        method: 'post',
        data
    });
};

//修改简历
export const updateResumeLibrary = (data: any) => {
    const url = 'api/v1/personnel/resumes';
    return service({
        url,
        method: 'put',
        data
    });
};
//--------


//用户管理
//用户列表
export const getUserList = (data:any) =>{
    return service({
        url:'api/v1/relationship/users',
        method:'get',
        params:data
    })
}
//添加用户
export const addUser = (data:any) =>{
    return service({
        url:'api/v1/relationship/users',
        method:'post',
        data
    })
}
//用户详情
export const getUserDetail = (data:any)=>{
    return service({
        url:'api/v1/relationship/users/'+data,
        method:'get'
    })
}
//实名认证
export const authUser = (data:any)=>{
    return service({
        url:'api/v1/relationshipapp/user/certification',
        method:'post',
        data
    })
}
//注销
export const loginOutUser = (data:any)=>{
    return service({
        url:'api/v1/relationship/cancellation_users/logout',
        method:'post',
        data
    })
}
//撤销注销
export const revokeUser = (data:any)=>{
    return service({
        url:'api/v1/relationship/cancellation_users/revoke_cancellation',
        method:'post',
        data
    })
}
//日志记录
export const logList = (data:any)=>{
    return service({
        url:'api/v1/relationship/users/action_logs',
        method:'get',
        params:data
    })
}
//注销用户列表
export const revokeList = (data:any)=>{
    return service({
        url:'api/v1/relationship/cancellation_users',
        method:'get',
        params:data
    })
}
