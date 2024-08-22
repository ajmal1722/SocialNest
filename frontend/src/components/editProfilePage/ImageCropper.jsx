import { useState, useRef } from "react";
import 'react-image-crop/dist/ReactCrop.css';
import ReactCrop, { centerCrop, convertToPixelCrop, makeAspectCrop } from 'react-image-crop';

const ImageCropper = ({ onClose, uploadImage }) => {
    const [imageSrc, setImageSrc] = useState('');
    const [crop, setCrop] = useState(null);
    const imageRef = useRef(null);
    const previewCanvasRef = useRef(null)
    

    const onSelectFile = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.addEventListener('load', () => {
            const imageUrl = reader.result?.toString() || '';
            setImageSrc(imageUrl);
        });
        reader.readAsDataURL(file);
    };

    const onImageLoad = (e) => {
        const { width, height } = e.currentTarget;
        const cropSetup = makeAspectCrop(
            {
                unit: '%',
                width: 50,
            },
            1,
            width,
            height
        );
        const centeredCrop = centerCrop(cropSetup, width, height);
        setCrop(centeredCrop);
    };

    const setCanvasPreview = (
        image, // HTMLImageElement
        canvas, // HTMLCanvasElement
        crop // PixelCrop
    ) => {
        const ctx = canvas.getContext("2d");
        if (!ctx) {
            throw new Error("No 2d context");
        }

        // devicePixelRatio slightly increases sharpness on retina devices
        // at the expense of slightly slower render times and needing to
        // size the image back down if you want to download/upload and be
        // true to the images natural size.
        const pixelRatio = window.devicePixelRatio;
        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;

        canvas.width = Math.floor(crop.width * scaleX * pixelRatio);
        canvas.height = Math.floor(crop.height * scaleY * pixelRatio);

        ctx.scale(pixelRatio, pixelRatio);
        ctx.imageSmoothingQuality = "high";
        ctx.save();

        const cropX = crop.x * scaleX;
        const cropY = crop.y * scaleY;

        // Move the crop origin to the canvas origin (0,0)
        ctx.translate(-cropX, -cropY);
        ctx.drawImage(
            image,
            0,
            0,
            image.naturalWidth,
            image.naturalHeight,
            0,
            0,
            image.naturalWidth,
            image.naturalHeight
        );

        ctx.restore();
    };

    const dataURLToBlob = (dataURL) => {
        const parts = dataURL.split(';base64,');
        const contentType = parts[0].split(':')[1];
        const raw = window.atob(parts[1]);
        const rawLength = raw.length;

        const uInt8Array = new Uint8Array(rawLength);

        for (let i = 0; i < rawLength; ++i) {
            uInt8Array[i] = raw.charCodeAt(i);
        }

        return new Blob([uInt8Array], { type: contentType });
    };
    
    const handleCropUpdate = () => {
        setCanvasPreview(
            imageRef.current,
            previewCanvasRef.current,
            convertToPixelCrop(crop, imageRef.current.width, imageRef.current.height)
        );
        const dataUrl = previewCanvasRef.current.toDataURL('image/jpeg', 0.8);
        const blob = dataURLToBlob(dataUrl);

        const formData = new FormData();
        formData.append('image', blob, 'croppedImage.jpg');

        uploadImage(formData);
        console.log('uInt8array: ', blob);
        onClose();
    };

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
            {imageSrc && (
                <>
                    <div className='flex justify-center'>
                        <ReactCrop
                            crop={crop}
                            onChange={(pixelCrop, percentCrop) => setCrop(percentCrop)}
                            circularCrop
                            keepSelection
                            aspect={1}
                            minWidth={150}
                        >
                            <img
                                ref={imageRef}
                                src={imageSrc}
                                style={{ maxHeight: '59vh' }}
                                className='object-cover'
                                onLoad={onImageLoad}
                            />
                        </ReactCrop>
                    </div>

                    <div className='flex justify-end'>
                        <button
                            onClick={handleCropUpdate}
                            className='mx-8 mt-2 bg-sky-500 px-5 p-1 rounded-md font-semibold text-primary-light'
                        >
                            Crop & Update
                        </button>
                    </div>
                </>
            )}
            {crop && (
                <canvas
                    ref={previewCanvasRef}
                    className="mt-4"
                    style={{
                        display: "none",
                        border: "1px solid black",
                        objectFit: "contain",
                        width: 150,
                        height: 150,
                    }}
                />
            )}
        </>
    );
};

export default ImageCropper;