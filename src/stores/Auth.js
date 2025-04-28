import { defineStore } from "pinia";
import AxiosService from "../services/Axios.service";
import { useGlobalStore, useSessionStore } from "@/stores";
import { ref } from "vue";
import axios from "axios";
import { updateAbility } from "@/plugins/ability";

export const useAuthStore = defineStore("AuthStore", () => {
  const user = ref();
  const routeForbidden = ref(false);
  const sessionStore = useSessionStore();
  const register = async (form) => {
    return AxiosService.post("http://auth-vue-api.test/api/register", form)
      .then((res) => {
        sessionStore.startUserSession(res.data);
        return res;
      })
      .catch((error) => {
        console.error("Login failed:", error);
      });
  };
  // const user = async () => {
  //     return AxiosService.get("http://auth-vue-api.test/api/user");

  // };
  const me = async () => {
    const res = (await AxiosService.get("http://auth-vue-api.test/api/user"))
      .data;
    user.value = res.user;
    updateAbility(res.user.permissions);
  };
  const setRouteForbidden = async (value) => {
    routeForbidden.value = value;
  };
  const login = async (form) => {
    return AxiosService.post("http://auth-vue-api.test/api/login", form);
     
  };
  const forget = async (form) => {
    return axios
      .post("http://auth-vue-api.test/api/forget-password", form)
      .then((res) => {
        return res;
      })
      .catch((error) => {
        console.error("Login failed:", error);
      });
  };
  const resetPassword = async (form) => {
    return axios
      .post("http://auth-vue-api.test/api/reset-password", form)
      .then((res) => {
        return res;
      })
      .catch((error) => {
        console.error("Login failed:", error);
      });
  };

  const logout = async () => {
    return AxiosService.post("http://auth-vue-api.test/api/logout")
      .then((res) => {
        sessionStore.clearSessionState();
      })
      .catch((error) => {
        console.error("Login failed:", error);
      });
  };
  return {
    login,
    routeForbidden,
    register,
    logout,
    forget,
    resetPassword,
    me,
    setRouteForbidden,
  };
});
