import { create } from "zustand";
import { persist } from "zustand/middleware";
import { postAxios } from "@/utils/axios";
import { toast } from "react-toastify";

interface UserProfile {
  token: string;
}

interface UserState {
  isAuthenticated: boolean;
  user: UserProfile | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const useAuthStore = create<UserState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: null,

      login: async (email, password) => {
        const res = await postAxios("/auth/signin", { email, password });
        const { token } = res.data || {};

        if (!token) throw new Error("토큰이 없습니다.");

        localStorage.setItem("token", token);

        set({
          isAuthenticated: true,
          user: {
            token: token,
          },
        });
      },

      logout: () => {
        set({ isAuthenticated: false, user: null });
        localStorage.removeItem("token");
        toast.info("로그아웃 되었어요.");
      },
    }),
    { name: "auth-storage" }
  )
);

export default useAuthStore;
