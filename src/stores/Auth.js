import { defineStore } from 'pinia';
import AxiosService from '../services/Axios.service';
import { useGlobalStore, useSessionStore } from '@/stores';
import { ref } from 'vue';
import axios from 'axios';

export const useAuthStore = defineStore('AuthStore', () => {

    const sessionStore = useSessionStore();
    const register = async (form) => {
        return AxiosService.post("http://auth-vue-api.test/api/register", form)
        .then(res => {
            sessionStore.startUserSession(res.data);
            return res;
        })
        .catch(error => {
            console.error("Login failed:", error);
        });
    };

    const login = async (form) => {
       return AxiosService.post("http://auth-vue-api.test/api/login", form)
        .then(res => {
            sessionStore.startUserSession(res.data);
            return res;
        })
        .catch(error => {
            console.error("Login failed:", error);
        });
       
    };
    const forget = async (form) => {
        return axios.post("http://auth-vue-api.test/api/forget-password", form)
        .then(res => {
            return res;
        })
        .catch(error => {
            console.error("Login failed:", error);
        });
        
    };
    const resetPassword = async (form) => {
        return axios.post("http://auth-vue-api.test/api/reset-password", form)
        .then(res => {
            return res;
        })
        .catch(error => {
            console.error("Login failed:", error);
        });
        
    };

    const logout = async () => {
     return   AxiosService.post("http://auth-vue-api.test/api/logout")
        .then(res => {
            sessionStore.clearSessionState();
        })
        .catch(error => {
            console.error("Login failed:", error);
        });
       
    }
    return {
        login,
        register,
        logout,
        forget,
        resetPassword
 
    };
});
