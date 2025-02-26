<script setup>
import image from '../assets/images/welcome-dashboard.svg';
import logo from '../assets/images/logo1.png';
</script>

<template>
    <img class="sidebar-toggle toggle-for-mobile" :src="logo" alt="" />
    <a href="#">
        <img :src="image" alt="Welcome Dashboard" />
    </a>
    <h2 class="content-title">Dashboard</h2>
    <p class="content-para">
        View and analyze candidate profiles with detailed data.
    </p>
</template>
