import { Input } from "antd"

const TextInput = () => {
    const { TextArea } = Input;

    const onChange = (e) => {
        console.log('Change:', e.target.value);
    };
    return (
        <div className="my-4">
            <TextArea
                showCount
                maxLength={250}
                onChange={onChange}
                placeholder="Type your message here"
                className="bg-primary-light dark:bg-primary-dark text-ternary-dark dark:text-primary-light"
                style={{
                    height: 120,
                    resize: 'none',
                }}
            />
        </div>
    )
}

export default TextInput
