import { Card, Col } from 'antd';

const SingleBlogCard = ({ post }) => {
    return (
        <Col span={8}>
            <Card 
                title={post.caption}
                bordered={false} 
                extra={<a href="#">More</a>}
                className='min-h-80 bg-white shadow-2xl dark:bg-secondary-dark text-primary-dark dark:text-primary-light hover:scale-105'
            >
                {post.blogContent}
            </Card>
        </Col>
    )
}

export default SingleBlogCard