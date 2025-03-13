<script setup>
import SideBar from "@/components/SideBar.vue";
import NaveBar from "../components/NaveBar.vue";
import { useAuthStore } from "@/stores";
import { ref, onBeforeMount } from "vue";

const authStore = useAuthStore();

const me = async () => {
  try {
    const res = await authStore.me();
  } catch (error) {
    console.error("Dashboard fetch failed:", error);
  }
};

onBeforeMount(async () => {
  await me();
});
</script>
<template>
  <template v-if="authStore.routeForbidden">
    <h1>403 Forbidden</h1>
    <p>you dont have access to this page</p>
  </template>
  <div id="wrapper" v-else>
    <SideBar></SideBar>
    <section id="content-wrapper">
      <router-view />
    </section>
  </div>
</template>
