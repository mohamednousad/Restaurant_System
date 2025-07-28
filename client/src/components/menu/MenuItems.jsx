
import { FaShoppingCart } from "react-icons/fa";
import image from '../../assets/images/butter-chicken-4.jpg';

const MenuItems = ({ selected, itemCount, itemId, onIncrement, onDecrement, onAddToCart }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {selected?.items.map((item) => (
        <div 
          key={item.id} 
          className="flex flex-col bg-white rounded-md overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-all"
        >
          <img 
            src={item.image || image} 
            alt={item.name} 
            className="w-full h-[120px] object-cover" 
          />
          <div className="p-3 flex flex-col gap-2">
            <div className="flex justify-between items-start">
              <h2 className="text-gray-800 text-sm font-semibold line-clamp-2">
                {item.name}
              </h2>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onAddToCart(item);
                }}
                className="bg-green-50 text-green-600 p-1.5 rounded-md hover:bg-green-100"
              >
                <FaShoppingCart size={14} />
              </button>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-gray-900 font-bold text-sm">₹{item.price}</p>
              <div className="flex items-center gap-2 bg-gray-50 px-2 py-1 rounded-md w-[70px]">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDecrement(item.id);
                  }}
                  className="text-gray-500 hover:text-gray-700 text-base"
                >
                  &minus;
                </button>
                <span className="text-gray-800 text-sm">
                  {itemId === item.id ? itemCount : "0"}
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onIncrement(item.id);
                  }}
                  className="text-gray-500 hover:text-gray-700 text-base"
                >
                  &#43;
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MenuItems;
