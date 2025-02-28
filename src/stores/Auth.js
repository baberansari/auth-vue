import { defineStore } from 'pinia';
import AxiosService from '../services/Axios.service';
import { ref } from 'vue';
import axios from 'axios';

export const useAuthStore = defineStore('AuthStore', () => {


    const register = async (form) => {
        return AxiosService.post("http://myapi.test/api/register", form);
  
    };

    const login = async (form) => {
        return AxiosService.post("http://myapi.test/api/login", form);
       
    };

    const logout = async () => {
        return AxiosService.post("http://myapi.test/api/logout");
       
    }
    return {
        login,
        register,
        logout,
 
    };
});
