import postInstance from "../../axios_instaces/postInstance";
import { toast } from "react-toastify";

export const createPost = async (data) => {
    try {
        const response = await postInstance.post('/create', data)
        console.log(response.data)
        
    } catch (error) {
        // toast.error(error.response.data.error)
        console.log(error);
    }
}