<script setup>
import DashCard from '@/components/DashCard.vue';
import NaveBar from '@/components/NaveBar.vue';
import { useDashBoardStore } from '@/stores';
import { onMounted, ref } from 'vue';

const home = useDashBoardStore();
const dashboardData = ref([]); // Store the fetched data

const fetchDashboard = async () => {
  try {
    const res = await home.dashboard();
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
    <NaveBar
    title="DashBoard" 
    description="View and analyze candidate profiles with detailed data."
    />
  <div class="mt-4 cards">
    <DashCard 
      v-for="(item, index) in dashboardData" 
      :key="index" 
      :title="item.title" 
      :totalCount="item.total_c" 
      :svgs="item.svg"
    />
  </div>
</template>
