import { Input } from "antd";
import { useFormContext } from 'react-hook-form';

const TextInput = () => {
    const { TextArea } = Input;

    const {
        register,
        formState: { errors }
    } = useFormContext();

    const validation = {
        required: 'This field is required',
        minLength: {
            value: 4,
            message: 'Content must be at least 4 characters long'
        },
    };

    return (
        <div className="my-4">
            <TextArea
                {...register('blogContent', validation)}
                showCount
                maxLength={250}
                placeholder="Type your message here"
                className="bg-primary-light dark:bg-primary-dark text-ternary-dark dark:text-primary-light"
                style={{
                    height: 120,
                    resize: 'none',
                }}
            />
            {errors.blogContent && (
                <p className="text-red-500">
                    {errors.blogContent.message}
                </p>
            )}
        </div>
    )
}

export default TextInput;