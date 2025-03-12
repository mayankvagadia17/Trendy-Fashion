import {
  BarChart2,
  DollarSign,
  Menu,
  Settings,
  ShoppingBag,
  ShoppingCart,
  Grid2X2,
  Users,
} from "lucide-react";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";

const SIDEBAR_ITEMS = [
  {
    name: "Overview",
    icon: BarChart2,
    color: "#ece3db",
    href: "/Home/overview",
  },
  {
    name: "Products",
    icon: ShoppingBag,
    color: "#ece3db",
    href: "/Home/products",
  },
  {
    name: "Category",
    icon: Grid2X2,
    color: "#ece3db",
    href: "/Home/products",
  },
  { name: "Users", icon: Users, color: "#ece3db", href: "/Home/users" },
  { name: "Sales", icon: DollarSign, color: "#ece3db", href: "/Home/sales" },
  {
    name: "Orders",
    icon: ShoppingCart,
    color: "#ece3db",
    href: "/Home/orders",
  },
  // { name: "Analytics", icon: TrendingUp, color: "#ece3db", href: "/Home/analytics" },
  {
    name: "Settings",
    icon: Settings,
    color: "#ece3db",
    href: "/Home/settings",
  },
];

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <motion.div
      className={`relative z-10 transition-all duration-300 ease-in-out flex-shrink-0 ${
        isSidebarOpen ? "w-64" : "w-20"
      }`}
      animate={{ width: isSidebarOpen ? 256 : 80 }}
    >
      <div className="h-full custom-bg-sidebar backdrop-blur-md p-4 flex flex-col border-r border-gray-700">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 rounded-full hover:bg-[#8a6348] transition-colors max-w-fit"
        >
          <Menu size={24} />
        </motion.button>

        <nav className="mt-8 flex-grow">
          {SIDEBAR_ITEMS.map((item) => (
            <Link key={item.href} to={item.href}>
              <motion.div className="flex items-center p-4 text-sm font-medium rounded-lg hover:bg-[#8a6348] transition-colors mb-2">
                <item.icon
                  size={20}
                  style={{ color: item.color, minWidth: "20px" }}
                />
                <AnimatePresence>
                  {isSidebarOpen && (
                    <motion.span
                      className="ml-4 whitespace-nowrap"
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: "auto" }}
                      exit={{ opacity: 0, width: 0 }}
                      transition={{ duration: 0.2, delay: 0.3 }}
                    >
                      {item.name}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.div>
            </Link>
          ))}
        </nav>
      </div>
    </motion.div>
  );
};
export default Sidebar;
