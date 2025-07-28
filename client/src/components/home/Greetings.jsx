import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const Greetings = () => {
  const userData = useSelector(state => state.user);
  const [dateTime, setDateTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setDateTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatDate = (date) => {
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
  };

  const formatTime = (date) =>
    `${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`;

  return (
    <div className="bg-white p-4 rounded-xl shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center">
      <div>
        <h1 className="text-lg font-semibold text-gray-800">
          Good Morning, {userData.name || "User"}
        </h1>
        <p className="text-sm text-gray-600 mt-1">
          Give your best services for customers 😀
        </p>
      </div>
      <div className="mt-2 sm:mt-0 text-right">
        <h1 className="text-xl font-bold text-gray-800">{formatTime(dateTime)}</h1>
        <p className="text-sm text-gray-600">{formatDate(dateTime)}</p>
      </div>
    </div>
  );
};

export default Greetings;
