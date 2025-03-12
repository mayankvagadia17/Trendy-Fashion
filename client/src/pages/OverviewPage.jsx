import { BarChart2, ShoppingBag, Users, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

import Header from "../components/common/Header";
import StatCard from "../components/common/StatCard";
import { BASE_URL } from "../config";

const OverviewPage = () => {
  const [produc_res, setData] = useState([]);
  const [user_res, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = `Bearer ${localStorage.getItem("token")}`;
    console.log(token);
    fetch(`${BASE_URL}/api/product/getAllProduct?category=All&filter=All`, {
      method: "GET",
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result[`data`]);
        setData(result);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });

    fetch(`${BASE_URL}/user/getAllUsers`, {
      method: "GET",
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result[`data`]);
        setUserData(result);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-4">
      {loading ? (
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
                name="Total Users"
                icon={Users}
                value={user_res[`data`].length}
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
          </main>
        </div>
      )}
    </div>
  );
};
export default OverviewPage;
