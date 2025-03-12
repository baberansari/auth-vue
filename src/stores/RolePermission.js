import { defineStore } from 'pinia';
import AxiosService from '../services/Axios.service';
import { ref } from 'vue';
import axios from 'axios';

export const useRolePermissionStore = defineStore('RolePermissionStore', () => {
    const permission = async (pay)=>{
        return AxiosService.get("http://auth-vue-api.test/api/bond-list",{
            params: pay  // Send parameters correctly
        });
    }
    return {
        permission
    };
});
