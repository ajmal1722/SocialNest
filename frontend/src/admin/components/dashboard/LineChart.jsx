import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js';

// Register the required components for Chart.js
Chart.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend);

const LineChart = () => {
    // Dummy data for months
    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    // Hardcoded dummy data
    const dummyData = [
        { month: 1, totalUsers: 100, totalPosts: 50 },
        { month: 2, totalUsers: 200, totalPosts: 120 },
        { month: 3, totalUsers: 300, totalPosts: 80 },
        { month: 4, totalUsers: 400, totalPosts: 160 },
        { month: 5, totalUsers: 500, totalPosts: 190 },
        { month: 6, totalUsers: 600, totalPosts: 210 },
        { month: 7, totalUsers: 300, totalPosts: 240 },
        { month: 8, totalUsers: 800, totalPosts: 300 },
        { month: 9, totalUsers: 900, totalPosts: 250 },
        { month: 10, totalUsers: 600, totalPosts: 270 },
        { month: 11, totalUsers: 100, totalPosts: 350 },
        { month: 12, totalUsers: 100, totalPosts: 400 }
    ];

    // Generate labels and data points from the dummy data
    const labels = dummyData.map(item => months[item.month - 1]);
    const userCounts = dummyData.map(item => item.totalUsers);
    const postCounts = dummyData.map(item => item.totalPosts);

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

    return (
        <div className='m-6 lg:w-10/12 w-full'>
            <h2>Monthly Users and Posts Statistics</h2>
            <Line data={data} options={options} />
        </div>
    );
};

export default LineChart;