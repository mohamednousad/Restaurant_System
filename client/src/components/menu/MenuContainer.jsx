import React, { useState } from "react";
import { menus } from "../../constants";
import { GrRadialSelected } from "react-icons/gr";
import { FaShoppingCart } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { addItems } from "../../redux/slices/cartSlice";

const MenuContainer = () => {
  const [selected, setSelected] = useState(menus[0]);
  const [itemCount, setItemCount] = useState(0);
  const [itemId, setItemId] = useState();
  const dispatch = useDispatch();

  const increment = (id) => {
    setItemId(id);
    if (itemCount >= 4) return;
    setItemCount((prev) => prev + 1);
  };

  const decrement = (id) => {
    setItemId(id);
    if (itemCount <= 0) return;
    setItemCount((prev) => prev - 1);
  };

  const handleAddToCart = (item) => {
    if (itemCount === 0) return;

    const { name, price } = item;
    const newObj = {
      id: new Date(),
      name,
      pricePerQuantity: price,
      quantity: itemCount,
      price: price * itemCount,
    };

    dispatch(addItems(newObj));
    setItemCount(0);
  };

  return (
    <div className="w-full px-4 py-4">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 mb-5">
        {menus.map((menu) => (
          <div
            key={menu.id}
            className={`flex flex-col justify-between p-3 rounded-md h-[90px] cursor-pointer transition-all ${
              selected.id === menu.id ? "ring-2 ring-yellow-400" : "shadow"
            }`}
            style={{ backgroundColor: menu.bgColor }}
            onClick={() => {
              setSelected(menu);
              setItemId(0);
              setItemCount(0);
            }}
          >
            <div className="flex justify-between items-center">
              <h1 className="text-white text-sm font-medium flex items-center gap-1">
                {menu.icon} {menu.name}
              </h1>
              {selected.id === menu.id && (
                <GrRadialSelected className="text-white" size={16} />
              )}
            </div>
            <p className="text-white text-opacity-80 text-xs">
              {menu.items.length} Items
            </p>
          </div>
        ))}
      </div>

      <hr className="border-gray-200 my-4" />

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {selected?.items.map((item) => (
          <div
            key={item.id}
            className="flex flex-col bg-white rounded-md overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-all"
          >
            <img
              src={item.image || "https://picsum.photos/200/300"}
              alt={item.name}
              className="w-full h-[100px] object-cover"
            />
            <div className="p-2 flex flex-col gap-1">
              <div className="flex justify-between items-start">
                <h2 className="text-gray-800 text-sm font-semibold line-clamp-2">
                  {item.name}
                </h2>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAddToCart(item);
                  }}
                  className="bg-green-50 text-green-600 p-1 rounded-md hover:bg-green-100 min-w-[30px]"
                >
                  <FaShoppingCart size={14} />
                </button>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-gray-900 font-bold text-sm">₹{item.price}</p>
                <div className="flex items-center gap-2 bg-gray-50 px-2 py-1 rounded-md w-[68px]">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      decrement(item.id);
                    }}
                    className="text-gray-500 hover:text-gray-700 text-base"
                  >
                    &minus;
                  </button>
                  <span className="text-gray-800 text-sm">
                    {itemId === item.id ? itemCount : "0"}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      increment(item.id);
                    }}
                    className="text-gray-500 hover:text-gray-700 text-base"
                  >
                    &#43;
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MenuContainer;
