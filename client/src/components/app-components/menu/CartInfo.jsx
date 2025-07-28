import { motion, AnimatePresence } from "framer-motion";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { FaNotesMedical } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { removeItem } from "../../../redux/slices/cartSlice";

const CartInfo = () => {
  const cartData = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const handleRemove = (itemId) => {
    dispatch(removeItem(itemId));
  };

  return (
    <div className="py-3">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-lg font-semibold text-gray-800">Order Details</h1>
        <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
          {cartData.length} items
        </span>
      </div>

      {cartData.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center justify-center py-8"
        >
          <p className="text-gray-500 text-sm">Your cart is empty</p>
          <p className="text-gray-400 text-xs">Start adding items</p>
        </motion.div>
      ) : (
        <div className={`space-y-3 ${cartData.length > 2 ? 'max-h-[200px] overflow-y-auto pr-2' : ''}`}>
          <AnimatePresence>
            {cartData.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.2 }}
                className="bg-white rounded-lg p-3 shadow-sm border border-gray-100"
              >
                <div className="flex justify-between items-center">
                  <h2 className="text-gray-800 font-medium text-sm truncate max-w-[120px]">
                    {item.name}
                  </h2>
                  <span className="text-gray-600 text-sm">x{item.quantity}</span>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleRemove(item.id)}
                      className="text-red-500 transition-colors"
                    >
                      <RiDeleteBin2Fill size={16} />
                    </button>
                    <button className="text-blue-500 transition-colors">
                      <FaNotesMedical size={16} />
                    </button>
                  </div>
                  <p className="text-gray-800 font-bold text-sm">
                    Rs. {item.price}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};

export default CartInfo;