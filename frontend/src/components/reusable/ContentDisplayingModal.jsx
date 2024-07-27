import { useState, useEffect } from 'react';
import { Modal, List, Spin } from 'antd';
import SingleUserSuggestion from '../notificationPageComponents/SingleUserSuggestion';

const ContentDisplayingModal = ({ isVisible, onClose, content }) => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (content) {
            setLoading(false);
        }
    }, [content]);

    return (
        <Modal
            title="Details"
            open={isVisible}
            onCancel={onClose}
            footer={null}
        >
            {loading ? (
                <div className="flex justify-center items-center h-full">
                    <Spin size="large" />
                </div>
            ) : (
                <List
                    dataSource={content}
                    renderItem={userData => (
                        <SingleUserSuggestion data={userData} />
                    )}
                />
            )}
        </Modal>
    );
};

export default ContentDisplayingModal;