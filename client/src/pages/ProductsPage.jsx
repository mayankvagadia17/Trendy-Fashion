import { motion } from "framer-motion";
import Swal from "sweetalert2";
import { useState, useEffect } from "react";

import Header from "../components/common/Header";
import StatCard from "../components/common/StatCard";

import { Check, Package, X } from "lucide-react";
import ProductsTable from "../components/products/ProductsTable";
import axios from "axios";

const ProductsPage = () => {
  const [res, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const [category, setCategory] = useState(null);
  const [loading_category, setLoadingCategory] = useState(true);

  const Gender = ["Man", "Woman", "Both"];

  const [isOpen, setIsOpen] = useState(false);

  const [progress, setProgress] = useState(0);

  // Add Product State Management
  const [ProductName, setProductName] = useState("");
  const [ProductDescription, setProductDescription] = useState("");
  const [selected_category, setSelectedCategory] = useState("");
  const [ProductPrice, setProductPrice] = useState("");
  const [ProductDiscount, setProductDiscount] = useState("");
  const [ProductFinalPrice, setProductFinalPrice] = useState("");
  const [selected_gender, setSelectedGender] = useState("");
  const [ProductSizesS, setProductSizesS] = useState(0);
  const [ProductSizesM, setProductSizesM] = useState(0);
  const [ProductSizesL, setProductSizesL] = useState(0);
  const [ProductSizesXL, setProductSizesXL] = useState(0);
  const [ProductSizesXXL, setProductSizesXXL] = useState(0);
  const [uploadedURLs, setUploadedURLs] = useState([]);

  // Image Upload State Management
  const [files, setFiles] = useState([]);
  const [validFiles, setValidFiles] = useState([]);
  const [uploading, setUploading] = useState(false);

  const [errors, setErrors] = useState([]);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const maxSize = 10 * 1024 * 1024; // 10MB in bytes

    let validImages = [];
    let validImagesFiles = [];
    let errorMessages = [];

    files.forEach((file) => {
      if (file.size > maxSize) {
        errorMessages.push(`${file.name} exceeds 10MB`);
      } else {
        validImagesFiles.push(file);
        validImages.push({
          name: file.name,
          url: URL.createObjectURL(file),
        });
      }
    });

    setFiles(validImagesFiles);
    setValidFiles(validImages);
    setErrors(errorMessages);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (files.length === 0) {
      alert("Please select an image first!");
      return;
    }

    setUploading(true);

    const newURLs = [];

    for (let file of files) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "admin_uploads");
      formData.append("folder", "Admin Uploads");

      try {
        const response = await axios.post(
          `https://api.cloudinary.com/v1_1/djggag9gb/image/upload`,
          formData,
          {
            onUploadProgress: (progressEvent) => {
              const percentCompleted = Math.round(
                (progressEvent.loaded * 100) / progressEvent.total
              );
              setProgress(percentCompleted);
            },
          }
        );
        newURLs.push(response.data.secure_url);
      } catch (error) {
        console.error("Upload error:", error);
        alert("Upload failed!");
      }
    }
    setUploadedURLs((prevURLs) => [...prevURLs, ...newURLs]);
    setUploading(false);
  };

  async function addProduct() {
    try {
      const imageString = JSON.stringify(uploadedURLs);
      const encodedImages = encodeURIComponent(imageString);
      const token = `Bearer ${localStorage.getItem("token")}`;
      const res = await fetch(
        `http://localhost:5000/api/product/addProduct?name=${ProductName}&description=${ProductDescription}&category=${selected_category}&price=${ProductPrice}&final_price=${ProductFinalPrice}&gender=${selected_gender}&s=${ProductSizesS}&m=${ProductSizesM}&l=${ProductSizesL}&xl=${ProductSizesXL}&xxl=${ProductSizesXXL}&discount=${ProductDiscount}&images=${encodedImages}`,
        {
          method: "POST",
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
        }
      );
      const data = await res.json();
      if (data.status === 1) {
        setIsOpen(false);
        Swal.fire({
          title: "Product Added",
          text: "Product Added Successfully",
          icon: "success",
          showCancelButton: false,
          confirmButtonText: "Okay",
        }).then((result) => {
          if (result.isConfirmed) {
            setLoading(true);
            fetchProducts();
          }
        });
      } else {
        console.log(data);
      }
    } catch (err) {
      console.log(err);
    }
  }
  async function handleDeleteProduct(productId) {
    try {
      const token = `Bearer ${localStorage.getItem("token")}`;
      const res = await fetch(
        `http://localhost:5000/api/product/deleteProduct?productId=${productId}`,
        {
          method: "POST",
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
        }
      );
      const data = await res.json();
      if (data.status === 1) {
        setIsOpen(false);
        Swal.fire({
          title: "Product Deleted",
          text: "Product Deleted Successfully",
          icon: "success",
          showCancelButton: false,
          confirmButtonText: "Okay",
        }).then((result) => {
          if (result.isConfirmed) {
            setLoading(true);
            fetchProducts();
          }
        });
      } else {
        console.log(data);
      }
    } catch (err) {
      console.log(err);
    }
  }

  const fetchProducts = async () => {
    try {
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
          console.log("data" + result);
          setData([...result?.data]);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          setLoading(false);
        });
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();

    const token = `Bearer ${localStorage.getItem("token")}`;

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
                value={res.length}
                color="#ece3db"
              />
            </motion.div>

            <ProductsTable
              products={res || []}
              onDelete={handleDeleteProduct}
            />

            <div className="grid grid-col-1 lg:grid-cols-2 gap-8">
              <button
                onClick={() => {
                  setFiles([]);
                  setValidFiles([]);
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
              <div className="custom-bg-lightbrown p-6 rounded-lg shadow-lg w-full max-w-4xl">
                <h2 className="text-black text-xl font-semibold mb-4 flex items-center justify-center">
                  Add Product
                </h2>
                <form className="flex flex-col w-full space-y-4 text-black-800">
                  <input
                    className="border-b-2 border-gray-400 focus:border-gray-500 outline-none w-full p-2 text-black"
                    type="text"
                    placeholder="Product Name"
                    onChange={(e) => setProductName(e.target.value)}
                    name=""
                  />
                  <input
                    className="border-b-2 border-gray-400 focus:border-gray-500 outline-none w-full p-2 text-black"
                    type="Text"
                    placeholder="Product Description"
                    onChange={(e) => setProductDescription(e.target.value)}
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
                        value={category.categoryName}
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
                    onChange={(e) => setProductPrice(e.target.value)}
                  />
                  <input
                    className="border-b-2 border-gray-400 focus:border-gray-500 outline-none w-full p-2 text-black"
                    type="number"
                    placeholder="Discount"
                    name=""
                    onChange={(e) => setProductDiscount(e.target.value)}
                  />
                  <input
                    className="border-b-2 border-gray-400 focus:border-gray-500 outline-none w-full p-2 text-black"
                    type="number"
                    placeholder="Final Price"
                    name=""
                    onChange={(e) => setProductFinalPrice(e.target.value)}
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
                      className="border p-2 rounded text-black"
                      onChange={(e) => setProductSizesS(e.target.value)}
                    />
                    <input
                      type="text"
                      placeholder="M"
                      className="border p-2 rounded text-black"
                      onChange={(e) => setProductSizesM(e.target.value)}
                    />
                    <input
                      type="text"
                      placeholder="L"
                      className="border p-2 rounded text-black"
                      onChange={(e) => setProductSizesL(e.target.value)}
                    />
                    <input
                      type="text"
                      placeholder="XL"
                      className="border p-2 rounded text-black"
                      onChange={(e) => setProductSizesXL(e.target.value)}
                    />
                    <input
                      type="text"
                      placeholder="XXL"
                      className="border p-2 rounded text-black"
                      onChange={(e) => setProductSizesXXL(e.target.value)}
                    />
                  </div>
                  <h5 className="text-black font-semibold mt-4 flex justify-start">
                    Upload Product Images
                  </h5>
                  <div className="flex items-start justify-between">
                    <div>
                      <input
                        className="text-black"
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleFileChange}
                      />

                      {/* Display Errors */}
                      {errors.length > 0 && (
                        <div style={{ color: "red" }}>
                          {errors.map((error, index) => (
                            <p key={index}>{error}</p>
                          ))}
                        </div>
                      )}

                      {/* Display Image Previews */}
                      <div
                        style={{
                          display: "flex",
                          gap: "10px",
                          marginTop: "10px",
                        }}
                      >
                        {validFiles.map((image, index) => (
                          <div key={index}>
                            <img src={image.url} alt={image.name} width="100" />
                          </div>
                        ))}
                      </div>
                    </div>
                    {files.length > 0 && (
                      <p className="text-black px-5">
                        Upload Progress: {progress}%
                      </p>
                    )}
                    <button
                      onClick={handleUpload}
                      disabled={uploading}
                      className="bg-gray-600 px-5 py-2 rounded-xl"
                    >
                      {uploading ? "Uploading..." : "Upload"}
                    </button>
                  </div>
                </form>
                <div className="mt-4 flex justify-end gap-1">
                  <button
                    onClick={() => {
                      setFiles([]);
                      setValidFiles([]);
                      setProgress(0);
                      setIsOpen(false);
                    }}
                  >
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
                  <button
                    onClick={() => {
                      if (uploadedURLs.length === 0) {
                        setIsOpen(true);
                        alert("Please select an image first!");
                      } else {
                        addProduct();
                      }
                    }}
                  >
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
