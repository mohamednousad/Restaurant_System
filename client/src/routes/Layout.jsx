import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import useLoadData from "../hooks/useLoadData";
import FullScreenLoader from "../components/shared/FullScreenLoader";
import Header from "../components/shared/Header";

export const Layout = ({ children }) => {
  const isLoading = useLoadData();
  const location = useLocation();
  const hideHeaderRoutes = ["/auth"];

  if (isLoading) return <FullScreenLoader />;

  return (
    <>
      {!hideHeaderRoutes.includes(location.pathname) && <Header />}
      {children}
    </>
  );
};