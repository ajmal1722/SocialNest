import { Input } from "antd"

const SingleComment = ({ comments }) => {
  return (
    <div className=' p-2 my-1'>
        <div className='flex items-center gap-2'>
            <img 
                src="https://yt3.googleusercontent.com/-CFTJHU7fEWb7BYEb6Jh9gm1EpetvVGQqtof0Rbh-VQRIznYYKJxCaqv_9HeBcmJmIsp2vOO9JU=s900-c-k-c0x00ffffff-no-rj" alt="" 
                className='rounded-full h-8'
            />
            <h1 className='font-semibold '>
                { comments.username }
            </h1>
        </div>
        <div className='text-start mx-6'>
            { comments.content }
        </div>
        <div className='flex gap-4 mx-8 mt-1'>
            <h1 className='text-xs text-gray-500 font-semibold'>
                2hr ago
            </h1>
            <h3 className='text-xs font-semibold text-gray-500 cursor-pointer'>
                reply
            </h3>
        </div>
        <div>
            
        </div>
    </div>
  )
}

export default SingleComment
