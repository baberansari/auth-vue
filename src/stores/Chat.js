import { defineStore } from 'pinia';
import AxiosService from '../services/Axios.service';
import { ref } from 'vue';
import axios from 'axios';

export const useChatStore = defineStore('ChatStore', () => {
    const chats = async ()=>{
        return AxiosService.get("http://myapi.test/api/chats");
    }
    const info = async (pay)=>{
      
        return AxiosService.get("http://myapi.test/api/chats/profile/info", {
            params: pay  // Send parameters correctly
        });
    }
    const messages = async (pay) => {
        return AxiosService.get("http://myapi.test/api/messages", {
            params: pay  // Send parameters correctly
        });
    };
    
    return {
        chats,info,messages
    };
});
