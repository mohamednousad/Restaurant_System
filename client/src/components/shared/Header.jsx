import { useState } from "react";
import { FaSearch, FaUserCircle, FaBell } from "react-icons/fa";
import { IoLogOut } from "react-icons/io5";
import { MdDashboard } from "react-icons/md";
import logo from "../../assets/images/logo.png";
import { useDispatch, useSelector } from "react-redux";
import { useMutation } from "@tanstack/react-query";
import { logout } from "../../https";
import { removeUser } from "../../redux/slices/userSlice";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const userData = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);

  const logoutMutation = useMutation({
    mutationFn: () => logout(),
    onSuccess: () => {
      dispatch(removeUser());
      navigate("/auth");
    },
  });

  const handleLogout = () => logoutMutation.mutate();

  return (
    <header className="sticky top-0 z-50 flex flex-col sm:flex-row items-center justify-between gap-4 p-4 bg-white border-b border-gray-200 shadow-sm">
  {/* LOGO & NAME */}
  <div onClick={() => navigate("/")} className="flex items-center gap-2 cursor-pointer">
    {/* SVG LOGO */}
  <svg className="h-8 w-8 text-orange-300" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" stroke-width="2"/>
  <path d="M8 7H16" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
  <path d="M8 11H16" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
  <path d="M8 15H13" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
  <circle cx="17" cy="17" r="1" fill="currentColor"/>
</svg>
    <h1 className="text-lg font-semibold text-gray-800">RS-MANAGER</h1>
    
  {/* SEARCH */}
  <div className="flex items-center gap-3 bg-gray-100 rounded-lg ms-2 px-4 py-2 w-full sm:w-96">
    <FaSearch className="text-gray-500" />
    <input
      type="text"
      placeholder="Search"
      className="bg-transparent outline-none text-gray-700 w-full"
    />
  </div>
  </div>


      {/* USER CONTROLS */}
      <div className="flex items-center gap-4">
        {userData.role === "Admin" && (
          <button
            onClick={() => navigate("/dashboard")}
            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full"
            title="Dashboard"
          >
            <MdDashboard size={20} />
          </button>
        )}

        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full"
            title="Notifications"
          >
            <FaBell size={18} />
          </button>
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-200 rounded shadow-lg p-3 text-sm z-10">
              <p className="text-gray-700 font-medium">No new notifications</p>
            </div>
          )}
        </div>

        <div className="flex items-center gap-2">
          <FaUserCircle className="text-gray-600" size={24} />
          <div className="hidden sm:block">
            <p className="text-sm font-medium text-gray-800">
              {userData.name || "User"}
            </p>
            <p className="text-xs text-gray-500">{userData.role || "Role"}</p>
          </div>
          <button
            onClick={handleLogout}
            className="p-2 text-gray-600 hover:text-red-500 rounded-full"
            title="Logout"
          >
            <IoLogOut size={20} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
