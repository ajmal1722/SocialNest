import { useState } from "react";
import Input from "antd/es/input/Input";
import SubmitButton from "../reusable/SubmitButton";

const ReportPostForm = ({ setShowForm }) => {
    const [reportReason, setReportReason] = useState("");

    const handleReport = (e) => {
        e.preventDefault();
        setShowForm(false)
    }

    return (
        <div className='my-4 mx-3 border py-3 px-2 rounded'>
            <form onSubmit={handleReport}>
                <Input
                    placeholder="Reason for your report"
                    className="mb-4 p-2"
                    value={reportReason}  // Bind input value to state
                    onChange={(e) => setReportReason(e.target.value)}  // Update state on input change
                />
                <div className="flex justify-end">
                    <SubmitButton content={'Submit'} />
                </div>
            </form>
        </div>
    )
}

export default ReportPostForm
