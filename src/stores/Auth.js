import { defineStore } from 'pinia';
// import { AuthService } from '@/services';
import { useGlobalStore, useSessionStore } from '@/stores';
import { ref } from 'vue';
import axios from 'axios';

export const useAuthStore = defineStore('AuthStore', () => {
    const globalStore = useGlobalStore();
    const currentUser = ref();
    const sessionStore = useSessionStore();

    const register = async (form) => {
        const { data } =  await axios.post("http://myapi.test/api/register", form);
        sessionStore.startUserSession(data);
    };

    const login = async (form) => {
        const { data } = await axios.post("http://myapi.test/api/login", form);
        sessionStore.startUserSession(data);
    };

    const logout = async () => {
        const { access_token: accessToken } = sessionStore.getCookie() || {};
        await axios.post("http://myapi.test/api/logout", {}, { headers: { Authorization: `Bearer ${accessToken}` } });
        sessionStore.clearSessionState();
    };

 

    return {
 
        login,
  
        register,
        logout,
 
    };
});
