import { Input } from "antd";
import { useFormContext, Controller } from 'react-hook-form';

const TextInput = ({ name, validation, maxLength, placeholder, className, style }) => {
    const { TextArea } = Input;

    const {
        control,
        formState: { errors }
    } = useFormContext();

    return (
        <div className="my-4">
            <Controller
                name={name}
                control={control}
                rules={validation}
                render={({ field }) => (
                    <TextArea
                        {...field}
                        showCount
                        maxLength={maxLength}
                        placeholder={placeholder}
                        className={`${className} bg-primary-light dark:bg-primary-dark text-ternary-dark dark:text-primary-light`}
                    />
                )}
            />
            {errors[name] && (
                <p className="text-red-600">
                    {errors[name]?.message}
                </p>
            )}
        </div>
    );
}

export default TextInput;