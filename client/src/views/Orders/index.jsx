import { useState, useEffect } from "react";
import OrderCard from "../../components/app-components/orders";
import BackButton from "../../components/shared-components/BackButton";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getOrders } from "../../services/index";
import { enqueueSnackbar } from "notistack"

const Orders = () => {

  const [status, setStatus] = useState("all");

    useEffect(() => {
      document.title = "POS | Orders"
    }, [])

  const { data: resData, isError } = useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      return await getOrders();
    },
    placeholderData: keepPreviousData
  })

  if(isError) {
    enqueueSnackbar("Something went wrong!", {variant: "error"})
  }

 return (
  <section className="bg-white min-h-[calc(100vh-5rem)]">
    <div className="sticky top-0 z-10 bg-white p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div className="flex items-center gap-3">
        <BackButton />
        <h1 className="text-xl font-bold text-gray-800">Orders</h1>
      </div>
      
      <div className="flex flex-wrap gap-2">
        {['all', 'progress', 'ready', 'completed'].map((tab) => (
          <button 
            key={tab}
            onClick={() => setStatus(tab)}
            className={`px-4 py-2 rounded-lg font-medium capitalize ${
              status === tab 
                ? 'bg-blue-100 text-blue-600' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {tab.replace(/-/g, ' ')}
          </button>
        ))}
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 py-4 px-6 overflow-y-auto">
      {resData?.data.data.length > 0 ? (
        resData.data.data.map((order) => (
          <OrderCard key={order._id} order={order} />
        ))
      ) : (
        <div className="col-span-3 flex justify-center items-center h-64">
          <p className="text-gray-500">No orders available</p>
        </div>
      )}
    </div>

  </section>
);
};

export default Orders;
