import { useFormContext } from 'react-hook-form'

const Input = ({ type, name, Icon, placeholder, errorMessage }) => {
    const {
        register,
        formState: { errors }
    } = useFormContext();

    return (
        <>
            <div className='flex min-w-72 items-center border-b-2 text-gray-400 mb-6 '>
                <Icon />
                <input
                    type={type}
                    {...register(name, { required: true })}
                    placeholder={placeholder}
                    className='p-3 w-full focus:outline-none'
                />
            </div>
            {errors[name] && <p className='error-message'>{errorMessage}</p>}
        </>
    )
}

export default Input
