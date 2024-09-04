import { message, Modal } from "antd";
import { FaCircleExclamation } from "react-icons/fa6";

const DeleteModal = ({ showModal, setShowModal, setShowOptions, postId, handleDelete, handleArchive, action, message, id, handleBan }) => {
    
    const handleOk = () => {
        if (action === 'delete') {
            handleDelete(postId);
        } else if (action === 'archive') {
            handleArchive(postId);
        } else if (action === 'ban user') {
            handleBan(id)
        }
        setShowModal(false);
        setShowOptions && setShowOptions(false);
    };

    const handleCancel = () => {
        setShowModal(false);
    };

    return (
        <Modal
        title={`Confirm ${action.charAt(0).toUpperCase() + action.slice(1)}`}
            open={showModal}
            onOk={handleOk}
            onCancel={handleCancel}
            okText={`Yes, ${action}`}
            cancelText="No, cancel"
            okType="danger"
            icon={<FaCircleExclamation />}
        >
            { message ? message : <p>Are you sure you want to {action} this post?</p>}
        </Modal>
    );
};

export default DeleteModal;
