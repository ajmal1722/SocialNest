import { Button, message, Popconfirm } from 'antd';

const PopConfirm = ({ title, description, onConfirm, onCancel, okText = "Yes", cancelText = "No", buttonText = "Delete" }) => {
    const handleConfirm = (e) => {
        if (onConfirm) {
            onConfirm(e);
        }
        message.success('Click on Yes');
    };

    const handleCancel = (e) => {
        if (onCancel) {
            onCancel(e);
        }
        message.error('Click on No');
    };

    return (
        <Popconfirm
            title={title}
            description={description}
            onConfirm={handleConfirm}
            onCancel={handleCancel}
            okText={okText}
            cancelText={cancelText}
        >
            <Button danger>{buttonText}</Button>
        </Popconfirm>
    );
}

export default PopConfirm;