import axios from "axios"; 

const instance = axios.create({
    baseURL: 'http://localhost:8000/user',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        timeout: 1000
    }    
})

export default instance;