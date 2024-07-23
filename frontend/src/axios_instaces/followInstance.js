import axios from "axios";

const followInstance = axios.create({
    baseURL: 'http://localhost:8000/follow',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        timeout: 1000
    }    
})

export default followInstance;