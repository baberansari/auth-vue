import { defineStore } from 'pinia';
import AxiosService from '../services/Axios.service';
import { useGlobalStore, useSessionStore } from '@/stores';
import { ref } from 'vue';
import axios from 'axios';

export const useDashBoardStore = defineStore('DashBoardStore', () => {
    const globalStore = useGlobalStore();
    const currentUser = ref();
    const sessionStore = useSessionStore();

    const dashboard = async ()=>{
        return AxiosService.get("http://auth-vue-api.test/api/dashboard");
    }
    return {
        dashboard
    };
});
