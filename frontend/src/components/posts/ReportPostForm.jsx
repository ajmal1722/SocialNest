import { useState } from "react";
import { Input, message } from "antd";
import { toast } from "react-toastify";
import { reportPostApi } from "../../utils/api/admin_api";
import SubmitButton from "../reusable/SubmitButton";

const ReportPostForm = ({ setShowForm, postId }) => {
    const [reportReason, setReportReason] = useState("");
    const [loading, setLoading] = useState(false);

    const handleReport = async (e) => {
        e.preventDefault();
        
        if (!reportReason.trim()) {
            message.error("Please provide a reason for your report.");
            return;
        }

        setLoading(true)

        try {
            const response = await reportPostApi({ reasonForReport: reportReason, postId }); // Call the API

            if (response?.status === 201) { 
                message.success("Your report has been submitted successfully.");
                setShowForm(false); 
            } else {
                toast.error("Failed to submit the report. Please try again.");
            }
        } catch (error) {
            message.error("An error occurred while submitting the report."); // Handle API errors
            console.error("Error reporting post:", error);
        } finally {
            setLoading(false); // Stop loading
        }
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
