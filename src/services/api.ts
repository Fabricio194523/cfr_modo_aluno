import axios from 'axios'
import { AppError } from '@utils/AppError';

const api = axios.create({
    baseURL: 'http://ec2-3-17-229-63.us-east-2.compute.amazonaws.com',
});

api.interceptors.response.use((response) => response, (error) => {
    if (error.response && error.response.data) {
        return Promise.reject(new AppError(error.response.data.message))
    } else {
        return Promise.reject(error)
    }
})

export { api }