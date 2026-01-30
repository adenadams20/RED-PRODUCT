import { useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

export default function Layout() {
  const [open, setOpen] = useState(false);

  return (
    <div className="d-flex">
      {/* SIDEBAR */}
      <Sidebar isOpen={open} />

      {/* MAIN */}
      <div
        className="flex-grow-1"
        style={{ marginLeft: "250px", minHeight: "10vh" }}
      >
        {/* NAVBAR */}
        <Navbar toggleSidebar={() => setOpen(!open)} />

        {/* CONTENT */}
        <main className="p-3 bg-light" style={{ minHeight: "calc(100vh - 56px)" }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
