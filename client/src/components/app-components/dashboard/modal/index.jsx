import { motion } from "framer-motion";
import PropTypes from "prop-types";
import { IoMdClose } from "react-icons/io";
import ModalContent from "./modalContent";

const Modal = ({
  setIsTableModalOpen,
  setIsCategoryModalOpen,
  setIsDishesModalOpen,
}) => {
  const handleClose = () => {
    if (setIsTableModalOpen) setIsTableModalOpen(false);
    if (setIsCategoryModalOpen) setIsCategoryModalOpen(false);
    if (setIsDishesModalOpen) setIsDishesModalOpen(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.2 }}
        className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-gray-800 text-xl font-semibold">
            {setIsTableModalOpen
              ? "Add Table"
              : setIsCategoryModalOpen
              ? "Add Category"
              : "Add Dish"}
          </h2>
          <button
            onClick={handleClose}
            className="text-gray-500 hover:text-red-500 transition-colors"
          >
            <IoMdClose size={24} />
          </button>
        </div>

        <ModalContent
          setIsTableModalOpen={setIsTableModalOpen}
          setIsCategoryModalOpen={setIsCategoryModalOpen}
          setIsDishesModalOpen={setIsDishesModalOpen}
        />
      </motion.div>
    </div>
  );
};

Modal.propTypes = {
  setIsTableModalOpen: PropTypes.func,
  setIsCategoryModalOpen: PropTypes.func,
  setIsDishesModalOpen: PropTypes.func,
};

export default Modal;
