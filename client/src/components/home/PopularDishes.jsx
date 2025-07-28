import React from "react";
import { popularDishes } from "../../constants";

const PopularDishes = () => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm w-full">
      <div className="flex justify-between items-center px-4 py-3 border-b">
        <h1 className="text-gray-800 text-lg font-semibold">Popular Dishes</h1>
        <button className="text-blue-500 text-sm font-medium">View all</button>
      </div>

      <div className="overflow-y-auto max-h-[600px] p-2">
        {popularDishes.map((dish) => (
          <div
            key={dish.id}
            className="flex items-center gap-3 bg-gray-50 rounded-lg p-3 my-2"
          >
            <span className="text-gray-700 font-bold min-w-[30px]">
              {dish.id < 10 ? `0${dish.id}` : dish.id}
            </span>
            <img
              src={dish.image}
              alt={dish.name}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div className="flex-1">
              <h2 className="text-gray-800 font-medium">{dish.name}</h2>
              <p className="text-gray-500 text-sm">
                Orders: {dish.numberOfOrders}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularDishes;
