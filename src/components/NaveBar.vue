<script setup>
import image from '../assets/images/welcome-dashboard.svg';
import logo from '../assets/images/logo1.png';
defineProps({
  title: String,
  description:String
});

</script>

<template>
    <img class="sidebar-toggle toggle-for-mobile" :src="logo" alt="" />
    <a href="#">
        <img :src="image" alt="Welcome Dashboard" />
    </a>
    <h2 class="content-title">{{title}}</h2>
    <p class="content-para">
        {{description}}
    </p>
</template>
