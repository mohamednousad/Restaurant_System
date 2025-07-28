import React, { useState, useEffect } from "react";
import { MdTableBar, MdCategory } from "react-icons/md";
import { BiSolidDish } from "react-icons/bi";
import Metrics from "../components/dashboard/Metrics";
import RecentOrders from "../components/dashboard/RecentOrders";
import Modal from "../components/dashboard/Modal";

const buttons = [
  { label: "Add Table", icon: <MdTableBar />, action: "table" },
  { label: "Add Category", icon: <MdCategory />, action: "category" },
  { label: "Add Dishes", icon: <BiSolidDish />, action: "dishes" },
];

const tabs = ["Metrics", "Orders", "Payments"];

const Dashboard = () => {

  useEffect(() => {
    document.title = "POS | Admin Dashboard"
  }, [])

  const [isTableModalOpen, setIsTableModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("Metrics");

  const handleOpenModal = (action) => {
    if (action === "table") setIsTableModalOpen(true);
  };

 // Layout 3
return (
  <div className="bg-[#1f1f1f] min-h-[calc(100vh-5rem)] overflow-hidden">
    <div className="container mx-auto flex flex-wrap md:flex-nowrap items-center justify-between py-10 px-4 md:px-6 gap-4">
      <div className="flex flex-wrap gap-3">
        {buttons.map(({ label, icon, action }) => (
          <button
            onClick={() => handleOpenModal(action)}
            className="bg-[#1a1a1a] hover:bg-[#262626] px-6 py-3 rounded-lg text-[#f5f5f5] font-semibold text-md flex items-center gap-2"
          >
            {label} {icon}
          </button>
        ))}
      </div>
      <div className="flex flex-wrap gap-3">
        {tabs.map((tab) => (
          <button
            className={`px-6 py-3 rounded-lg text-[#f5f5f5] font-semibold text-md flex items-center gap-2 ${
              activeTab === tab ? "bg-[#262626]" : "bg-[#1a1a1a] hover:bg-[#262626]"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>
    </div>

    {activeTab === "Metrics" && <Metrics />}
    {/* {activeTab === "Orders" && <RecentOrders />} */}
    {activeTab === "Payments" && (
      <div className="text-white p-6 container mx-auto">
        Payment Component Coming Soon
      </div>
    )}

    {isTableModalOpen && <Modal setIsTableModalOpen={setIsTableModalOpen} />}
  </div>
);

};

export default Dashboard;
