import axios from "axios";

const instance = axios.create({
    baseURL: 'http://localhost:8000/post',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        timeout: 1000
    }    
})

export default instance;