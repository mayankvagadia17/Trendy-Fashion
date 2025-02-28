import { UserCheck, UserPlus, UsersIcon, UserX } from "lucide-react";
import { motion } from "framer-motion";

import { useState, useEffect } from "react";

import Header from "../components/common/Header";
import StatCard from "../components/common/StatCard";
import UsersTable from "../components/users/UsersTable";
import UserGrowthChart from "../components/users/UserGrowthChart";
import UserActivityHeatmap from "../components/users/UserActivityHeatmap";
import UserDemographicsChart from "../components/users/UserDemographicsChart";

const userStats = {
  churnRate: "2.4%",
};

const UsersPage = () => {
  const [res, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = `Bearer ${localStorage.getItem("token")}`;
    console.log(token);
    fetch(`http://localhost:5000/user/getAllUsers`, {
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
          <Header title="Users" />

          <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
            {/* STATS */}
            <motion.div
              className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              <StatCard
                name="Total Users"
                icon={UsersIcon}
                value={res[`data`].length}
                color="#6366F1"
              />
              <StatCard
                name="New Users Today"
                icon={UserPlus}
                value={res[`data`].length}
                color="#10B981"
              />
              <StatCard
                name="Active Users"
                icon={UserCheck}
                value={res[`data`].length}
                color="#F59E0B"
              />
              {/* <StatCard
                name="Churn Rate"
                icon={UserX}
                value={userStats.churnRate}
                color="#EF4444"
              /> */}
            </motion.div>

            <UsersTable users={res['data']} />

            {/* USER CHARTS */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
              {/* <UserGrowthChart />
					<UserActivityHeatmap />
					<UserDemographicsChart /> */}
            </div>
          </main>
        </div>
      )}
    </div>
  );
};
export default UsersPage;
