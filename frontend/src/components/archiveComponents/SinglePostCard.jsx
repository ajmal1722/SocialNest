import { Card, Col } from 'antd';
const { Meta } = Card;

const SinglePostCard = ({ post }) => {
    return (
        <Col span={8}>
            <Card
                hoverable
                style={{
                    width: 240,
                }}
                cover={<img alt="example" src={post.image_url} />}
            >
                <Meta title="Europe Street beat" description="www.instagram.com" />
            </Card>
        </Col>
    )
}

export default SinglePostCard
