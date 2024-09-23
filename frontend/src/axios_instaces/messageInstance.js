import axios from "axios";

const messageInstance = axios.create({
    baseURL: 'http://localhost:8000/messages',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        timeout: 1000
    }    
})

export default messageInstance;