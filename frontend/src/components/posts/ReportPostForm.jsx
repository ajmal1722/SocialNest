import Input from "antd/es/input/Input";
import SubmitButton from "../reusable/SubmitButton";

const ReportPostForm = () => {
    return (
        <div className='my-4 mx-3'>
            
            <Input 
                placeholder="Reason for Your report"
                className="mb-4"
            />
            <div className="flex justify-end">
                <SubmitButton content={'Submit'} />
            </div>
        </div>
    )
}

export default ReportPostForm
