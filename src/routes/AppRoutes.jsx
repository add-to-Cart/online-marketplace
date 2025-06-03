import { Routes, Route, Navigate } from "react-router-dom";

// Pages
import HomePage from "@/pages/HomePage";
import LoginPage from "@/pages/LoginPage";
import SignupPage from "@/pages/SignupPage";
import ForgotPasswordPage from "@/pages/ForgotPassword";
import ProductDetailPage from "@/pages/ProductDetailPage";

// Layouts
import GuestLayout from "@/layouts/GuestLayout"; // No navbar, centered forms
import AuthenticatedLayout from "@/layouts/AuthenticatedLayout"; // Authenticated layout

export default function AppRoutes() {
  return (
    <Routes>
      {/* Guest routes */}
      <Route element={<GuestLayout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        {/* Redirect unknown guest paths */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Route>

      {/* Authenticated routes */}
      <Route element={<AuthenticatedLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/products/:productId" element={<ProductDetailPage />} />
        {/* Redirect unknown authenticated paths */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}
