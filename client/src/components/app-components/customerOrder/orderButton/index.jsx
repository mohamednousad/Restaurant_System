import { useState } from "react";
import { BiSolidDish } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { setCustomer } from "../../../../store/slices/customerSlice";
import Modal from "../../../shared-components/Modal";
import { useNavigate } from "react-router-dom";

const OrderButton = ({ tableId="123" }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [guestCount, setGuestCount] = useState(0);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const increment = () => guestCount < 6 && setGuestCount(prev => prev + 1);
  const decrement = () => guestCount > 0 && setGuestCount(prev => prev - 1);

  const handleCreateOrder = () => {
    dispatch(setCustomer({ 
      name, 
      phone, 
      guests: guestCount,
    //   table: { tableId } // Include tableId from QR code
    }));
    navigate("/customer/tables");
  };

  return (
    <>
      <div className="fixed bottom-4 right-4">
        <button
          onClick={openModal}
          className="bg-yellow-500 text-white rounded-full p-4 shadow-lg"
        >
          <BiSolidDish size={24} />
        </button>
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal} title="Create Order">
        <div className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-1 text-sm">Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="Your name"
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1 text-sm">Phone</label>
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              type="tel"
              placeholder="+94-761234567"
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1 text-sm">Guests</label>
            <div className="flex items-center justify-between bg-gray-100 p-2 rounded">
              <button onClick={decrement} className="text-gray-700 text-xl px-3">
                -
              </button>
              <span className="text-gray-800">{guestCount} Person</span>
              <button onClick={increment} className="text-gray-700 text-xl px-3">
                +
              </button>
            </div>
          </div>
          <button
            onClick={handleCreateOrder}
            className="w-full bg-yellow-500 text-white rounded py-2 mt-4"
          >
            Confirm Order
          </button>
        </div>
      </Modal>
    </>
  );
};

export default OrderButton;