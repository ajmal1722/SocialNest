import postInstance from "../../axios_instaces/postInstance";
import { toast } from "react-toastify";

export const createPost = async (data, contentType) => {
    try {
        const response = await postInstance.post('/create',
            { contentType, ...data }
        )
        console.log(response.data)
        
    } catch (error) {
        // toast.error(error.response.data.error)
        console.log(error);
    }
}