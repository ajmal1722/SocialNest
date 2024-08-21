import React from 'react';
import { useFormContext } from 'react-hook-form';

const ImageInput = () => {
    const { register, formState: { errors } } = useFormContext();

    return (
        <div className="my-3">
            <input
                type="file"
                name="files"
                accept="image/*,video/*"
                multiple
                {...register('files', { 
                    validate: files => files.length > 0 || 'At least one file is required'
                })}
                className="block w-full p-2 border border-gray-300 rounded-md"
            />
            {errors.files && <p className="text-red-500 mt-1">{errors.files.message}</p>}
        </div>
    );
};

export default ImageInput;