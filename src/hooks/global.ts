import { create } from "zustand";
import api from "../utils/axios";
import axios from "axios";

type GlobalState = {
  access: string;
  refresh: string;
  isLoading: boolean;
  error: any;
  userData: any;
  sendData: (data: any) => void;
};

const useGlobal = create<GlobalState>((set) => ({
  isLoading: true,
  error: null,
  userData: "",
  access: "",
  refresh: "",

  sendData: async (data) => {
    set({ isLoading: true, error: null });
    try {
      axios
        .post("https://roodensky.online/api/test/", data)
        .then((res) => {
          localStorage.setItem("access", res.data.access);

          localStorage.setItem("refresh", res.data.refresh);
          console.log(localStorage.getItem("access"), "got it");
          set({
            userData: res.data.user,
            isLoading: false,
            access: res.data.access,
            refresh: res.data.refresh,
          });
        })
        .catch((error: any) => {
          set({ error: error.message, isLoading: false });
        });
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
    }
  },
}));

export default useGlobal;
