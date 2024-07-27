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
            className="p-0 dark:bg-primary-dark"
            styles={{ padding: 0 }} 
        >
            <div className="max-h-[80vh] overflow-y-auto p-4 dark:bg-primary-dark">
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
                        className="max-h-[60vh] overflow-y-auto  dark:bg-primary-dark"
                    />
                )}
            </div>
        </Modal>
    );
};

export default ContentDisplayingModal;