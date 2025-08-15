import { useState } from "react";
import { menus } from "../../../../constants";
import { GrRadialSelected } from "react-icons/gr";
import { useDispatch } from "react-redux";
import { addItems } from "../../../../store/slices/cartSlice";
import MenuItems from "./menuItems";

const MenuContainer = () => {
  const [selected, setSelected] = useState(menus[0]);
  const [itemCount, setItemCount] = useState(0);
  const [itemId, setItemId] = useState();
  const dispatch = useDispatch();

  const increment = (id) => {
    setItemId(id);
    if (itemCount >= 10) return;
    setItemCount((prev) => prev + 1);
  };

  const decrement = (id) => {
    setItemId(id);
    if (itemCount <= 0) return;
    setItemCount((prev) => prev - 1);
  };

  const handleAddToCart = (item) => {
    if (itemCount === 0) return;
    const newObj = {
      id: `${item.id}-${Date.now()}`,
      name: item.name,
      pricePerQuantity: item.price,
      quantity: itemCount,
      price: item.price * itemCount,
      image: item.image
    };
    dispatch(addItems(newObj));
    setItemCount(0);
  };

  return (
    <div className="w-full px-4 py-2 md:px-6 md:py-4">
      <div className="flex overflow-x-auto pb-2 mb-4 scrollbar-hide">
        <div className="flex space-x-3">
          {menus.map((menu) => (
            <button
              key={menu.id}
              onClick={() => {
                setSelected(menu);
                setItemId(0);
                setItemCount(0);
              }}
              className={`flex flex-col items-center justify-center p-3 rounded-lg min-w-[100px] transition-all ${
                selected.id === menu.id 
                  ? "bg-yellow-500 text-white" 
                  : "bg-gray-100 text-gray-800"
              }`}
            >
              <span className="text-lg mb-1">{menu.icon}</span>
              <span className="text-sm font-medium">{menu.name}</span>
              <span className="text-xs mt-1">({menu.items.length})</span>
            </button>
          ))}
        </div>
      </div>

      <MenuItems
        selected={selected}
        itemCount={itemCount}
        itemId={itemId}
        onIncrement={increment}
        onDecrement={decrement}
        onAddToCart={handleAddToCart}
      />
    </div>
  );
};

export default MenuContainer;