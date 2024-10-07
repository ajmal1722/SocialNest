import { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js';
import { fetchMonthlyStatsApi } from '../../../utils/api/admin_api';

// Register the required components for Chart.js
Chart.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend);

const LineChart = () => {
    const [chartData, setChartData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMonthlyStats = async () => {
            try {
                const response = await fetchMonthlyStatsApi();
                if (response && response.length > 0) {
                    setChartData(response);
                } else {
                    setChartData([]);
                }
            } catch (error) {
                setError("Failed to fetch data");
            } finally {
                setLoading(false);
            }
        };

        fetchMonthlyStats();
    }, []);

    // Dummy data for months
    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    // Generate labels and data points from the dummy data
    const labels = chartData?.map(item => months[item.month - 1]) || [];
    const userCounts = chartData?.map(item => item.totalUsers) || [];
    const postCounts = chartData?.map(item => item.totalPosts) || [];

    // Data for the chart
    const data = {
        labels: labels,
        datasets: [
            {
                label: 'Monthly Users',
                data: userCounts,
                fill: false,
                borderColor: '#42A5F5',
                tension: 0.4,
            },
            {
                label: 'Monthly Posts',
                data: postCounts,
                fill: true,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.4,
                backgroundColor: 'rgba(75, 192, 192, 0.2)' // Optional to fill the area under the line
            }
        ]
    };

    // Options for the chart
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            tooltip: {
                callbacks: {
                    label: function (tooltipItem) {
                        return `${tooltipItem.dataset.label}: ${tooltipItem.raw}`;
                    }
                }
            }
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Month'
                },
                ticks: {
                    autoSkip: false
                }
            },
            y: {
                title: {
                    display: true,
                    text: 'Number'
                }
            }
        }
    };

    if (loading) {
        return <p>Loading chart data...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className='m-6 lg:w-10/12 w-full'>
            <h2>Monthly Users and Posts Statistics</h2>
            {chartData.length > 0 ? (
                <Line data={data} options={options} />
            ) : (
                <p>No data available for the chart.</p>
            )}
        </div>
    );
};

export default LineChart;