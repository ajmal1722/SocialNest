import axios from "axios";

const adminInstance = axios.create({
    baseURL: 'https://social-nest-backend.vercel.app/admin',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        timeout: 1000
    }    
})

export default adminInstance;