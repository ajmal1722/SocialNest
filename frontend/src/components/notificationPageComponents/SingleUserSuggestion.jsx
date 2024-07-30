import { Link } from "react-router-dom";
import { singleUserDetailsApi } from "../../utils/api/user_api";
import FollowAndUnfollowButton from "../reusable/FollowAndUnfollowButton";

const SingleUserSuggestion = ({ data }) => {
    const navigeToSingleUser = () => {
        singleUserDetailsApi(id)
    }

    return (
        <div className='flex justify-between gap-2 border p-2 rounded-lg m-2'>
            <Link to={`/user/${data._id}`} className='cursor-pointer'>
                <div className='flex gap-2 text-primary-dark dark:text-primary-light'>
                    <div>
                        <img
                            src={data.profilePicture} alt=""
                            className='rounded-full h-12'
                        />
                    </div>
                    <div className=''>
                        <h1 className='font-semibold'>
                            {data.username}
                        </h1>
                        <h2 className='text-sm font-thin mx-1'>
                            {data.name}
                        </h2>
                    </div>
                </div>
            </Link>
            <FollowAndUnfollowButton data={data} />
        </div>
    )
}

export default SingleUserSuggestion