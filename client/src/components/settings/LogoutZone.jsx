import { motion } from "framer-motion";
import { LogOut } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const LogoutZone = () => {
  const { logout } = useAuth();

  async function handlelogout() {
    logout();
  }

  return (
    <motion.div
      className="bg-opacity-50 backdrop-filter backdrop-blur-lg shadow-lg rounded-xl p-6 border border-gray-700 mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="flex items-center mb-4">
        <LogOut className="text-red-400 mr-3" size={24} />
        <h2 className="text-xl font-semibold text-black">Logout</h2>
      </div>
      <p className="text-black mb-4">Are you sure you want to logout?</p>
      <button
        className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded 
      transition duration-200"
        onClick={handlelogout}
      >
        Logout
      </button>
    </motion.div>
  );
};
export default LogoutZone;
