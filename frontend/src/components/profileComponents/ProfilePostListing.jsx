import SinglePost from "../reusable/SinglePost"

const ProfilePostListing = ({ posts }) => {
    return (
        <div className="  " >
            {
                posts.map(post => (
                    <SinglePost key={post._id} post={post} />
                ))
            }
        </div>
    )
}

export default ProfilePostListing
