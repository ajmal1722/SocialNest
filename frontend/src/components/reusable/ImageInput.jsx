import { useState } from 'react';
import { Upload, message } from 'antd';
import { InboxOutlined } from '@ant-design/icons';

const { Dragger } = Upload;

const ImageInput = ({ onUpload }) => {
    const [uploadedFiles, setUploadedFiles] = useState([]);

    const props = {
        name: 'file',
        multiple: true,
        action: '',
        onChange(info) {
            const { status } = info.file;
            if (status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (status === 'done') {
                message.success(`${info.file.name} file uploaded successfully.`);
                setUploadedFiles(prevFiles => {
                    const newFiles = [...prevFiles, info.file.response.url];
                    onUpload(newFiles);
                    return newFiles;
                });
            } else if (status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
        onDrop(e) {
            console.log('Dropped files', e.dataTransfer.files);
        },
    };

    return (
        <div className="my-5">
            
            <Dragger {...props}>
                <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                </p>
                <p className="text-primary-dark dark:text-primary-light text-base">Click or drag file to this area to upload</p>
            </Dragger>
        </div>
    );
};

export default ImageInput;