import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Bell, LogOut, Search, Settings, User } from "lucide-react";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const DashboardMenu = () => {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h3 className="font-semibold text-2xl">Hi, Admin User</h3>
        <p className="hidden md:block md:text-md md:text-muted-foreground">
          Welcome back to your Dashboard
        </p>
      </div>
      <div className="hidden md:flex items-center relative">
        <Search className="absolute ml-2 text-muted-foreground" size={20} />
        <Input
          type="text"
          className="pl-10 md:w-80"
          placeholder="Search for meals..."
        />
      </div>
      <div className="flex space-x-3">
        <Button
          className="hidden md:flex shadow-sm rounded-full h-10 w-10 items-center justify-around"
          variant="outline"
          size="icon"
        >
          <Settings size={20} className="text-muted-foreground" />
        </Button>
        <Button
          className="flex rounded-full shadow-sm h-10 w-10 items-center justify-around"
          variant="outline"
          size="icon"
        >
          <Bell size={20} className="text-muted-foreground" />
        </Button>
        <span className="border-[1px] border-muted-foreground m-1"></span>
        <DropdownMenu>
          <DropdownMenuTrigger className="flex rounded-full h-10 w-10 items-center justify-around">
            <Image
              src="/ai-avatar.webp"
              alt="User avatar"
              className="h-10 w-10 rounded-full"
              width={20}
              height={20}
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-40">
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              <span>User Settings</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="md:hidden">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Logout</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default DashboardMenu;
