import { itemsData, metricsData } from "../../../constants";

const Metrics = () => {
  return (
    <div className="container mx-auto p-4">
      {/* Overall Performance Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h2 className="font-semibold text-gray-800 text-xl">
            Overall Performance
          </h2>
          <p className="text-sm text-gray-500">
            Key metrics showing your restaurant's performance
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-md text-gray-700 bg-gray-100 hover:bg-gray-200">
          Last 1 Month
          <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>
{/* Metrics Grid */}
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
  {metricsData.map((metric, index) => (
    <div
      key={index}
      className="rounded-lg p-5 shadow-sm"
      style={{ backgroundColor: metric.color }}
    >
      <div className="flex justify-between items-center">
        <p className="font-medium text-sm text-white">
          {metric.title}
        </p>
        <div className="flex items-center gap-1">
          <svg
            className="w-4 h-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke={metric.isIncrease ? "#ffffff" : "#fee2e2"}
            strokeWidth="3"
          >
            <path
              d={metric.isIncrease ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"}
            />
          </svg>
          <p className={`font-medium text-sm ${metric.isIncrease ? "text-white" : "text-red-100"}`}>
            {metric.percentage}
          </p>
        </div>
      </div>
      <p className="mt-2 font-bold text-3xl text-white">
        {metric.value}
      </p>
    </div>
  ))}
</div>

{/* Item Details Section */}
<div className="mb-6">
  <div className="mb-4">
    <h2 className="font-bold text-gray-800 text-2xl">
      Item Details
    </h2>
    <p className="text-base text-gray-600">
      Popular items and their performance metrics
    </p>
  </div>

  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
    {itemsData.map((item, index) => (
      <div 
        key={index} 
        className="rounded-lg p-5 shadow-sm"
        style={{ backgroundColor: item.color }}
      >
        <div className="flex justify-between items-center">
          <p className="font-medium text-sm text-white">{item.title}</p>
          {item.percentage && (
            <div className="flex items-center gap-1">
              <svg 
                className="w-4 h-4 text-white" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="3"
              >
                <path d="M5 15l7-7 7 7" />
              </svg>
              <p className="font-medium text-sm text-white">{item.percentage}</p>
            </div>
          )}
        </div>
        <p className="mt-2 font-bold text-3xl text-white">{item.value}</p>
      </div>
    ))}
  </div>
</div>
    </div>
  );
};

export default Metrics;