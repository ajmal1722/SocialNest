import React from 'react';
import { useFormContext } from 'react-hook-form';

const ImageInput = () => {
    const { register } = useFormContext();

    return (
        <div className="my-3">
            <input
                type="file"
                name="files"
                accept="image/*,video/*"
                multiple
                {...register('files')}
                className="block w-full p-2 border border-gray-300 rounded"
            />
        </div>
    );
};

export default ImageInput;