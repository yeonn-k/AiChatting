import { create } from "zustand";
import { persist } from "zustand/middleware";
import { postAxios } from "@/utils/axios";
import { toast } from "react-toastify";

interface UserProfile {
  id?: string;
  email?: string;
  nickname?: string;
  name?: string;
  image?: string;
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
        const { user, token } = res.data || {};

        if (!token) throw new Error("토큰이 없습니다.");

        localStorage.setItem("token", token);

        set({
          isAuthenticated: true,
          user: {
            id: user?._id,
            email: user?.email,
            nickname: user?.nickname,
            name: user?.name,
            image: user?.image,
          },
        });
      },

      logout: () => {
        set({ isAuthenticated: false, user: null });
        localStorage.removeItem("token");
        localStorage.removeItem("auth-storage");
        toast.info("로그아웃 되었어요.");
      },
    }),
    { name: "auth-storage" }
  )
);

export default useAuthStore;
