import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthContext, AuthProvider } from "./contexts/AuthContext";
import Layout from "./components/layout/Layout";

// Pages
import HomePage from "./pages/HomePage";
import ProductsPage from "./pages/ProductsPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import LoginPage from "@/pages/auth/LoginPage";
import RegisterPage from "@/pages/auth/RegisterPage";
import ForgotPasswordPage from "@/pages/auth/ForgotPasswordPage";
// import AdminDashboardPage from "./pages/admin/AdminDashboardPage";
// import ProductManagementPage from "./pages/admin/ProductManagementPage";
// import UserManagementPage from "./pages/admin/UserManagementPage";
import NotFoundPage from "./pages/NotFoundPage";
import ProductForm from "./pages/ProductForm";
import { useContext } from "react";

// // Auth guards
// import PrivateRoute from "./components/auth/PrivateRoute";
// import AdminRoute from "./components/auth/AdminRoute";

// Create a client
const queryClient = new QueryClient();

function AppRoutes() {
  const { user } = useContext(AuthContext);
  console.log(user);

  return (
    <Routes>
      {/* Public routes */}
      <Route
        path="/"
        element={user ? <ProductsPage /> : <Navigate to="/login" replace />}
      />
      <Route path="/products" element={<ProductsPage />} />
      <Route path="/products/create" element={<ProductForm />} />
      <Route path="/products/edit/:productId" element={<ProductForm />} />
      <Route path="/products/:id" element={<ProductDetailPage />} />

      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />

      {/* Protected routes */}
      {/* <Route
        path="/admin"
        element={
          <AdminRoute>
            <AdminDashboardPage />
          </AdminRoute>
        }
      />

      <Route
        path="/admin/products"
        element={
          <AdminRoute>
            <ProductManagementPage />
          </AdminRoute>
        }
      />

      <Route
        path="/admin/users"
        element={
          <AdminRoute>
            <UserManagementPage />
          </AdminRoute>
        }
      /> */}

      {/* Not found */}
      <Route path="/404" element={<NotFoundPage />} />
      <Route path="*" element={<Navigate to="/404" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router>
          <Layout>
            <AppRoutes />
          </Layout>
        </Router>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
