
import React from "react";
import { useAuth } from "@/context/AuthContext";
import { 
  Bell, 
  Settings, 
  User, 
  LogOut,
  Search
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();

  const getInitials = (name: string) => {
    return name.charAt(0).toUpperCase();
  };

  return (
    <div className="h-16 border-b bg-background px-4 flex items-center justify-between">
      <div className="flex items-center gap-2 lg:gap-4 w-full max-w-sm">
        <Search size={20} className="text-muted-foreground" />
        <Input
          placeholder="Search..."
          className="rounded-full bg-slate-100 border-none focus-visible:ring-1 focus-visible:ring-slate-200"
        />
      </div>

      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="text-muted-foreground">
          <Bell size={20} />
        </Button>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-10 w-10 rounded-full">
              <Avatar className="h-10 w-10">
                <AvatarImage src={user?.avatar} alt={user?.username || "User"} />
                <AvatarFallback>{user ? getInitials(user.username) : "U"}</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel>
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">{user?.username}</p>
                <p className="text-xs leading-none text-muted-foreground">
                  {user?.username?.toLowerCase()}@example.com
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={logout} className="text-red-500">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default Navbar;
