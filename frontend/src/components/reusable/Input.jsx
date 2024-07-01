import { useFormContext } from 'react-hook-form'

const Input = ({ type, name, Icon, placeholder, validation, errorMessage }) => {
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
                    {...register(name, validation)}
                    placeholder={placeholder}
                    className='p-3 w-full focus:outline-none'
                />
            </div>
            {/* {console.log(errors[name])} */}
            {errors[name] && errors[name].type === 'required' && <p className='error-message'>{errorMessage}</p>}
            {errors[name] && errors[name].type === 'minLength' && <p className='error-message'>{validation.minLength.message}</p>}
            {errors[name] && errors[name].type === 'pattern' && <p className='error-message'>{validation.pattern.message}</p>}
        </>
    )
}

export default Input
