import { motion } from "framer-motion";

const PaymentSlideUp = ({ isOpen, onClose }) => {
  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={onClose}
        />
      )}

      {/* Slide-up panel */}
      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: isOpen ? 0 : "100%" }}
        transition={{ type: "spring", damping: 30 }}
        className="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-xl z-40 p-6 max-h-[90vh] overflow-y-auto"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Payment Method</h2>
          <button onClick={onClose} className="text-gray-500">
            ✕
          </button>
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <button className="border-2 border-yellow-500 bg-yellow-50 text-yellow-600 p-4 rounded-lg font-medium">
              Cash
            </button>
            <button className="border border-gray-300 bg-gray-50 text-gray-600 p-4 rounded-lg font-medium hover:border-gray-400">
              Online
            </button>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-bold mb-2">Order Summary</h3>
            {/* Add your order summary items here */}
          </div>

          <button className="w-full bg-yellow-500 text-gray-900 font-bold py-3 rounded-lg hover:bg-yellow-600 transition-colors">
            Confirm Payment
          </button>
        </div>
      </motion.div>
    </>
  );
};

export default PaymentSlideUp;