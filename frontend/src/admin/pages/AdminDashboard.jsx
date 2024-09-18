import DashboardBox from "../components/reusable/DashboardBox";

const AdminDashboard = () => {
    return (
        <div className="flex gap-7 justify-center">
            <DashboardBox />
            <DashboardBox />
            <DashboardBox />
        </div>
    );
};

export default AdminDashboard;