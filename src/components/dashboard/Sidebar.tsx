
import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { NavLink } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

import { 
  LayoutDashboard, 
  BarChart, 
  PieChart, 
  LineChart, 
  Settings, 
  Menu,
  Users,
  BadgeDollarSign,
  UtilityPole,
  
  ChevronLeft
} from "lucide-react";
import Offers from "@/pages/Offers";

interface SidebarProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

interface TokenPayload {
  role: string;
  // otros campos si los necesitas
}

const Sidebar: React.FC<SidebarProps> = ({ collapsed, setCollapsed }) => {

  const token = localStorage.getItem("auth_token");
let role = "";

if (token) {
  try {
    const decoded = jwtDecode<TokenPayload>(token);
    role = decoded.role;
  } catch (e) {
    console.error("Token inválido", e);
  }
}


  const menuItems = [
    {
      title: "Dashboard",
      icon: <LayoutDashboard size={20} />,
      path: "/dashboard",
      roles: ["admin", "buyer","seller"],
    },
    {
      title: "Usuarios",
      icon: <Users size={20} />,
      path: "/dashboard/users",
      roles: ["admin"],
    },
    {
      title: "Ofertas",
      icon: <UtilityPole size={20} />,
      path: "/dashboard/offers",
      roles: ["admin","buyer","seller"],
    },
    {
      title: "Transacciones",
      icon: <BadgeDollarSign size={20} />,
      path: "/dashboard/transactions",
      roles: ["admin","buyer","seller"],
    },
   
  ];
  const filteredItems = menuItems.filter((item) => item.roles.includes(role));


  return (
    <div 
      className={cn(
        "h-screen overflow-y-auto border-r bg-background transition-all duration-300 ease-in-out",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex h-16 items-center justify-between px-4 border-b">
        {!collapsed && (
          <span className="text-xl font-semibold text-primary">ERCO</span>
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
        {/* {menuItems.map((item, index) => (* */}
        {filteredItems.map((item, index) => (  
          <NavLink
            key={index}
            to={item.path}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 rounded-md px-3 py-2 transition-all hover:bg-accent",
                isActive ? "bg-green-100 text-primary font-medium" : "text-muted-foreground",
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
