import { useRoutes, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import LoginPage from "../pages/login";
import ProductDashboard from "../pages/product/ProductDashboard";
import ProductDetail from "../pages/productDetail/ProductDetail";

import { ReactNode } from "react";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated  } = useAuth();
  return isAuthenticated ? children : <Navigate to='/login' />;
};

const PublicRoute = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Navigate to='/products' /> : children;
};

export default function AppRouter() {
  const { isAuthenticated } = useAuth();

  const routes = useRoutes([
    {
      path: "/login",
      element: (
        <PublicRoute>
          <LoginPage />
        </PublicRoute>
      ),
    },
    {
      path: "/products",
      element: (
        <ProtectedRoute>
          <ProductDashboard />
        </ProtectedRoute>
      ),
    },
    {
      path: "/products/:id",
      element: (
        <ProtectedRoute>
          <ProductDetail />
        </ProtectedRoute>
      ),
    },
    {
      path: "/",
      element: isAuthenticated ? (
        <Navigate to='/products' />
      ) : (
        <Navigate to='/login' />
      ),
    },
  ]);

  return routes;
}
