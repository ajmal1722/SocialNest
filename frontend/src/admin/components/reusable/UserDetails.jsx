import { Image } from "antd";
import DateFormatter from "../../../components/reusable/DateFormatter";

const UserDetails = ({ data }) => {
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    return (
        <div className="flex">
            <div className="flex justify-center items-center w-3/6 ">
                <Image
                    src={data.profilePicture}
                    width={120}
                    height={120}
                    className="rounded"
                />
            </div>
            <div className="w-full text-center">
                <h1 className="my-1">
                    { data.username }
                </h1>
                <h1 className="my-1">
                    { data.name }
                </h1>
                <h1 className="my-1">
                    { data.email }
                </h1>
                <div className="mt-4">
                    <h1 className="text-gray-500 font-semibold font-mono my-1">
                        Total Followers: 
                        <span className="mx-2 text-black font-normal">
                            { data.followers.length }
                        </span>
                    </h1>
                    <h1 className="text-gray-500 font-semibold font-mono my-1">
                        Total Following: 
                        <span className="mx-2 text-black font-normal">
                            { data.following.length }
                        </span>
                    </h1>
                    <h1 className="text-gray-500 font-semibold font-mono my-1">
                        Account Created at: 
                        <span className="mx-2 text-black font-normal">
                            {formatDate(data.createdAt)}
                        </span>
                    </h1>
                </div>
            </div>
        </div>
    )
}

export default UserDetails
