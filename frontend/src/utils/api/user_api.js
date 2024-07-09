import userInstance from '../../axios_instaces/userInstance'
import { toast } from 'react-toastify'

export const userLogin = async (data) => {
    try {
        const response = await userInstance.post('/login', data)
        console.log(response.data)
        
    } catch (error) {
        toast.error(error.response.data.error)
    }
}