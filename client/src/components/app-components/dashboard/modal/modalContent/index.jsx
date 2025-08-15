import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import PropTypes from "prop-types";
import { addTable, addDishes, addCategories } from "../../../../../services";
import { enqueueSnackbar } from "notistack";

const ModalContent = ({
  setIsTableModalOpen,
  setIsCategoryModalOpen,
  setIsDishesModalOpen,
}) => {
  const isTable = Boolean(setIsTableModalOpen);
  const isCategory = Boolean(setIsCategoryModalOpen);
  const isDishes = Boolean(setIsDishesModalOpen);

  const [formData, setFormData] = useState({
    tableNo: "",
    seats: "",
    name: "",
    price: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const closeModal = () => {
    if (isTable) setIsTableModalOpen(false);
    if (isCategory) setIsCategoryModalOpen(false);
    if (isDishes) setIsDishesModalOpen(false);
  };

  const mutationFn = isTable
    ? addTable
    : isCategory
    ? addCategories
    : addDishes;

  const mutation = useMutation({
    mutationFn,
    onSuccess: (res) => {
      closeModal();
      enqueueSnackbar(res.data.message, { variant: "success" });
    },
    onError: (error) => {
      enqueueSnackbar(error?.response?.data?.message || "Error", {
        variant: "error",
      });
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const dataToSend = isTable
      ? { tableNo: formData.tableNo, seats: formData.seats }
      : isCategory
      ? { name: formData.name }
      : { name: formData.name, price: formData.price };

    mutation.mutate(dataToSend);

    setTimeout(() => window.location.reload(), 1000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {isTable && (
        <>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Table Number
            </label>
            <input
              type="number"
              name="tableNo"
              value={formData.tableNo}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-lg"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Number of Seats
            </label>
            <input
              type="number"
              name="seats"
              value={formData.seats}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-lg"
              required
            />
          </div>
        </>
      )}

      {(isCategory || isDishes) && (
        <>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-lg"
              required
            />
          </div>
          {isDishes && (
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Price
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg"
                required
              />
            </div>
          )}
        </>
      )}

      <button
        type="submit"
        className="w-full mt-6 py-3 rounded-lg bg-yellow-500 hover:bg-yellow-600 text-white font-semibold transition-colors"
      >
        {isTable ? "Add Table" : isCategory ? "Add Category" : "Add Dish"}
      </button>
    </form>
  );
};

ModalContent.propTypes = {
  setIsTableModalOpen: PropTypes.func,
  setIsCategoryModalOpen: PropTypes.func,
  setIsDishesModalOpen: PropTypes.func,
};

export default ModalContent;
