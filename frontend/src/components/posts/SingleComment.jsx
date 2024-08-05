import DateFormatter from '../reusable/DateFormatter'

const SingleComment = ({ comments }) => {
  return (
    <div className=' p-2 my-1'>
        <div className='flex items-center gap-2'>
            <img 
                src="https://yt3.googleusercontent.com/-CFTJHU7fEWb7BYEb6Jh9gm1EpetvVGQqtof0Rbh-VQRIznYYKJxCaqv_9HeBcmJmIsp2vOO9JU=s900-c-k-c0x00ffffff-no-rj" alt="" 
                className='rounded-full h-8'
            />
            <h1 className='font-semibold '>
                { comments.user_details.username }
            </h1>
        </div>
        <div className='text-start ml-10'>
            { comments.content }
        </div>
        <div className='flex gap-4 mx-8 mt-1'>
            <h1 className='text-xs text-gray-500 font-semibold'>
            <DateFormatter date={comments.createdAt} />
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
