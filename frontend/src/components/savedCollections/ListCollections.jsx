import { Card } from 'antd';
const { Meta } = Card;

const ListCollections = ({ collections }) => {
    return (
        <div>
            {collections.length > 0 ? (
                collections.map((collection) => (
                    <Card
                        key={collection._id}  // Add a unique key for each collection
                        hoverable
                        style={{
                            width: 240,
                            marginBottom: '16px'  // Add some spacing between cards
                        }}
                        cover={<img alt={collection.collectionName} src={collection.imageUrl || "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"} />}  // Replace with actual image URL
                    >
                        <Meta title={collection.collectionName} /> 
                    </Card>
                ))
            ) : (
                <p>No collections found.</p>
            )}
        </div>
    );
};

export default ListCollections;