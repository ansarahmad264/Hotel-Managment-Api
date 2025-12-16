import { create } from "zustand";
import { persist } from "zustand/middleware";

// auth store
export const useAuthStore = create()(
  persist(
    (set) => ({
      // State
      user: null,
      isAuthenticated: false,

      // Actions
      setUser: (user) => {
        set(() => ({
          user: user,
          isAuthenticated: true,
        }));
      },

      logout: () => {
        set(() => ({
          user: null,
          isAuthenticated: false,
        }));
      },
    }),
    {
      name: "auth-store",
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
