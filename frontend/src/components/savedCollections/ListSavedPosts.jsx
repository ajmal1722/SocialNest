import { Row } from "antd";
import SinglePost from '../reusable/SinglePost'

const ListSavedPosts = ({ savedPosts }) => {
    console.log('savpo:', savedPosts.post);
    
    return (
        <div>
            <Row gutter={24}>
            {savedPosts.length > 0 ? 
            savedPosts.map(post => (
                <SinglePost key={post._id} post={post.post} initialUser={post.user} />
            )) : 
            ''}
            </Row>
        </div>
    )
}

export default ListSavedPosts
