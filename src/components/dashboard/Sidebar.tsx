
import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { NavLink } from "react-router-dom";
import { 
  LayoutDashboard, 
  BarChart, 
  PieChart, 
  LineChart, 
  Settings, 
  Menu,
  ChevronLeft
} from "lucide-react";

interface SidebarProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ collapsed, setCollapsed }) => {
  const menuItems = [
    {
      title: "Dashboard",
      icon: <LayoutDashboard size={20} />,
      path: "/dashboard",
    },
    {
      title: "Bar Charts",
      icon: <BarChart size={20} />,
      path: "/dashboard/bar-charts",
    },
    {
      title: "Pie Charts",
      icon: <PieChart size={20} />,
      path: "/dashboard/pie-charts",
    },
    {
      title: "Line Charts",
      icon: <LineChart size={20} />,
      path: "/dashboard/line-charts",
    },
    {
      title: "Settings",
      icon: <Settings size={20} />,
      path: "/dashboard/settings",
    },
  ];

  return (
    <div 
      className={cn(
        "h-screen overflow-y-auto border-r bg-background transition-all duration-300 ease-in-out",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex h-16 items-center justify-between px-4 border-b">
        {!collapsed && (
          <span className="text-xl font-semibold text-indigo-600">Analytics</span>
        )}
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => setCollapsed(!collapsed)} 
          className="ml-auto"
        >
          {collapsed ? <Menu size={20} /> : <ChevronLeft size={20} />}
        </Button>
      </div>
      
      <div className="px-2 py-4 space-y-2">
        {menuItems.map((item, index) => (
          <NavLink
            key={index}
            to={item.path}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 rounded-md px-3 py-2 transition-all hover:bg-accent",
                isActive ? "bg-indigo-100 text-indigo-900 font-medium" : "text-muted-foreground",
                collapsed && "justify-center px-0"
              )
            }
          >
            {item.icon}
            {!collapsed && <span>{item.title}</span>}
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
