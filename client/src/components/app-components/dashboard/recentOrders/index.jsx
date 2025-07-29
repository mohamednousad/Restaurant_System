import React from "react";
import { GrUpdate } from "react-icons/gr";
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { enqueueSnackbar } from "notistack";
import { getOrders, updateOrderStatus } from "../../../../services";
import { formatDateAndTime } from "../../../../utils";

const RecentOrders = () => {
  const queryClient = useQueryClient();

  const handleStatusChange = ({ orderId, orderStatus }) => {
    orderStatusUpdateMutation.mutate({ orderId, orderStatus });
  };

  const orderStatusUpdateMutation = useMutation({
    mutationFn: ({ orderId, orderStatus }) =>
      updateOrderStatus({ orderId, orderStatus }),
    onSuccess: () => {
      enqueueSnackbar("Order status updated successfully!", {
        variant: "success",
      });
      queryClient.invalidateQueries(["orders"]);
    },
    onError: () => {
      enqueueSnackbar("Failed to update order status!", { variant: "error" });
    },
  });

  const {
    data: resData,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["orders"],
    queryFn: getOrders,
    placeholderData: keepPreviousData,
  });

  if (isError) {
    enqueueSnackbar("Something went wrong!", { variant: "error" });
  }

  const orders = resData?.data?.data || [];
return (
  <div className="container mx-auto bg-white rounded-lg p-4">
    <h2 className="text-gray-800 text-xl font-semibold mb-4">
      Recent Orders
    </h2>
    <div className="overflow-x-auto">
      <table className="w-full text-left text-gray-700">
        <thead className="bg-gray-100 text-gray-600">
          <tr>
            <th className="p-3 text-sm font-medium">Order ID</th>
            <th className="p-3 text-sm font-medium">Customer</th>
            <th className="p-3 text-sm font-medium">Status</th>
            <th className="p-3 text-sm font-medium">Date & Time</th>
            <th className="p-3 text-sm font-medium">Items</th>
            <th className="p-3 text-sm font-medium">Table No</th>
            <th className="p-3 text-sm font-medium">Total</th>
            <th className="p-3 text-sm font-medium text-center">Payment</th>
          </tr>
        </thead>
        <tbody>
          {orders.length > 0 ? (
            orders.map((order, index) => (
              <tr
                key={index}
                className="border-b border-gray-200 hover:bg-gray-50"
              >
                <td className="p-4 text-sm">
                  #{Math.floor(new Date(order.orderDate).getTime())}
                </td>
                <td className="p-4 text-sm">{order.customerDetails.name}</td>
                <td className="p-4">
                  <select
                    className={`bg-white border ${
                      order.orderStatus === "Ready"
                        ? "border-green-300 text-green-700"
                        : "border-yellow-300 text-yellow-700"
                    } p-2 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm`}
                    value={order.orderStatus}
                    onChange={(e) =>
                      handleStatusChange({
                        orderId: order._id,
                        orderStatus: e.target.value,
                      })
                    }
                  >
                    <option className="text-yellow-700" value="In Progress">
                      In Progress
                    </option>
                    <option className="text-green-700" value="Ready">
                      Ready
                    </option>
                  </select>
                </td>
                <td className="p-4 text-sm">
                  {formatDateAndTime(order.orderDate)}
                </td>
                <td className="p-4 text-sm">{order.items.length} Items</td>
                <td className="p-4 text-sm">Table {order.table.tableNo}</td>
                <td className="p-4 text-sm font-medium">
                  LKR {order.bills.totalWithTax}
                </td>
                <td className="p-4 text-sm text-center">
                  {order.paymentMethod}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td className="p-4 text-center text-gray-500 text-sm" colSpan="8">
                No orders found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  </div>
);
};

export default RecentOrders;
