import { create } from "zustand";
import { User } from "./types";

interface UserStore {
  user: User | null;
  setUser: (user: User) => void;
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,

  setUser: (user) => {
    console.log(user, "<---diuserStore");

    const userData = {
      ...user,
      credits: user.credits,
    };

    set(() => ({
      user: userData,
    }));
  },
}));
