import { FaShoppingCart } from "react-icons/fa";
import defaultImage from '../../../../../assets/images/butter-chicken-4.jpg';

const MenuItems = ({ selected, itemCount, itemId, onIncrement, onDecrement, onAddToCart }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
      {selected?.items.map((item) => (
        <div 
          key={item.id} 
          className="flex flex-col bg-white rounded-lg overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-all"
        >
          <div className="relative pt-[75%]"> {/* Aspect ratio box */}
            <img 
              src={item.image || defaultImage} 
              alt={item.name} 
              className="absolute top-0 left-0 w-full h-full object-cover" 
            />
          </div>
          <div className="p-3 flex flex-col gap-2">
            <div className="flex justify-between items-start">
              <h2 className="text-gray-800 font-semibold text-sm line-clamp-2 flex-1">
                {item.name}
              </h2>
              <p className="text-yellow-600 font-bold ml-2">LKR {item.price}</p>
            </div>
            
            <div className="flex justify-between items-center mt-2">
              <div className="flex items-center gap-2 bg-gray-100 px-2 py-1 rounded-full">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDecrement(item.id);
                  }}
                  className="text-gray-600 hover:text-gray-800 text-lg w-6 h-6 flex items-center justify-center"
                >
                  -
                </button>
                <span className="text-gray-800 text-sm w-6 text-center">
                  {itemId === item.id ? itemCount : "0"}
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onIncrement(item.id);
                  }}
                  className="text-gray-600 hover:text-gray-800 text-lg w-6 h-6 flex items-center justify-center"
                >
                  +
                </button>
              </div>
              
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  if (itemId === item.id && itemCount > 0) {
                    onAddToCart(item);
                  }
                }}
                className={`p-2 rounded-full ${
                  itemId === item.id && itemCount > 0
                    ? "bg-yellow-500 text-white"
                    : "bg-gray-200 text-gray-500"
                }`}
                disabled={!(itemId === item.id && itemCount > 0)}
              >
                <FaShoppingCart size={14} />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MenuItems;