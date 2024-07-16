import { Input } from "antd";
import { useFormContext, Controller } from 'react-hook-form';

const TextInput = () => {
    const { TextArea } = Input;

    const {
        control,
        formState: { errors }
    } = useFormContext();

    const validation = {
        required: 'This field is required',
        minLength: {
            value: 6,
            message: 'Content must be at least 6 characters long'
        },
    };

    return (
        <div className="my-4">
            <Controller
                name="blogContent"
                control={control}
                rules={validation}
                render={({ field }) => (
                    <TextArea
                        {...field}
                        showCount
                        maxLength={250}
                        placeholder="Type your message here"
                        className="bg-primary-light dark:bg-primary-dark text-ternary-dark dark:text-primary-light"
                        style={{
                            height: 120,
                            resize: 'none',
                        }}
                    />
                )}
            />
            {errors.blogContent && (
                <p className="text-red-600">
                    {errors.blogContent.message}
                </p>
            )}
        </div>
    );
}

export default TextInput;
