<script setup>


import PrizeBondList from '@/components/PrizBondList.vue'
import NaveBar from '@/components/NaveBar.vue';

import { useBondStore } from '@/stores';
import { onMounted, ref } from 'vue';

const list = useBondStore();
const bondData = ref([]); // Store the fetched data

const bondlists = async () => {
  try {
    const res = await list.prizelist();
    if (res && res.data.data) {
        console.log(res.data);
        bondData.value = Object.values(res.data.data); // Convert object to array
    }
  } catch (error) {
    console.error("Dashboard fetch failed:", error);
  }
};

onMounted(bondlists);
</script>

<template>

  <!-- <Upload></Upload> -->
<PrizeBondList :response="bondData"></PrizeBondList>

</template>
