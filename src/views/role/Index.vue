<script setup>

import BondListing from '@/components/BondListing.vue';
import Listing from '@/components/Listing.vue';
import { useBondStore } from '@/stores';
import { onMounted, ref } from 'vue';

const list = useBondStore();
const bondData = ref([]); // Store the fetched data

const bondlists = async () => {
  try {
    const res = await list.bondlist();
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
  
  <BondListing :response="bondData"></BondListing>

</template>
