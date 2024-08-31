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