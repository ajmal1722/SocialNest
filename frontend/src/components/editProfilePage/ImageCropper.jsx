import { useState } from "react";

const ImageCropper = () => {
    const [imageSrc, setImageSrc] = useState('');
    const [showModal, setShowModal] = useState(false)

    const onSelectFile = (e) => {
        const file = e.target.files?.[0];
        if (!file) return

        const reader = new FileReader();
        reader.addEventListener('load', () => {
            const imageUrl = reader.result?.toString() || '';
            setImageSrc(imageUrl)
        })
        reader.readAsDataURL(file)
    }

    return (
        <>
            <label htmlFor="" className='mb-3'>
                <span></span>
                <input
                    type="file"
                    accept='image/*'
                    onChange={onSelectFile}
                    className='w-full text-sm text-gray-500 file:rounded-full file:border-none file:p-1 file:px-5 file:text-primary-light file:bg-ternary-dark'
                />
            </label>
        </>    
    )
}

export default ImageCropper
