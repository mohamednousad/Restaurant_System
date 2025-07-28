import React, { useEffect } from "react";
import BottomNav from "../components/shared/BottomNav";
import Greetings from "../components/home/Greetings";
import { BsCashCoin } from "react-icons/bs";
import { GrInProgress } from "react-icons/gr";
import MiniCard from "../components/home/MiniCard";
import RecentOrders from "../components/home/RecentOrders";
import PopularDishes from "../components/home/PopularDishes";

const Home = () => {

    useEffect(() => {
      document.title = "POS | Home"
    }, [])

return (
  <section className="bg-[#f5f5f5] min-h-[calc(100vh-5rem)] overflow-hidden flex flex-col lg:flex-row gap-4 px-8 py-6">
    <div className="flex-[3] overflow-auto">
      <Greetings />
          <div className="flex-[4]">
        <div className="flex items-center w-full gap-3 py-5 mt-1">
          <MiniCard title="Total Earnings" icon={<BsCashCoin />} number={512} footerNum={1.6} />
          <MiniCard title="In Progress" icon={<GrInProgress />} number={16} footerNum={3.6} />
        </div>
        <RecentOrders />
      </div>
    </div>
    <div className="flex-[1] overflow-auto">
      <PopularDishes />
    </div>
    <BottomNav />
  </section>
);

};

export default Home;
