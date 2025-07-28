import React, { useEffect, useRef } from "react";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { FaNotesMedical } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { removeItem } from "../../redux/slices/cartSlice";

const CartInfo = () => {
  const cartData = useSelector((state) => state.cart);
  const scrollRef = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    if(scrollRef.current){
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth"
      })
    }
  },[cartData]);

  const handleRemove = (itemId) => {
    dispatch(removeItem(itemId));
  }

  return (
    <div className="py-2">
      <h1 className="text-lg text-gray-800 font-medium mb-3">
        Order Details
      </h1>
      <div className="overflow-y-auto max-h-[380px] pr-2" ref={scrollRef}>
        {cartData.length === 0 ? (
          <p className="text-gray-500 text-sm text-center py-10">
            Your cart is empty. Start adding items!
          </p>
        ) : cartData.map((item) => (
          <div key={item.id} className="bg-gray-50 rounded-lg p-3 mb-2">
            <div className="flex justify-between items-center">
              <h1 className="text-gray-700 font-medium">
                {item.name}
              </h1>
              <p className="text-gray-600">x{item.quantity}</p>
            </div>
            <div className="flex justify-between items-center mt-2">
              <div className="flex gap-2">
                <RiDeleteBin2Fill
                  onClick={() => handleRemove(item.id)}
                  className="text-gray-500 cursor-pointer hover:text-red-500"
                  size={18}
                />
                <FaNotesMedical
                  className="text-gray-500 cursor-pointer hover:text-blue-500"
                  size={18}
                />
              </div>
              <p className="text-gray-800 font-bold">₹{item.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CartInfo;