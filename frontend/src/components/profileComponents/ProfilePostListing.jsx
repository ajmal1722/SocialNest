import SinglePost from "../reusable/SinglePost"

const ProfilePostListing = ({ posts, setShowOptions, initialUser }) => {
    return (
        <div className="  " >
            {
                posts.map(post => (
                    <SinglePost key={post._id} post={post} setShowOptions={setShowOptions} posts={posts} initialUser={initialUser} />
                ))
            }
        </div>
    )
}

export default ProfilePostListing
