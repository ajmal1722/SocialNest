import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { FaRegComment } from 'react-icons/fa'
import Input from "antd/es/input/Input";
import SingleComment from "./SingleComment"
import TextInput from "../reusable/TextInput"
import SubmitButton from "../reusable/SubmitButton";

const CommentListing = () => {

    const commentContent = ['sample content', 'sample comment content 1..', 'something here'];

    return (
        <div className='border p-'>
            {
                commentContent.map((item, index) => (
                    <SingleComment key={index} comments={item} />
                ))
            }
            <div className="border-t">
                <form action="">
                    <Input />
                    <button>
                        submit
                    </button>
                </form>
            </div>
        </div>
    )
}

export default CommentListing
