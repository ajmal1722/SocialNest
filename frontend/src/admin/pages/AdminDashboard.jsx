import { useState, useEffect } from "react";
import { fetchStatsCountsApi } from "../../utils/api/admin_api";
import DashboardBox from "../components/reusable/DashboardBox";
import LineChart from "../components/dashboard/LineChart";

const AdminDashboard = () => {
    const [dashboardStats, setDashboardStats] = useState(null);

    useEffect(() => {
        const fetchDashboardStats = async () => {
            try {
                const response = await fetchStatsCountsApi();
                setDashboardStats(response);
            } catch (error) {
                console.error('Error fetching dashboard stats:', error);
            }
        };

        fetchDashboardStats();
    }, []);

    if (!dashboardStats) {
        return <p>Loading...</p>; // Handle loading state
    }

    return (
        <>
            <div className="flex gap-7 justify-center">
                <DashboardBox 
                    title={'Total Users'} 
                    titleCount={dashboardStats.totalUsers} 
                    subTitle={'Banned Users'}
                    subTitleCount={dashboardStats.blockedUsers}
                />
                <DashboardBox 
                    title={'Total Posts'} 
                    titleCount={dashboardStats.totalPosts} 
                    subTitle={'Reported Posts'}
                    subTitleCount={dashboardStats.reportedPosts}
                />
            </div>
            <LineChart />
        </>
    );
};

export default AdminDashboard;