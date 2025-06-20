import { Routes, Route, Navigate } from "react-router-dom";

// Pages
import HomePage from "@/pages/HomePage";
import LoginPage from "@/pages/LoginPage";
import SignupPage from "@/pages/SignupPage";
import ForgotPasswordPage from "@/pages/ForgotPassword";
import ProductDetailPage from "@/pages/ProductDetailPage";
import CompleteProfilePage from "../pages/CompleteProfilePage";
import ProfilePage from "../pages/ProfilePage";
import TestPage from "../pages/TestPage";
import SellerDashboard from "@/pages/SellerDashboard";
import SellerApplicationPage from "../pages/SellerApplicationPage";

// Layouts
import GuestLayout from "@/layouts/GuestLayout"; // No navbar, centered forms
import AuthenticatedLayout from "@/layouts/AuthenticatedLayout"; // Authenticated layout
import AdminSellerApprovals from "../pages/AdminSellerApprovals";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Guest routes */}
      <Route element={<GuestLayout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/test" element={<TestPage />} />
        {/* Redirect unknown guest paths */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Route>

      {/* Authenticated routes */}
      <Route element={<AuthenticatedLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/products/:productId" element={<ProductDetailPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/complete-profile" element={<CompleteProfilePage />} />
        <Route path="/seller" element={<SellerDashboard />}></Route>
        <Route path="/apply-seller" element={<SellerApplicationPage />}></Route>
        <Route path="/admin" element={<AdminSellerApprovals />}></Route>
        {/* Redirect unknown authenticated paths */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}
