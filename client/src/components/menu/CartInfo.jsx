import { useState } from "react";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { FaNotesMedical, FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { removeItem } from "../../redux/slices/cartSlice";

const CartInfo = () => {
  const cartData = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  const handleRemove = (itemId) => {
    dispatch(removeItem(itemId));
  };

  const totalPages = Math.ceil(cartData.length / itemsPerPage);
  const currentItems = cartData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="py-3 px-3">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-lg font-semibold text-gray-800">Order Details</h1>
      </div>

      {cartData.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-8">
          <p className="text-gray-500 text-sm">Your cart is empty</p>
          <p className="text-gray-400 text-xs">Start adding items</p>
        </div>
      ) : (
        <div
          className={`space-y-2 ${
            cartData.length > 1 ? "max-h-[200px] overflow-y-auto pr-2" : ""
          }`}
        >
          {cartData.map((item) => (
            <div key={item.id} className="bg-gray-50 rounded-lg p-3">
              <div className="flex justify-between items-center">
                <h2 className="text-gray-800 font-medium text-sm truncate max-w-[120px]">
                  {item.name}
                </h2>
                <span className="text-gray-600 text-sm">x{item.quantity}</span>
              </div>
              <div className="flex justify-between items-center mt-2">
                <div className="flex gap-2">
                  <RiDeleteBin2Fill
                    onClick={() => handleRemove(item.id)}
                    className="text-gray-500 hover:text-red-500 cursor-pointer transition-colors"
                    size={16}
                  />
                  <FaNotesMedical
                    className="text-gray-500 hover:text-blue-500 cursor-pointer transition-colors"
                    size={16}
                  />
                </div>
                <p className="text-gray-800 font-bold text-sm">
                  LKR {item.price}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CartInfo;
