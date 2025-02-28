<script setup>

import Listing from '@/components/Listing.vue';
import { useMaleListingStore } from '@/stores';
import { onMounted, ref } from 'vue';

const list = useMaleListingStore();
const dashboardData = ref([]); // Store the fetched data

const fetchDashboard = async () => {
  try {
    const res = await list.femalelist();
    console.log(res.data.data);
    if (res && res.data.data) {
    
      dashboardData.value = Object.values(res.data.data); // Convert object to array
    }
  } catch (error) {
    console.error("Dashboard fetch failed:", error);
  }
};

onMounted(fetchDashboard);
</script>

<template>
  <Listing :response="dashboardData"></Listing>

</template>
