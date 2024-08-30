import { Modal, Spin } from 'antd';

const ReusableModal = ({ isVisible, onClose, Content, title }) => {
    return (
         <Modal
            title={title && title}
            open={isVisible}
            onCancel={onClose}
            footer={null}
            className="p-0 dark:bg-primary-dark"
            style={{ padding: 0 }}
        >
            <div className="max-h-[70vh] overflow-y-auto ">
                {Content && <Content />}
            </div>
        </Modal>
    )
}

export default ReusableModal
