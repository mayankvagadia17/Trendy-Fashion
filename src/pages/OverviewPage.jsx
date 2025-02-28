import { BarChart2, ShoppingBag, Users, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

import Header from "../components/common/Header";
import StatCard from "../components/common/StatCard";
import SalesOverviewChart from "../components/overview/SalesOverviewChart";
import CategoryDistributionChart from "../components/overview/CategoryDistributionChart";
import SalesChannelChart from "../components/overview/SalesChannelChart";
import Sidebar from "../components/common/Sidebar";

const OverviewPage = () => {
  const [produc_res, setData] = useState(null);
  const [product_loading, setLoading] = useState(true);

  useEffect(() => {
    const token = `Bearer ${localStorage.getItem("token")}`;
    console.log(token);
    fetch(
      `http://localhost:5000/api/product/getAllProduct?category=All&filter=All`,
      {
        method: "GET",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result[`data`]);
        setData(result);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-4">
      {product_loading ? (
        <div className="flex items-center justify-center h-screen">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-500"></div>
        </div>
      ) : (
        <div className="flex-1 overflow-auto relative z-10">
          <Header title="Overview" />

          <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
            {/* STATS */}
            <motion.div
              className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              <StatCard
                name="Total Sales"
                icon={Zap}
                value="$12,345"
                color="#6366F1"
              />
              <StatCard
                name="New Users"
                icon={Users}
                value="1,234"
                color="#8B5CF6"
              />
              <StatCard
                name="Total Products"
                icon={ShoppingBag}
                value={produc_res[`data`].length}
                color="#EC4899"
              />
              <StatCard
                name="Conversion Rate"
                icon={BarChart2}
                value="12.5%"
                color="#10B981"
              />
            </motion.div>

            {/* CHARTS */}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* <SalesOverviewChart /> */}
              {/* <CategoryDistributionChart /> */}
              {/* <SalesChannelChart /> */}
            </div>
          </main>
        </div>
      )}
    </div>
  );
};
export default OverviewPage;
