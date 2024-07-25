import { useState, useEffect } from 'react';
import { Modal, List, Spin } from 'antd';

const ContentDisplayingModal = ({ isVisible, onClose, content }) => {
    const [loading, setLoading] = useState(true);
    console.log('content:', content);

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
                    renderItem={item => (
                        <List.Item>
                            <List.Item.Meta
                                title={item}
                                description={item.bio}
                            />
                        </List.Item>
                    )}
                />
            )}
        </Modal>
    );
};

export default ContentDisplayingModal;