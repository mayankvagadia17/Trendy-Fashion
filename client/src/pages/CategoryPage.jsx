import { motion } from "framer-motion";
// import Swal from "sweetalert2";
import { useState, useEffect } from "react";

import Header from "../components/common/Header";
import StatCard from "../components/common/StatCard";

import { Grid2X2 } from "lucide-react";

import CategoryTable from "../components/categories/CategoryTable";

import { BASE_URL } from "../config"

const CategoryPage = () => {
  const [res, setCategory] = useState([]);
  const [loading_category, setLoadingCategory] = useState(true);

  useEffect(() => {
    const token = `Bearer ${localStorage.getItem("token")}`;

    fetch(`${BASE_URL}/api/category/getAllCategory`, {
      method: "GET",
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result[`data`]);
        setCategory(result[`data`]);
        setLoadingCategory(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoadingCategory(false);
      });
  }, []);

  return (
    <div className="p-4">
      {loading_category ? (
        <div className="flex items-center justify-center h-screen">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-500"></div>
        </div>
      ) : (
        <div className="category-page">
          <Header title="Category" />
          <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
            {/* STATS */}
            <motion.div
              className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              <StatCard
                name="Total Categories"
                icon={Grid2X2}
                value={res.length}
                color="#ece3db"
              />
            </motion.div>

            <CategoryTable  
              categories={res}
              onEdit={(categoryId) => {
                console.log("Edit category with ID:", categoryId);
              }}
              onDelete={(categoryId) => {
                console.log("Delete category with ID:", categoryId);
              }}/>
          </main>
        </div>
      )}
    </div>
  );
};
export default CategoryPage;
