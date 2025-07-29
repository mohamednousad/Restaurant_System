import { useEffect } from "react";
import OrderButton from "../../components/app-components/customerOrder/orderButton";
import { popularDishes } from "../../constants";

const CustomerOrder = () => {
  useEffect(() => {
    document.title = "Customer Orders";
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Popular Dishes</h1>
          {/* <button className="text-yellow-600 font-medium">View All</button> */}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {popularDishes.map((dish) => (
            <div
              key={dish.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="relative h-40 bg-gray-200">
                <img
                  src={dish.image}
                  alt={dish.name}
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-2 left-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-xs">
                  {dish.id < 10 ? `0${dish.id}` : dish.id}
                </span>
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start">
                  <h3 className="font-bold text-gray-800">{dish.name}</h3>
                  <span className="text-yellow-600 font-bold">LKR {dish.price}</span>
                </div>
                <p className="text-gray-500 text-sm mt-1">
                  {dish.description || 'Delicious dish'}
                </p>
                <div className="flex justify-between items-center mt-3">
                  <span className="text-gray-500 text-xs">
                    Orders: {dish.numberOfOrders}
                  </span>
             
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="fixed bottom-6 right-6 z-10">
        <OrderButton />
      </div>
    </div>
  );
};

export default CustomerOrder;