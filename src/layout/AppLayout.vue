<script setup>
import SideBar from '@/components/SideBar.vue';
import NaveBar from '../components/NaveBar.vue';
import { useAuthStore}  from '@/stores';
import {ref,onMounted} from 'vue';
const home = useAuthStore();
const dashboardData = ref([]); // Store the fetched data

const fetchUser = async () => {
  try {
    const res = await home.user();
    if (res && res.data.data) {
        
      dashboardData.value = Object.values(res.data.data); // Convert object to array
    }
  } catch (error) {
    console.error("Dashboard fetch failed:", error);
  }
};

onMounted(fetchUser);
</script>
<template>
    <div id="wrapper">
        <SideBar></SideBar>
        <section  id="content-wrapper">
            <router-view />
        </section>
    </div>
</template>