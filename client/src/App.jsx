import { BrowserRouter, Routes, Route } from "react-router-dom";
import RequireAuth from "./components/common/RequireAuth";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import OverviewPage from "./pages/OverviewPage";
import ProductsPage from "./pages/ProductsPage";
import UsersPage from "./pages/UsersPage";
import SalesPage from "./pages/SalesPage";
import OrdersPage from "./pages/OrdersPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import SettingsPage from "./pages/SettingsPage";
import CategoryPage from "./pages/CategoryPage";
import { AuthProvider } from "./components/context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <div className="flex h-screen bg-gray-900 text-gray-100 overflow-hidden">
        {/* BG */}
        <div className="fixed inset-0 z-0">
          <div className="absolute inset-0 custom-bg-lightbrown" />
          <div className="absolute inset-0 backdrop-blur-sm" />
        </div>

        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route
              path="/home"
              element={
                <RequireAuth>
                  <HomePage />
                </RequireAuth>
              }
            >
              <Route index element={<OverviewPage />} />
              <Route path="overview" element={<OverviewPage />} />
              <Route path="products" element={<ProductsPage />} />
              <Route path="category" element={<CategoryPage />} />
              <Route path="users" element={<UsersPage />} />
              <Route path="sales" element={<SalesPage />} />
              <Route path="orders" element={<OrdersPage />} />
              <Route path="analytics" element={<AnalyticsPage />} />
              <Route path="settings" element={<SettingsPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    </AuthProvider>
  );
}

export default App;
