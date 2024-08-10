import { Card, Col } from 'antd';

const SingleBlogCard = ({ post }) => {
    return (
        <Col
            xs={24}  // Full width on extra small screens
            sm={12}  // Half width on small screens
            md={12}   // One-third width on medium screens
            lg={8}   // One-third width on large screens
            className='my-3'
        >
            <Card
                title={<span className="dark:text-white font-bold">{post.caption}</span>}
                bordered={false}
                extra={<a href="#">More</a>}
                className='min-h-80 lg:min-h-64 bg-white shadow-2xl dark:bg-ternary-dark text-primary-dark dark:text-primary-light hover:scale-105'
            >
                {post.blogContent}
            </Card>
        </Col>
    );
}

export default SingleBlogCard;