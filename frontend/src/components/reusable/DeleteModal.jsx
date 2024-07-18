import { Modal } from "antd";
import { FaCircleExclamation } from "react-icons/fa6";

const DeleteModal = ({ showModal, setShowModal, setShowOptions }) => {
    const handleOk = () => {
        // Perform deletion logic here
        console.log("Deleting post...");
        setShowModal(false);
        setShowOptions(false)
    };

    const handleCancel = () => {
        setShowModal(false);
    };

    return (
        <Modal
            title="Confirm Deletion"
            open={showModal}
            onOk={handleOk}
            onCancel={handleCancel}
            okText="Yes, I'm sure"
            cancelText="No, cancel"
            okType="danger"
            icon={<FaCircleExclamation />}
        >
            <p>Are you sure you want to delete this post?</p>
        </Modal>
    );
};

export default DeleteModal;
