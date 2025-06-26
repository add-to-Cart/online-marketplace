import { useAuth } from "@/contexts/AuthContext";
import { useUser } from "@/contexts/UserContext";
import { useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import Sidebar from "@/features/seller/components/Sidebar";

export default function SellerLayout() {
  const { user: authUser, loading: authLoading } = useAuth();
  const { user, loading: userLoading } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!authLoading && !authUser) {
      navigate("/login");
    }
  }, [authLoading, authUser, navigate]);

  useEffect(() => {
    if (
      !authLoading &&
      !userLoading &&
      (!user?.seller || !user?.seller?.isApproved)
    ) {
      navigate("/restricted");
    }
  }, [authLoading, userLoading, user, navigate]);

  if (authLoading || userLoading) {
    return (
      <div className="p-10 text-sm text-gray-600">
        Loading your seller dashboard...
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-100 text-gray-800 font-sans">
      <aside className="w-full max-w-xs bg-white border-r border-gray-200 hidden md:block">
        <Sidebar />
      </aside>
      <main className="flex-1 p-8">
        <Outlet />
      </main>
    </div>
  );
}
