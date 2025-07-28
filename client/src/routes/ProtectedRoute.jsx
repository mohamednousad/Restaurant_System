import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

export const ProtectedRoute = ({ children }) => {
  const { isAuth } = useSelector((state) => state.user);
  const location = useLocation();

  if (!isAuth) return <Navigate to="/auth" state={{ from: location }} replace />;
  
  return children;
};

export const CustomerRoute = ({ children }) => {
  return children;
};