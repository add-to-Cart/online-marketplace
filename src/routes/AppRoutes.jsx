import { Routes, Route, Navigate } from "react-router-dom";

import MainLayout from "@/layouts/MainLayout";
import SellerLayout from "@/layouts/SellerLayout";

import LoginPage from "@/pages/LoginPage";
import SignupPage from "@/pages/SignupPage";
import ForgotPasswordPage from "@/pages/ForgotPassword";
import MarketplacePage from "@/pages/Marketplace";
import ProductDetailPage from "@/pages/ProductDetailPage";
import CompleteProfilePage from "@/pages/CompleteProfilePage";
import ProfilePage from "@/pages/ProfilePage";
import SellerDashboard from "@/pages/SellerDashboard";
import SellerApplicationPage from "@/pages/SellerApplicationPage";
import AdminSellerApprovals from "@/pages/AdminSellerApprovals";
import InventoryPage from "@/features/seller/pages/InventoryPage";
import ProductsPage from "@/features/seller/pages/ProductsPage";
import SalesPage from "@/features/seller/pages/SalesPage";
import OrdersPage from "@/features/seller/pages/OrdersPage";
import RestrictedSellerPage from "@/pages/RestrictedSellerPage";
import ProductForm from "@/features/seller/components/ProductForm";

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<MarketplacePage />} />
        <Route path="/products/:productId" element={<ProductDetailPage />} />

        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/complete-profile" element={<CompleteProfilePage />} />
        <Route path="/apply-seller" element={<SellerApplicationPage />} />
        <Route path="/admin" element={<AdminSellerApprovals />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>

      <Route path="/seller" element={<SellerLayout />}>
        <Route index element={<SellerDashboard />} />
        <Route path="products" element={<ProductsPage />} />
        <Route path="inventory" element={<InventoryPage />} />
        <Route path="sales" element={<SalesPage />} />
        <Route path="orders" element={<OrdersPage />} />
        <Route path="/seller/products/edit/:id" element={<ProductForm />} />
      </Route>
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/restricted" element={<RestrictedSellerPage />} />
    </Routes>
  );
}
