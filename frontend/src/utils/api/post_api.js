import postInstance from "../../axios_instaces/postInstance";
import { toast } from "react-toastify";

export const createPost = async (data, contentType) => {
    try {
        const response = await postInstance.post('/create',
            { contentType, ...data }
        )
        if (response) {
            toast.success('Post created Successfully')
        }
    } catch (error) {
        toast.error(error.response.data.error)
        console.log(error);
    }
}