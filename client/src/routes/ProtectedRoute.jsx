import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ children }) => {
  const { isAuth } = useSelector((state) => state.user);
  return isAuth ? children : <Navigate to="/auth" />;
};