import { defineStore } from 'pinia';
import AxiosService from '../services/Axios.service';
import { ref } from 'vue';
import axios from 'axios';

export const useBondStore = defineStore('BondStore', () => {
    const bondlist = async (pay)=>{
        return AxiosService.get("http://auth-vue-api.test/api/bond-list",{
            params: pay  // Send parameters correctly
        });
    }

    const addBond = async (form)=>{
        return AxiosService.post("http://auth-vue-api.test/api/add-bond",form);
    }
    const category = async ()=>{
        return AxiosService.get("http://auth-vue-api.test/api/bond-category");
    }
    return {
        bondlist,addBond,category
    };
});
