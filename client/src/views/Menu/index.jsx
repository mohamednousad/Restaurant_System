import { useEffect, useState } from "react";
import BackButton from "../../components/shared-components/BackButton";
import { MdRestaurantMenu } from "react-icons/md";
import MenuContainer from "../../components/app-components/menu/menuContainer";
import CustomerInfo from "../../components/app-components/menu/customerInfo";
import CartInfo from "../../components/app-components/menu/cartInfo";
import Bill from "../../components/app-components/menu/bill";
import { useSelector } from "react-redux";
import { AnimatePresence } from "framer-motion";
import { MdKeyboardArrowUp } from "react-icons/md";
import { motion }  from 'framer-motion'

const Menu = () => {
  useEffect(() => {
    document.title = "POS | Menu";
  }, []);

  const customerData = useSelector((state) => state.customer);
  const [showOrder, setShowOrder] = useState(false);

  return (
       <div className="bg-gray-50 min-h-screen pb-20">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <BackButton />
            <h1 className="text-xl font-bold text-gray-800">Menu</h1>
          </div>
          <div className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-lg">
            <MdRestaurantMenu className="text-gray-700" size={20} />
            <div>
              <p className="text-sm font-medium text-gray-800">
                {customerData.customerName || "Guest"}
              </p>
              <p className="text-xs text-gray-500">
                Table: {customerData.table?.tableNo || "N/A"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Order Toggle */}
      <div className="lg:hidden fixed bottom-16 right-4 z-20">
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => setShowOrder(!showOrder)}
          className="bg-yellow-500 text-white p-3 rounded-full shadow-lg"
        >
          <motion.div
            animate={{ rotate: showOrder ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <MdKeyboardArrowUp size={24} />
          </motion.div>
        </motion.button>
      </div>

      <div className="max-w-7xl mx-auto p-4 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
            <MenuContainer />
        </div>

        {/* Order Section */}
        <div className="lg:col-span-1">
          <div className="hidden lg:block bg-white rounded-lg shadow-sm p-4 sticky top-4">
            <CustomerInfo />
            <hr className="border-gray-200 my-4" />
            <CartInfo />
            <hr className="border-gray-200 my-4" />
            <Bill />
          </div>

          <AnimatePresence>
            {showOrder && (
              <motion.div
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "100%" }}
                transition={{ type: "spring", damping: 30, stiffness: 300 }}
                className="lg:hidden fixed inset-x-0 bottom-0 bg-white rounded-t-2xl shadow-xl z-10 p-4"
              >
                <div className="flex justify-center mb-2">
                  <div className="w-10 h-1 bg-gray-300 rounded-full"></div>
                </div>
                <div className="max-h-[60vh] overflow-y-auto">
                  <CustomerInfo />
                  <hr className="border-gray-200 my-4" />
                  <CartInfo />
                  <hr className="border-gray-200 my-4" />
                  <Bill />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );

};

export default Menu;
