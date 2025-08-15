import { useNavigate } from "react-router-dom";
import { getAvatarName, getBgColor } from "../../../utils";
import { useDispatch } from "react-redux";
import { updateTable } from "../../../store/slices/customerSlice";
import { FaLongArrowAltRight } from "react-icons/fa";

const TableCard = ({ id, name, status, initials, seats }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleClick = (name) => {
    if (status === "Booked") return;

    const table = { tableId: id, tableNo: name };
    dispatch(updateTable({ table }));
    navigate(`/customer/menu`);
  };

  return (
    <div
      onClick={() => handleClick(name)}
      key={id}
      className="w-full max-w-xs bg-white rounded-lg shadow-sm border border-gray-200 p-4 cursor-pointer transition-all"
    >
      <div className="flex justify-between items-center">
        <h1 className="text-gray-800 font-medium flex items-center">
          Table <FaLongArrowAltRight className="mx-2 text-gray-400" /> {name}
        </h1>
        <span
          className={`px-2 py-1 rounded-md text-sm font-medium ${
            status === "Booked"
              ? "bg-green-100 text-green-700"
              : "bg-yellow-100 text-yellow-700"
          }`}
        >
          {status}
        </span>
      </div>

      <div className="flex justify-center my-4">
        <div className="flex items-center justify-center">
          <span
            className={`flex items-center justify-center w-16 h-16 rounded-full text-xl font-medium text-white`}
            style={{
              backgroundColor: initials ? getBgColor() : "#e5e7eb",
              lineHeight: "1",
            }}
          >
            {getAvatarName(initials) || "N/A"}
          </span>
        </div>
      </div>

      <p className="text-gray-500 text-sm">
        Seats: <span className="text-gray-700 font-medium">{seats}</span>
      </p>
    </div>
  );
};

export default TableCard;
