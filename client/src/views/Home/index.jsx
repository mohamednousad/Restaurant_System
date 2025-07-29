import { useEffect } from "react";
import Greetings from "../../components/app-components/home/greetings";
import { BsCashCoin } from "react-icons/bs";
import { GrInProgress } from "react-icons/gr";
import MiniCard from "../../components/app-components/home/miniCard";
import RecentOrders from "../../components/app-components/home/recentOrders";
import PopularDishes from "../../components/app-components/home/popularDishes";

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
  </section>
);

};

export default Home;
