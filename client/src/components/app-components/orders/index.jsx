import { FaCheckDouble, FaLongArrowAltRight } from "react-icons/fa";
import { FaCircle } from "react-icons/fa";
import { formatDateAndTime, getAvatarName } from "../../../utils/index";

const OrderCard = ({ key, order }) => {
 return (
  <div key={key} className="w-full bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-4">
    <div className="flex items-start gap-4">
      <div className="bg-yellow-500 text-white p-3 rounded-lg font-bold text-lg">
        {getAvatarName(order.customerDetails.name)}
      </div>
      
      <div className="flex-1 flex justify-between">
        <div className="space-y-1">
          <h1 className="text-gray-800 font-medium">
            {order.customerDetails.name}
          </h1>
          <p className="text-gray-500 text-sm">
            #{Math.floor(new Date(order.orderDate).getTime())} • Dine in
          </p>
          <p className="text-gray-500 text-sm flex items-center">
            Table <FaLongArrowAltRight className="mx-1" /> {order.table.tableNo}
          </p>
        </div>

        <div className="text-right space-y-2">
          {order.orderStatus === "Ready" ? (
            <>
              <span className="inline-flex items-center bg-green-100 text-green-700 px-2 py-1 rounded-md text-sm">
                <FaCheckDouble className="mr-1" /> Ready
              </span>
              <p className="text-gray-500 text-sm flex items-center justify-end">
                <FaCircle className="text-green-500 mr-1 text-xs" /> Ready to serve
              </p>
            </>
          ) : (
            <>
              <span className="inline-flex items-center bg-yellow-100 text-yellow-700 px-2 py-1 rounded-md text-sm">
                <FaCircle className="mr-1 text-xs" /> {order.orderStatus}
              </span>
              <p className="text-gray-500 text-sm flex items-center justify-end">
                <FaCircle className="text-yellow-500 mr-1 text-xs" /> Preparing
              </p>
            </>
          )}
        </div>
      </div>
    </div>

    <div className="flex justify-between text-gray-500 text-sm mt-4">
      <p>{formatDateAndTime(order.orderDate)}</p>
      <p>{order.items.length} Items</p>
    </div>

    <hr className="border-gray-200 my-3" />

    <div className="flex justify-between items-center">
      <h1 className="text-gray-800 font-medium">Total</h1>
      <p className="text-gray-800 font-bold">₹{order.bills.totalWithTax.toFixed(2)}</p>
    </div>
  </div>
);
};

export default OrderCard;
