import { useLocation } from "react-router-dom";
import useLoadData from "../hooks/useLoadData";
import FullScreenLoader from "../components/shared-components/FullScreenLoader";
import Header from "../components/shared-components/Header";
import BottomNav from "../components/shared-components/BottomNav";
import CustomerHeader from "../components/app-components/customerOrder/CustomerHeader";

export const Layout = ({ children }) => {
  const isLoading = useLoadData();
  const location = useLocation();

  if (isLoading) return <FullScreenLoader />;

  const isCustomerRoute = location.pathname.startsWith("/customer");

  return (
    <>
      {isCustomerRoute ? <CustomerHeader /> : <Header />}
      {children}
      {isCustomerRoute ? null : <BottomNav />}
    </>
  );
};
