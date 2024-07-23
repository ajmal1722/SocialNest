import { formatDistanceToNow } from 'date-fns';

const DateFormatter = ({ date }) => {
    return (
        <p className='text-xs'>
            {formatDistanceToNow(new Date(date), { addSuffix: true })}
        </p>
    )
}

export default DateFormatter
