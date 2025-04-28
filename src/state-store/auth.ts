import { User, Vendor } from "@/types/user";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  isLoggedIn: boolean;
  user: Omit<User, "password"> | null;
  vendor: Omit<Vendor, "password"> | null;
}

interface AuthActions {
  login: (user: Omit<User, "password">) => void;
  loginVendor: (user: Omit<Vendor, "password">) => void;
  logout: () => void;
  syncWithLocalStorage: () => void;
}

interface AuthStore extends AuthState, AuthActions {}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      isLoggedIn: false,
      user: null,
      vendor: null,
      login: (user) => set({ isLoggedIn: true, user }),
      loginVendor: (vendor) => {
        set({ isLoggedIn: true, vendor });
      },
      logout: () => {
        localStorage.removeItem("userInfo");
        set({ isLoggedIn: false, user: null, vendor: null });
      },
      syncWithLocalStorage: () => {
        try {
          const userInfoStr = localStorage.getItem("userInfo");
          if (userInfoStr) {
            const userInfo = JSON.parse(userInfoStr);
            if (userInfo.user) {
              set({ isLoggedIn: true, user: userInfo.user });
            } else if (userInfo.vendor) {
              set({ isLoggedIn: true, vendor: userInfo.vendor });
            }
          }
        } catch (error) {
          console.error("Error syncing with localStorage:", error);
        }
      }
    }),
    {
      name: "user-information",
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.syncWithLocalStorage();
        }
      },
    }
  )
);

export default useAuthStore;
