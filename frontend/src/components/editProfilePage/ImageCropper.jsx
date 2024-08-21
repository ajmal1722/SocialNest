import { useState } from "react";
import 'react-image-crop/dist/ReactCrop.css';
import ReactCrop, { centerCrop, makeAspectCrop } from 'react-image-crop'

const ImageCropper = () => {
    const [imageSrc, setImageSrc] = useState('');
    const [crop, setCrop] = useState()

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

    const onImageLoad = (e) => {
        const { width, height } = e.currentTarget;
        const cropSetup = makeAspectCrop(
            {
                unit: '%',
                width: 50
            },
            1,
            width,
            height
        );
        const centeredCrop = centerCrop(cropSetup, width, height)
        setCrop(centeredCrop)
    }

    return (
        <>
            <label htmlFor="" className='mb-3'>
                <input
                    type="file"
                    accept='image/*'
                    onChange={onSelectFile}
                    className='w-full text-sm text-gray-500 file:rounded-full file:border-none file:p-1 file:px-5 mb-2 file:text-primary-light file:bg-ternary-dark file:cursor-pointer'
                />
            </label>
            {imageSrc &&
                <>
                    <div className='flex justify-center'>
                        <ReactCrop
                            crop={crop}
                            onChange={
                                (pixelCrop, percentCrop) => setCrop(percentCrop)
                            }
                            circularCrop
                            keepSelection
                            aspect={1}
                            minWidth={150}
                        >
                            <img
                                src={imageSrc}
                                style={{ maxHeight: '59vh' }}
                                className='object-cover'
                                onLoad={onImageLoad}
                            />
                        </ReactCrop>
                    </div>

                    <div className='flex justify-end'>
                        <button className='mx-8 mt-2 bg-sky-500 px-5 p-1 rounded-md font-semibold text-primary-light'>
                            crop
                        </button>
                    </div>
                </>
            }
        </>
    )
}

export default ImageCropper
