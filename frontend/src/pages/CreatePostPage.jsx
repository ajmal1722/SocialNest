import { NavLink } from "react-router-dom";
import TextInput from "../components/reusable/TextInput";

const CreatePostPage = () => {
    
    return (
        <div className='text-primary-dark dark:text-primary-light col-span-6 sm:m-6 m-4'>
            <h1 className='text-2xl font-semibold my-6'>
                Create Post
            </h1>
           <NavLink> 
                Text
           </NavLink>
           <NavLink className='mx-6'>
                Images & video
           </NavLink>
           <TextInput />
        </div>
    )
}

export default CreatePostPage
