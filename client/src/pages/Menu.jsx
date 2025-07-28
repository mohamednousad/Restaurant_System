import React, { useEffect } from "react";
import BottomNav from "../components/shared/BottomNav";
import BackButton from "../components/shared/BackButton";
import { MdRestaurantMenu } from "react-icons/md";
import MenuContainer from "../components/menu/MenuContainer";
import CustomerInfo from "../components/menu/CustomerInfo";
import CartInfo from "../components/menu/CartInfo";
import Bill from "../components/menu/Bill";
import { useSelector } from "react-redux";

const Menu = () => {
  useEffect(() => {
    document.title = "POS | Menu";
  }, []);

  const customerData = useSelector((state) => state.customer);

  // Layout 1
return (
  <section className="bg-white min-h-[calc(100vh-5rem)] flex flex-col lg:flex-row">
    <div className="lg:w-[70%] w-full overflow-hidden">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-2 sm:px-4 border-b sticky top-0 bg-white z-10">
        <div className="flex items-center gap-3 mb-2 sm:mb-0">
          <BackButton />
          <h1 className="text-gray-800 text-xl sm:text-2xl font-bold">Menu</h1>
        </div>
        <div className="flex items-center gap-3 bg-gray-100 p-2 rounded-lg">
          <MdRestaurantMenu className="text-gray-700 text-2xl" />
          <div>
            <h1 className="text-sm text-gray-800 font-medium">
              {customerData.customerName || "Customer Name"}
            </h1>
            <p className="text-xs text-gray-500">
              Table: {customerData.table?.tableNo || "N/A"}
            </p>
          </div>
        </div>
      </div>

      <div className="p-4 overflow-y-auto h-[calc(100vh-12rem)]">
        <MenuContainer />
      </div>
    </div>

    <div className="lg:w-[30%] w-full border-l border-gray-200 bg-white fixed lg:static bottom-0 left-0 right-0 z-20 shadow-xl lg:shadow-none">
      <div className="h-[50vh] lg:h-[calc(100vh-5rem)] flex flex-col">
        <div className="p-4 overflow-y-auto flex-1">
          <CustomerInfo />
          <hr className="border-gray-200 my-3" />
          <CartInfo />
          <hr className="border-gray-200 my-3" />
          <Bill />
        </div>
      </div>
    </div>

    <BottomNav />
  </section>
);

};

export default Menu;
