import request from '@/utils/request'

export function login(data: Object) {
    return request({
        url: 'api/v1/login',
        method: 'POST',
        data: data,
    })
}

export function register(data: Object) {
    return request({
        url: 'api/v1/register',
        method: 'POST',
        data: data,
    })
}