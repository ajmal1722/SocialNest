import axios from "axios";

const notificationInstanse = axios.create({
    baseURL: 'http://localhost:8000/notification',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        timeout: 1000
    }    
})

export default notificationInstanse;