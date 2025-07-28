// RecentOrders.jsx
import React from "react";
import { FaSearch } from "react-icons/fa";
import OrderList from "./OrderList";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { enqueueSnackbar } from "notistack";
import { getOrders } from "../../https/index";

const RecentOrders = () => {
  const { data: resData, isError } = useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      return await getOrders();
    },
    placeholderData: keepPreviousData,
  });

  if (isError) {
    enqueueSnackbar("Something went wrong!", { variant: "error" });
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      <div className="flex justify-between items-center p-4 border-b">
        <h1 className="text-lg font-semibold text-gray-800">Recent Orders</h1>
        <button className="text-blue-500 text-sm font-medium">View all</button>
      </div>

      <div className="flex items-center gap-3 bg-gray-50 rounded-lg p-3 mx-4 my-3">
        <FaSearch className="text-gray-500" />
        <input
          type="text"
          placeholder="Search recent orders"
          className="bg-transparent outline-none text-gray-700 w-full"
        />
      </div>

      <div className="max-h-[400px] overflow-y-auto px-4 pb-4">
        {resData?.data.data.length > 0 ? (
          resData.data.data.map((order) => (
            <OrderList key={order._id} order={order} />
          ))
        ) : (
          <p className="text-center text-gray-500 py-4">No orders available</p>
        )}
      </div>
    </div>
  );
};

export default RecentOrders;