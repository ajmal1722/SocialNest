import { useState, useEffect } from 'react';
import { Modal, Spin } from 'antd';

const ReusableModal = ({ isVisible, onClose, Content }) => {
    

    return (
         <Modal
            title="Details"
            open={isVisible}
            onCancel={onClose}
            footer={null}
            className="p-0 dark:bg-primary-dark"
            style={{ padding: 0 }}
        >
            <div className="max-h-[80vh] overflow-y-auto p-4 dark:bg-primary-dark">
                <Content />
            </div>
        </Modal>
    )
}

export default ReusableModal
