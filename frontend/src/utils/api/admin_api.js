import adminInstance from "../../axios_instaces/adminInstance";
import { message } from 'antd';
import { toast } from "react-toastify";

export const adminLoginApi = async (data) => {
    try {
        const response = await adminInstance.post("/login", data);
        console.log("res admin login:", response.data);
        return response.data;
    } catch (error) {
        message.error(error?.response?.data?.error)
        console.log("error fetching notification page:", error);
    }
};

export const checkAdminAuthenticatedApi = async () => {
    try {
        const response = await adminInstance.get('/is-admin-protected');
        console.log(response.data);
        return response.data
    } catch (error) {
        console.log("error fetching notification page:", error.response.data);
    }
}

export const fetchReportApi = async () => {
    try {
        const response = await adminInstance.get('/reports');
        console.log(response.data);
        return response.data
    } catch (error) {
        console.log("error fetching reported posts", error.response.data);
    }
}

export const fetchAllUsersApi = async () => {
    try {
        const response = await adminInstance.get('/fetch-users');
        console.log(response.data);
        return response.data
    } catch (error) {
        console.log("error fetching users", error.response.data);
    }
}

export const banUserApi = async (id) => {
    try {
        const response = await adminInstance.get(`/ban-user/${id}`);
        console.log(response.data);
        return response.data
    } catch (error) {
        console.log("error fetching users", error.response.data);
    }
}