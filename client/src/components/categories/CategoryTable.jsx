import { motion } from "framer-motion";
import { Edit, Search, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";

const CategoryTable = ({ categories, onEdit, onDelete }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCategory, setFilteredCategory] = useState(categories);

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = categories.filter((category) =>
      category.name.toLowerCase().includes(term)
    );

    setFilteredCategory(filtered);
  };

  useEffect(() => {
    setFilteredCategory(categories);
  }, [categories]);

  return (
    <motion.div
      className="custom-bg-sidebar bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700 mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-100">Category List</h2>
        <div className="relative">
          <input
            type="text"
            placeholder="Search Categories..."
            className="bg-white text-black placeholder-gray-600 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#704f38]"
            onChange={handleSearch}
            value={searchTerm}
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-[#ece3db]">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                isPremium
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-[#ece3db]">
            {filteredCategory?.map((category) => (
              <motion.tr
                key={category?.categoryId}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-100 flex gap-2 items-center">
                  <div className="w-10 h-10 bg-white flex items-center justify-center rounded-full">
                    <img
                      src={category?.categoryIcon}
                      alt={category?.categoryName}
                      className="size-7 rounded-full object-cover"
                    />
                  </div>
                  {category?.categoryName}
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                  {category?.isPremium.toString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                  <button className="text-indigo-200 hover:text-indigo-300 mr-2">
                    <Edit
                      size={18}
                      onClick={() => onEdit(category?.categoryId)}
                    />
                  </button>
                  <button className="text-red-500 hover:text-red-300">
                    <Trash2
                      size={18}
                      onClick={() => onDelete(category?.categoryId)}
                    />
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};
export default CategoryTable;
