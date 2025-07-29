import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { enqueueSnackbar } from "notistack";
import BackButton from "../../components/shared-components/BackButton";
import TableCard from "../../components/app-components/tables";
import { getTables } from "../../services";

const Tables = () => {
  const [status, setStatus] = useState("all");

  useEffect(() => {
    document.title = "POS | Tables";
  }, []);

  const { data: resData, isError } = useQuery({
    queryKey: ["tables", status],
    queryFn: getTables,
  });

  if (isError) {
    enqueueSnackbar("Something went wrong!", { variant: "error" });
  }

  const filteredTables = resData?.data.data.filter(
    (table) => status === "all" || table.status.toLowerCase() === status
  );

  return (
    <div className="bg-gray-100 min-h-[calc(100vh-5rem)] flex flex-col">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <BackButton />
            <h1 className="text-xl font-bold text-gray-800">Tables</h1>
          </div>

          <div className="flex gap-2">
            {["all", "booked"].map((tab) => (
              <button
                key={tab}
                onClick={() => setStatus(tab)}
                className={`px-4 py-2 rounded-lg capitalize ${
                  status === tab
                    ? "bg-yellow-500 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Table Grid */}
      <div className="p-4 flex-1 overflow-y-auto">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {filteredTables?.map((table) => (
            <TableCard
              key={table._id}
              id={table._id}
              name={table.tableNo}
              status={table.status}
              initials={table?.currentOrder?.customerDetails.name}
              seats={table.seats}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Tables;
