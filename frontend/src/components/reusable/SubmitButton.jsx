import React from 'react'

const SubmitButton = ({ content }) => {
    return (
        <button type='submit' className='bg-ternary-dark hover:bg-primary-dark dark:bg-secondary-dark dark:hover:bg-ternary-dark px-8 py-2 rounded-xl text-primary-light'>
            { content }
        </button>
    )
}

export default SubmitButton
