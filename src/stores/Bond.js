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
    const prizelist = async ()=>{
        return AxiosService.get("http://auth-vue-api.test/api/prize-list");
    }

    const addBond = async (form)=>{
        return AxiosService.post("http://auth-vue-api.test/api/add-bond",form);
    }
    const updateBond = async (form)=>{
        return AxiosService.post("http://auth-vue-api.test/api/update-bond",form);
    }
    const viewBond = async(id)=>{
        return AxiosService.get("http://auth-vue-api.test/api/view-bond/"+id);
    }
    const category = async ()=>{
        return AxiosService.get("http://auth-vue-api.test/api/bond-category");
    }
    const winBond = async ()=>{
        return AxiosService.get("http://auth-vue-api.test/api/win-bond");
    }
    const notification = async ()=>{
        return AxiosService.get("http://auth-vue-api.test/api/notification");
    }
    const uploadList = async (form)=>{
        return AxiosService.post("http://auth-vue-api.test/api/upload-list",form);
    }
    return {
        bondlist,addBond,category,winBond,notification,viewBond,updateBond,uploadList,prizelist
    };
});
