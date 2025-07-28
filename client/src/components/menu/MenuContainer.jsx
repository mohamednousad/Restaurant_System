import { useState } from "react";
import { menus } from "../../constants";
import { GrRadialSelected } from "react-icons/gr";
import { useDispatch } from "react-redux";
import { addItems } from "../../redux/slices/cartSlice";
import MenuItems from "./MenuItems";

const MenuContainer = () => {
  const [selected, setSelected] = useState(menus[0]);
  const [itemCount, setItemCount] = useState(0);
  const [itemId, setItemId] = useState();
  const dispatch = useDispatch();

  const increment = (id) => {
    setItemId(id);
    if (itemCount >= 4) return;
    setItemCount((prev) => prev + 1);
  };

  const decrement = (id) => {
    setItemId(id);
    if (itemCount <= 0) return;
    setItemCount((prev) => prev - 1);
  };

  const handleAddToCart = (item) => {
    if (itemCount === 0) return;
    const { name, price } = item;
    const newObj = {
      id: new Date(),
      name,
      pricePerQuantity: price,
      quantity: itemCount,
      price: price * itemCount,
    };
    dispatch(addItems(newObj));
    setItemCount(0);
  };

  return (
    <div className="w-full px-6 py-4">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 mb-8">
        {menus.map((menu) => (
          <div
            key={menu.id}
            className={`flex flex-col justify-between p-5 rounded-lg h-[120px] cursor-pointer transition-all ${
              selected.id === menu.id ? "ring-3 ring-yellow-500" : "shadow-md"
            }`}
            style={{ backgroundColor: menu.bgColor }}
            onClick={() => {
              setSelected(menu);
              setItemId(0);
              setItemCount(0);
            }}
          >
            <div className="flex justify-between items-center">
              <h1 className="text-white text-base font-semibold flex items-center gap-2">
                {menu.icon} {menu.name}
              </h1>
              {selected.id === menu.id && (
                <GrRadialSelected className="text-white" size={20} />
              )}
            </div>
            <p className="text-white text-opacity-90 text-sm">
              {menu.items.length} Items
            </p>
          </div>
        ))}
      </div>

      <hr className="border-gray-200 my-5" />

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
