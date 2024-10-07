import React from 'react';

const DashboardBox = ({ title, subTitle, titleCount, subTitleCount }) => {
    return (
        <div className="bg-white p-5 rounded-lg shadow-md w-5/12">
                <div className="font-mono shadow-lg w-full p-2 flex justify-between px-5 mb-4">
                    <h1>{title}</h1>
                    <h1>{titleCount}</h1>
                </div>
                <div className="font-mono shadow-lg w-full p-2 flex justify-between px-5">
                    <h1>{subTitle}</h1>
                    <h1>{subTitleCount}</h1>
                </div>
        </div>
    );
};

export default DashboardBox;