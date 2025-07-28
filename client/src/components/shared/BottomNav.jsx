import React, { useState } from "react";
import { FaHome } from "react-icons/fa";
import { MdOutlineReorder, MdTableBar } from "react-icons/md";
import { CiCircleMore } from "react-icons/ci";
import { BiSolidDish } from "react-icons/bi";
import { useNavigate, useLocation } from "react-router-dom";
import Modal from "./Modal";
import { useDispatch } from "react-redux";
import { setCustomer } from "../../redux/slices/customerSlice";

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [guestCount, setGuestCount] = useState(0);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const increment = () => guestCount < 6 && setGuestCount(prev => prev + 1);
  const decrement = () => guestCount > 0 && setGuestCount(prev => prev - 1);

  const isActive = (path) => location.pathname === path;

  const handleCreateOrder = () => {
    dispatch(setCustomer({ name, phone, guests: guestCount }));
    navigate("/tables");
  };

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-2 h-16 flex justify-around items-center">
        {[
          { path: "/", icon: <FaHome size={18} />, label: "Home" },
          { path: "/orders", icon: <MdOutlineReorder size={18} />, label: "Orders" },
          { path: "/tables", icon: <MdTableBar size={18} />, label: "Tables" },
          { path: "#", icon: <CiCircleMore size={18} />, label: "More" }
        ].map((item) => (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            className={`flex flex-col items-center justify-center p-1 w-full ${
              isActive(item.path) ? "text-blue-500" : "text-gray-500"
            }`}
          >
            {item.icon}
            <span className="text-xs mt-1">{item.label}</span>
          </button>
        ))}

        <button
          onClick={openModal}
          disabled={isActive("/tables") || isActive("/menu")}
          className="absolute bottom-8 bg-yellow-500 text-white rounded-full p-3 shadow-lg hover:bg-yellow-600 disabled:opacity-50"
        >
          <BiSolidDish size={24} />
        </button>
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal} title="Create Order">
        <div className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-1 text-sm">Customer Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="Enter customer name"
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1 text-sm">Customer Phone</label>
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              type="tel"
              placeholder="+91-9999999999"
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1 text-sm">Guests</label>
            <div className="flex items-center justify-between bg-gray-100 p-2 rounded">
              <button onClick={decrement} className="text-gray-700 text-xl px-3">-</button>
              <span className="text-gray-800">{guestCount} Person</span>
              <button onClick={increment} className="text-gray-700 text-xl px-3">+</button>
            </div>
          </div>
          <button
            onClick={handleCreateOrder}
            className="w-full bg-yellow-500 text-white rounded py-2 mt-4 hover:bg-yellow-600"
          >
            Create Order
          </button>
        </div>
      </Modal>
    </>
  );
};

export default BottomNav;