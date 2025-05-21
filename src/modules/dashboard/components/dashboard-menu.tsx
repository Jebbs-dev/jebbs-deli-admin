"use client";

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
import { ModeToggle } from "@/components/ui/mode-toggle";
import useAuthStore from "@/state-store/auth";
import useUserRole from "@/hooks/useUserRole";

const DashboardMenu = () => {
  const { user } = useAuthStore();

  const userType = useUserRole();

  return (
    <div className="flex items-center justify-between px-3 md:p-0">
      <div>
        <h3 className="font-semibold text-xl md:text-2xl">
          Hi, {user?.name}
        </h3>
        <p className="hidden md:block text-sm md:text-md md:text-muted-foreground">
          Welcome back to your Dashboard
        </p>
      </div>
      {/* <div className="hidden xl:flex items-center relative">
        <Search className="absolute ml-2 text-primary" size={20} />
        <Input
          type="text"
          className="pl-10 md:w-80 border-primary"
          placeholder="Search for meals..."
        />
      </div> */}
      <div className="flex space-x-1 md:space-x-3">
        <ModeToggle />

        <Button
          className="flex rounded-full shadow-sm border-primary h-7 w-7 md:h-10 md:w-10 items-center justify-around"
          variant="outline"
          size="icon"
        >
          <Bell size={20} className="text-primary" />
        </Button>
        <span className="border-[1px] border-primary m-1"></span>
        <DropdownMenu>
          <DropdownMenuTrigger className="flex rounded-full items-center justify-around">
            <Image
              src="/ai-avatar.webp"
              alt="User avatar"
              className="h-7 w-7 md:h-10 md:w-10 rounded-full object-cover"
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
