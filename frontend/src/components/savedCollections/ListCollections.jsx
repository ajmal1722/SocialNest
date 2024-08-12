import { Card } from 'antd';
const { Meta } = Card;
import { Link } from 'react-router-dom';

const ListCollections = ({ collections }) => {
    return (
        <div className='flex flex-wrap justify-center'>
            {collections.length > 0 ? (
                collections.map((collection) => (
                    <Link to={`/saved-posts/${collection._id}`}
                        key={collection._id}
                        className='w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-2 my-1 cursor-pointer'
                    >
                        <Card
                            className='hover:scale-105 transition-transform duration-300'
                            cover={
                                <img
                                    alt={collection.collectionName}
                                    src={collection.imageUrl || "https://onlinetools.com/images/examples-onlineimagetools/empty-translucent-image.png"}
                                />
                            }
                        >
                            <Meta title={collection.collectionName} />
                        </Card>
                    </Link>
                ))
            ) : (
                <div className='flex items-center min-h-[80vh]'>
                    <p>No collections found.</p>
                </div>
            )}
        </div>
    );
};

export default ListCollections;