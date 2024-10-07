import DashboardBox from "../components/reusable/DashboardBox";
import LineChart from "../components/dashboard/LineChart";

const AdminDashboard = () => {
    return (
        <>
            <div className="flex gap-7 justify-center">
                <DashboardBox />
                <DashboardBox />
                <DashboardBox />
            </div>
            <LineChart />
            <LineChart />
        </>
    );
};

export default AdminDashboard;