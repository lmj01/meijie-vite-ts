import axios from 'axios'
import store from '@/store'

const service = axios.create({
    baseURL: 'http://localhost:3000'
})

service.interceptors.request.use(
    (config: any) => {
        const token = store.getters['login/token'];
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        console.log('request', config, token);        
        return config
    },
    (error:any) => {
        return Promise.reject(error)
    }
)
service.interceptors.response.use(
    (response: any) => {
        if (response.status === 200) return response.data
        else {
            return Promise.reject(response)
        }
    },
    (error:any) => {
        return Promise.reject(error)
    }
)

export default service;