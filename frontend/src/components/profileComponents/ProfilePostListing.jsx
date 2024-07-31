import SinglePost from "../reusable/SinglePost"

const ProfilePostListing = ({ posts, setShowOptions }) => {
    return (
        <div className="  " >
            {
                posts.map(post => (
                    <SinglePost key={post._id} post={post} setShowOptions={setShowOptions} posts={posts} />
                ))
            }
        </div>
    )
}

export default ProfilePostListing
