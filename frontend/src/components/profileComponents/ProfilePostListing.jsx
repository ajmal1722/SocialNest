import SinglePost from "../reusable/SinglePost"

const ProfilePostListing = ({ posts, setShowOptions }) => {
    return (
        <div className="  " >
            {
                posts.map(post => (
                    <SinglePost key={post._id} post={post} setShowOptions={setShowOptions} />
                ))
            }
        </div>
    )
}

export default ProfilePostListing
