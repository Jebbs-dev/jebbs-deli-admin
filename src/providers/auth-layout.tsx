"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { FaSpinner } from "react-icons/fa";
import useAuthStore from "@/state-store/auth";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  const { user, isLoggedIn, login, loginVendor } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    // Check if we have userInfo in localStorage first
    const checkUserInfoInLocalStorage = () => {
      try {
        const userInfoStr = localStorage.getItem("userInfo");
        if (userInfoStr) {
          const userInfo = JSON.parse(userInfoStr);
          
          // Check if we have valid tokens
          if (userInfo.accessToken) {
            // If we have valid info but the auth store is not updated, update it
            if (!isLoggedIn) {
              if (userInfo.user) {
                login(userInfo.user);
              } else if (userInfo.user.role === "VENDOR") {
                loginVendor(userInfo.user);
              }
            }
            
            // Only navigate away from auth pages
            if (pathname.startsWith("/auth")) {
              router.replace("/");
            }
            
            setCheckingAuth(false);
            return true;
          }
        }
        return false;
      } catch (error) {
        console.error("Error checking localStorage:", error);
        return false;
      }
    };

    // If not logged in according to the store, check localStorage
    if (!isLoggedIn) {
      const hasValidUserInfo = checkUserInfoInLocalStorage();
      
      // Only redirect to auth if no valid userInfo was found
      if (!hasValidUserInfo && !pathname.startsWith("/auth")) {
        router.replace("/auth");
      }
    }
    
    setCheckingAuth(false);
  }, [isLoggedIn, user, router, pathname, login, loginVendor]);

  // Prevent rendering anything while checking authentication
  if (checkingAuth) {
    return (
      <div className="flex justify-center items-center h-screen">
        <FaSpinner className="animate-spin text-4xl" />
      </div>
    );
  }

  return <>{children}</>;
};

export default AuthLayout;
