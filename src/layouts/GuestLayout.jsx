import { Outlet } from "react-router-dom";

export default function GuestLayout() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="max-w-md w-full bg-white p-6 rounded shadow">
        <Outlet />
      </div>
    </div>
  );
}
