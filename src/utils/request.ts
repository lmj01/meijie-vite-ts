import axios from 'axios'

const service = axios.create({
    baseURL: 'http://localhost:3000'
})

service.interceptors.request.use(
    (config: any) => {
        console.log('request', config);
        return config
    },
    (error:any) => {
        return Promise.reject(error)
    }
)
service.interceptors.response.use(
    (response: any) => {
        const res = response.data
        if (res.code === 200) return res 
        else {
            return Promise.reject(res)
        }
    },
    (error:any) => {
        return Promise.reject(error)
    }
)

export default service;