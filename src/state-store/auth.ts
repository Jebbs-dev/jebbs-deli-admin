import { Admin, User } from "@/types/user";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  isLoggedIn: boolean;
  user: Omit<Admin, "password"> | null;
}

interface AuthActions {
  login: (user: Omit<Admin, "password">) => void;
  logout: () => void;
  syncWithLocalStorage: () => void;
}

interface AuthStore extends AuthState, AuthActions {}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      isLoggedIn: false,
      user: null,
      login: (user) => set({ isLoggedIn: true, user }),
      logout: () => {
        localStorage.removeItem("userInfo");
        set({ isLoggedIn: false, user: null });
      },
      syncWithLocalStorage: () => {
        try {
          const userInfoStr = localStorage.getItem("userInfo");
          if (userInfoStr) {
            const userInfo = JSON.parse(userInfoStr);
            if (userInfo.user) {
              set({ isLoggedIn: true, user: userInfo.user });
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
