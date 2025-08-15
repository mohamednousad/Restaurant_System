import { useState, useEffect } from "react";
import { MdTableBar, MdCategory } from "react-icons/md";
import { BiSolidDish } from "react-icons/bi";
import Metrics from "../../components/app-components/dashboard/metrics";
import RecentOrders from "../../components/app-components/dashboard/recentOrders";
import Modal from "../../components/app-components/dashboard/modal";

const buttons = [
  { label: "Add Table", icon: <MdTableBar />, action: "table" },
  { label: "Add Category", icon: <MdCategory />, action: "category" },
  { label: "Add Dishes", icon: <BiSolidDish />, action: "dishes" },
];

const tabs = ["Metrics", "Orders", "Payments"];

const Dashboard = () => {
  useEffect(() => {
    document.title = "POS | Admin Dashboard";
  }, []);

  const [isTableModalOpen, setIsTableModalOpen] = useState(false);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [isDishesModalOpen, setIsDishesModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("Metrics");

  const handleOpenModal = (action) => {
    if (action === "table") setIsTableModalOpen(true);
    else if (action === "category") setIsCategoryModalOpen(true);
    else if (action === "dishes") setIsDishesModalOpen(true);
  };

  return (
    <div className="bg-white min-h-[calc(100vh-5rem)] mt-2">
      <div className="container mx-auto p-4">
        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div className="flex flex-wrap gap-2">
            {buttons.map(({ label, icon, action }, index) => (
              <button
                key={index}
                onClick={() => handleOpenModal(action)}
                className="flex items-center gap-2 px-4 py-2 rounded-md text-gray-700 bg-gray-100 hover:bg-gray-200"
              >
                {icon} {label}
              </button>
            ))}
          </div>

          {/* Tab Navigation */}
          <div className="flex flex-wrap gap-2">
            {tabs.map((tab) => (
              <button
                key={tab}
                className={`px-4 py-2 rounded-lg font-medium text-sm flex items-center gap-2 transition-colors ${
                  activeTab === tab
                    ? "bg-yellow-500 text-white"
                    : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {activeTab === "Metrics" && <Metrics />}
        {activeTab === "Orders" && <RecentOrders />}
        {activeTab === "Payments" && (
          <div className="text-gray-800 p-4">Payment Component Coming Soon</div>
        )}
      </div>

      {isTableModalOpen && <Modal setIsTableModalOpen={setIsTableModalOpen} />}
      {isCategoryModalOpen && <Modal setIsCategoryModalOpen={setIsCategoryModalOpen} />}
      {isDishesModalOpen && <Modal setIsDishesModalOpen={setIsDishesModalOpen} />}
    </div>
  );
};

export default Dashboard;
