import request from '@/utils/request'

export function getToken() {
    return request({
        url: '/api/authentication/GetToken',
        method: 'get',
    })
}

export function logout() {
    return request({
        url: '/api/authentication/logout',
        method: 'post',
    })
}

export function getUserInfo(){
    let SystemCode = 'DataCenter';
    return request({
        url: '/api/authentication/getuserinfo?SystemCode='+SystemCode,
        method: 'get',
    })   
}