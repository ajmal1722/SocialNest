import { Input } from "antd";
import { useFormContext } from "react-hook-form";

const TitleInput = ({ onChange }) => {
    const {
        control,
        formState: { errors }
    } = useFormContext();

    return (
        <div>
            <Input
                showCount
                maxLength={30}
                {...register('blogTitle', {
                    required: 'Title is required',
                    maxLength: { value: 30, message: 'Title cannot exceed 30 characters' }
                })}
                placeholder="Enter title"
            />
            {errors.title && <p className="text-red-500">{errors.title.message}</p>}
        </div>
    )
}

export default TitleInput;