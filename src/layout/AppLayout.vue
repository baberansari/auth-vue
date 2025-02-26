<script setup>
import SideBar from '../components/Sidebar.vue';
import NaveBar from '../components/NaveBar.vue';

</script>
<template>
    <div id="wrapper">
        <SideBar></SideBar>
        <section  id="content-wrapper">
          <NaveBar></NaveBar>         
            <router-view />
        </section>
    </div>
</template>