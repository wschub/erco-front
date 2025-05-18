
import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { useIsMobile } from "@/hooks/use-mobile";

const DashboardLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const isMobile = useIsMobile();
  
  // Auto-collapse on mobile
  React.useEffect(() => {
    if (isMobile) {
      setCollapsed(true);
    }
  }, [isMobile]);

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />
        <main className="flex-1 overflow-y-auto bg-slate-50 p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
