import { defineStore } from 'pinia';

import { useGlobalStore, useSessionStore } from '@/stores';
import AxiosService from '../services/Axios.service';
import { ref } from 'vue';


export const useMaleListingStore = defineStore('MaleListingStore', () => {
    const globalStore = useGlobalStore();
    const currentUser = ref();
    const sessionStore = useSessionStore();

    const malelist = async ()=>{
        return AxiosService.get("http://auth-vue-api.test/api/male-candidate");

    }
    const femalelist = async ()=>{
     return  AxiosService.get("http://auth-vue-api.test/api/female-candidate");
       
       
    }
    const user = async ()=>{
        return AxiosService.get("http://auth-vue-api.test/api/user");
    }

    const userUpdate = async (form)=>{
        return AxiosService.post("http://auth-vue-api.test/api/userUpdate",form);
    }
    const changePassword = async (form)=>{
        return AxiosService.post("http://auth-vue-api.test/api/change-password",form);
    }
 

    return {
        malelist,femalelist,user,userUpdate,changePassword
    };
});
