import axios from "axios";

const axiosInstance = () => {
    const instance = axios.create({
        baseURL: process.env.URL,
        headers: {
            'Content-Type': 'application/json'
        }
    })
    const resfresh = localStorage.getItem('refreshToken');

    instance.interceptors.request.use(async function (config) {
        const token = await instance.getToken();
        config.headers['Authorization'] = 'Bearer ' + token;
        return config;
    }, function (error) {
        return Promise.reject(error);
    });

    instance.interceptors.response.use(async function (response) {
        return response;
    }, async function (error) {
        const { response, config } = error;
        const { url } = response.config
        const statusCode = response.status;
        if (url === '/' || url === '/signup') {
            return Promise.reject(error);
        }
        if (statusCode && statusCode === 401) {
            console.log('resfresh');
            try {
                const token = await refreshToken()
                if (token) {
                    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
                    localStorage.setItem('token', token)
                    return instance(config)
                }
            } catch (error) {
                localStorage.removeItem('token')
                localStorage.removeItem('refreshToken')
                window.location.href = '/'
            }
        }
        return Promise.reject(error);
    });

    const refreshToken = async () => {
        const res = await instance.post('/user/reissue', {
            refreshToken: resfresh
        })
        return res.data
    }

    instance.getToken = async () => {
        return window.localStorage.getItem('token') ?
            window.localStorage.getItem('token') : null;
    }

    return instance;
}

export default axiosInstance;