import {serviceapp} from '../utils/request';

//验证登录信息
export const fetchLoginData = (data: any) => {
    const url = 'api/v1/login/verify_password';
    return serviceapp({
        url,
        method: 'post',
        data
    });
};

//查询简历库信息
export const fetchResumeLibrary = (query: any) => {
    const url = 'api/v1/personnel/resumes';
    return serviceapp({
        url,
        method: 'get',
        params: query
    });
};

//添加简历
export const addResumeLibrary = (data: any) => {
    const url = 'api/v1/personnel/resumes';
    return serviceapp({
        url,
        method: 'post',
        data
    });
};

//修改简历
export const updateResumeLibrary = (data: any) => {
    const url = 'api/v1/personnel/resumes';
    return serviceapp({
        url,
        method: 'put',
        data
    });
};