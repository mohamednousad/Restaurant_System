import React, { useState } from "react";
import { useSelector } from "react-redux";
import { formatDate, getAvatarName } from "../../../utils";
import { motion } from "framer-motion";

const CustomerInfo = () => {
  const [dateTime] = useState(new Date());
  const customerData = useSelector((state) => state.customer);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm border border-gray-100"
    >
      <div className="flex flex-col">
        <h1 className="text-md font-semibold text-gray-800">
          {customerData.customerName || "Customer Name"}
        </h1>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded">
            #{customerData.orderId || "N/A"}
          </span>
          <span className="text-xs text-gray-500">Dine in</span>
        </div>
        <p className="text-xs text-gray-400 mt-2">
          {formatDate(dateTime)}
        </p>
      </div>
      <div className="bg-yellow-500 text-white p-3 rounded-lg font-bold text-lg min-w-[44px] h-[44px] flex items-center justify-center">
        {getAvatarName(customerData.customerName) || "CN"}
      </div>
    </motion.div>
  );
};

export default CustomerInfo;