import React from 'react';

const MiniCard = ({ title, icon, number, footerNum }) => {
  const isEarnings = title === "Total Earnings";
  const badgeStyle = isEarnings
    ? "bg-green-100 text-green-600"
    : "bg-yellow-100 text-yellow-600";

  return (
    <div className="bg-white p-4 rounded-xl shadow-sm flex-1 min-w-[180px]">
      <div className="flex justify-between items-center">
        <h1 className="text-sm font-medium text-gray-700">{title}</h1>
        <div className={`${badgeStyle} p-2 rounded-lg text-lg`}>
          {icon}
        </div>
      </div>
      <div className="mt-3">
        <h1 className="text-xl font-bold text-gray-800">
          {isEarnings ? `₹${number}` : number}
        </h1>
        <p className="text-xs text-gray-500 mt-1">
          <span className="text-green-500">{footerNum}%</span> than yesterday
        </p>
      </div>
    </div>
  );
};

export default MiniCard;
