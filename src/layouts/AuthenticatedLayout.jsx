import Navbar from "@/components/Navbar/Navbar";
import { Outlet } from "react-router-dom";

export default function AuthenticatedLayout() {
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
    </>
  );
}
