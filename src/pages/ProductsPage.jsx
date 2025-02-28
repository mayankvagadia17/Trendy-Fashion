import { motion } from "framer-motion";

import { useState, useEffect } from "react";

import Header from "../components/common/Header";
import StatCard from "../components/common/StatCard";

import { Check, Package, X } from "lucide-react";
import CategoryDistributionChart from "../components/overview/CategoryDistributionChart";
import SalesTrendChart from "../components/products/SalesTrendChart";
import ProductsTable from "../components/products/ProductsTable";

const ProductsPage = () => {
  const [res, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const [category, setCategory] = useState(null);
  const [loading_category, setLoadingCategory] = useState(true);
  const [selected_category, setSelectedCategory] = useState("");

  const [Gender, setGender] = useState(["Man", "Woman", "Both"]);
  const [selected_gender, setSelectedGender] = useState("");

  const [isOpen, setIsOpen] = useState(false);

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

    fetch(`http://localhost:5000/api/category/getAllCategory`, {
      method: "GET",
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result[`data`]);
        setCategory(result);
        setLoadingCategory(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoadingCategory(false);
      });
  }, []);

  return (
    <div className="p-4">
      {loading && loading_category ? (
        <div className="flex items-center justify-center h-screen">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-500"></div>
        </div>
      ) : (
        <div className="flex-1 overflow-auto relative z-10">
          <Header title="Products" />

          <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
            {/* STATS */}
            <motion.div
              className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              <StatCard
                name="Total Products"
                icon={Package}
                value={res[`data`].length}
                color="#ece3db"
              />
              {/* <StatCard
                name="Top Selling"
                icon={TrendingUp}
                value={89}
                color="#10B981"
              />
              <StatCard
                name="Low Stock"
                icon={AlertTriangle}
                value={23}
                color="#F59E0B"
              />
              <StatCard
                name="Total Revenue"
                icon={DollarSign}
                value={"$543,210"}
                color="#EF4444"
              /> */}
            </motion.div>

            <ProductsTable products={res[`data`]} />

            <div className="grid grid-col-1 lg:grid-cols-2 gap-8">
              <button
                onClick={() => {
                  setIsOpen(true);
                  setSelectedCategory("");
                }}
              >
                <motion.div
                  className="custom-bg-sidebar bg-opacity-50 backdrop-blur-md overflow-hidden shadow-lg rounded-xl border custom-bg-sidebar"
                  whileHover={{
                    y: -5,
                  }}
                >
                  <div className="px-4 py-5 sm:p-6">
                    <span className="flex items-center text-sm font-medium text-white">
                      <Package size={20} className="mr-2" color="#ece3db" />
                      Add Product
                    </span>
                  </div>
                </motion.div>
              </button>
              {/* <SalesTrendChart /> */}
              {/* <CategoryDistributionChart /> */}
            </div>
          </main>

          {/* Add Product Dialog */}
          {isOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 overflow-y-auto">
              <div className="custom-bg-lightbrown p-6 rounded-lg shadow-lg w-auto">
                <h2 className="text-black text-xl font-semibold mb-4 flex items-center justify-center">
                  Add Product
                </h2>
                <form className="flex flex-col w-full space-y-4 text-black-800">
                  <input
                    className="border-b-2 border-gray-400 focus:border-gray-500 outline-none w-full p-2 text-black"
                    type="text"
                    placeholder="Product Name"
                    name=""
                  />
                  <input
                    className="border-b-2 border-gray-400 focus:border-gray-500 outline-none w-full p-2 text-black"
                    type="Text"
                    placeholder="Product Description"
                    name=""
                  />
                  <select
                    className="border-b-2 border-gray-400 focus:border-blue-500 outline-none text-black w-full p-2"
                    value={selected_category}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                  >
                    <option value="">Select a Category</option>
                    {category[`data`].map((category) => (
                      <option
                        key={category.categoryId}
                        value={category.categoryId}
                      >
                        {category.categoryName}
                      </option>
                    ))}
                  </select>
                  <input
                    className="border-b-2 border-gray-400 focus:border-gray-500 outline-none w-full p-2 text-black"
                    type="number"
                    placeholder="Price"
                    name=""
                  />
                  <input
                    className="border-b-2 border-gray-400 focus:border-gray-500 outline-none w-full p-2 text-black"
                    type="number"
                    placeholder="Discount"
                    name=""
                  />
                  <input
                    className="border-b-2 border-gray-400 focus:border-gray-500 outline-none w-full p-2 text-black"
                    type="number"
                    placeholder="Final Price"
                    name=""
                  />
                  <select
                    className="border-b-2 border-gray-400 focus:border-blue-500 outline-none text-black w-full p-2"
                    value={selected_gender}
                    onChange={(e) => setSelectedGender(e.target.value)}
                  >
                    <option value="">Select a Gender</option>
                    {Gender.map((item, index) => (
                      <option key={index} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                  <h5 className="text-black font-semibold mt-4 flex justify-start">
                    Sizes
                  </h5>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      placeholder="S"
                      className="border p-2 rounded"
                    />
                    <input
                      type="text"
                      placeholder="M"
                      className="border p-2 rounded"
                    />
                    <input
                      type="text"
                      placeholder="L"
                      className="border p-2 rounded"
                    />
                    <input
                      type="text"
                      placeholder="XL"
                      className="border p-2 rounded"
                    />
                    <input
                      type="text"
                      placeholder="XXL"
                      className="border p-2 rounded"
                    />
                  </div>
                </form>
                <div className="mt-4 flex justify-end gap-1">
                  <button onClick={() => setIsOpen(false)}>
                    <motion.div
                      className="bg-red-600 bg-opacity-100 backdrop-blur-md overflow-hidden shadow-lg rounded-xl border border-red-600"
                      whileHover={{
                        y: -1,
                      }}
                    >
                      <div className="px-4 py-5 sm:p-3">
                        <span className="flex items-center text-sm font-medium text-white-800">
                          <X size={20} className="mr-2" color="#FFF" />
                          Close
                        </span>
                      </div>
                    </motion.div>
                  </button>
                  <button onClick={() => setIsOpen(false)}>
                    <motion.div
                      className="custom-bg-sidebar bg-opacity-100 backdrop-blur-md overflow-hidden shadow-lg rounded-xl border custom-bg-sidebar"
                      whileHover={{
                        y: -1,
                        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
                      }}
                    >
                      <div className="px-4 py-5 sm:p-3">
                        <span className="flex items-center text-sm font-medium text-white-00">
                          <Check size={20} className="mr-2" color="#FFF" />
                          Add Product
                        </span>
                      </div>
                    </motion.div>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
export default ProductsPage;
