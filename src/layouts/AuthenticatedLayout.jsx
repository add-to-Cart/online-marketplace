import Navbar from "@/components/Navbar/Navbar";
import { Outlet } from "react-router-dom";

export default function AuthenticatedLayout() {
  return (
    <>
      <Navbar />
      <main className="p-4">
        <Outlet /> {/* Nested route renders here */}
      </main>
    </>
  );
}
