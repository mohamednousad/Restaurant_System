import { axiosWrapper } from "./axiosWrapper";

// API Endpoints
// Auth
export const login = (data) => axiosWrapper.post("/api/user/login", data);
export const register = (data) => axiosWrapper.post("/api/user/register", data);
export const getUserData = () => axiosWrapper.get("/api/user");
export const logout = () => axiosWrapper.post("/api/user/logout");

// Table
export const addTable = (data) => axiosWrapper.post("/api/table/", data);
export const addCategories = (data) => axiosWrapper.post("/api/categories/", data);
export const addDishes = (data) => axiosWrapper.post("/api/dishes/", data);

export const getTables = () => axiosWrapper.get("/api/table");
export const updateTable = ({ tableId, ...tableData }) =>
  axiosWrapper.put(`/api/table/${tableId}`, tableData);

export const getCategories = () => axiosWrapper.get("/api/categories");
export const updateCategories = ({ tableId, ...tableData }) =>
  axiosWrapper.put(`/api/categories/${tableId}`, tableData);


export const getDishes = () => axiosWrapper.get("/api/table");
export const updateDishes = ({ tableId, ...tableData }) =>
  axiosWrapper.put(`/api/dishes/${tableId}`, tableData);

// Payment
export const createOrderRazorpay = (data) =>
  axiosWrapper.post("/api/payment/create-order", data);
export const verifyPaymentRazorpay = (data) =>
  axiosWrapper.post("/api/payment//verify-payment", data);

// Order
export const addOrder = (data) => axiosWrapper.post("/api/order/", data);
export const getOrders = () => axiosWrapper.get("/api/order");
export const updateOrderStatus = ({ orderId, orderStatus }) =>
  axiosWrapper.put(`/api/order/${orderId}`, { orderStatus });
