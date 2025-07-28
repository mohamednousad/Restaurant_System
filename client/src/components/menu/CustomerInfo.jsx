import React, { useState } from "react";
import { useSelector } from "react-redux";
import { formatDate, getAvatarName } from "../../utils";

const CustomerInfo = () => {
  const [dateTime] = useState(new Date());
  const customerData = useSelector((state) => state.customer);

  return (
    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
      <div className="flex flex-col">
        <h1 className="text-md text-gray-800 font-medium">
          {customerData.customerName || "Customer Name"}
        </h1>
        <p className="text-xs text-gray-500 mt-1">
          #{customerData.orderId || "N/A"} / Dine in
        </p>
        <p className="text-xs text-gray-500 mt-2">
          {formatDate(dateTime)}
        </p>
      </div>
      <div className="bg-yellow-500 text-white p-3 rounded-lg font-bold text-lg">
        {getAvatarName(customerData.customerName) || "CN"}
      </div>
    </div>
  );
};

export default CustomerInfo;