import { Module } from "vuex";
import { GlobalDataProps } from "./index";

// 用户接口
export interface UserProps {
  isLogin: boolean;
  userName?: string;
}

const user: Module<UserProps, GlobalDataProps> = {
  mutations: {
    login(state) {
      state.isLogin = true;
      state.userName = "justic";
    },
    logout(state) {
      state.isLogin = false;
    },
  },
};

export default user;
