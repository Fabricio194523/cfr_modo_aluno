import axios from 'axios'

const api = axios.create({
    baseURL: 'http://ec2-3-17-229-63.us-east-2.compute.amazonaws.com',
    // baseURL: 'http://192.168.1.11:8000' //APIfake do igniteGYM
});

export { api }