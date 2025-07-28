import logo from "../../../assets/images/logo.png";

const CustomerHeader = ({ tableId = "123" }) => {
  return (
    <div className="bg-yellow-500 text-white p-4 overflow-x-auto">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold">
          {/* <img
            src={logo}
            alt="Restro Logo"
            className="h-9 w-9 rounded-full p-1"
          /> */}
          RS-MANAGER
        </h1>
        <div className="bg-white text-yellow-500 px-3 py-1 rounded-full font-medium">
          Table: {tableId}
        </div>
      </div>
    </div>
  );
};

export default CustomerHeader;
