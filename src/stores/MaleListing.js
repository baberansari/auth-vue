import { defineStore } from 'pinia';

import { useGlobalStore, useSessionStore } from '@/stores';
import AxiosService from '../services/Axios.service';
import { ref } from 'vue';


export const useMaleListingStore = defineStore('MaleListingStore', () => {
    const globalStore = useGlobalStore();
    const currentUser = ref();
    const sessionStore = useSessionStore();

    const malelist = async ()=>{
        return AxiosService.get("http://myapi.test/api/male-candidate");

    }
    const femalelist = async ()=>{
     return  AxiosService.get("http://myapi.test/api/female-candidate");
       
       
    }
    const user = async ()=>{
        return AxiosService.get("http://myapi.test/api/user");
    }
 

    return {
        malelist,femalelist,user
    };
});
