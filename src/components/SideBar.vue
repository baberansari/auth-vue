<script setup>
import logo from '../assets/images/logo2.png';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { useAuthStore } from "@/stores/";
import { useRouter } from "vue-router";
const auth = useAuthStore();
const router = useRouter();
const logout = async () => {
    await auth.logout();
    router.push("/login");
};

</script>

<template>


<aside id="sidebar-wrapper">
    <div class="sidebar-brand">
        <img class="sidebar-toggle logo"  :src="logo" alt="" />
    </div>
<div>


    <ul class="sidebar-nav ul-side-bar">
        <form class="sidebar-search">
            <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
            <img src="" alt="" />
        </form>
        <li class=" "  v-if="
            $ability.can('view_dashboard')">
            <router-link :to="{ name: 'dashboard' }">
                <i class="fa-solid fa-home"></i>Dashboard
            </router-link>
            
        </li>
        <li class=" "  v-if="
            $ability.can('view_candidate')">
            <router-link :to="{ name: 'female' }">
                <i class="fa-solid fa-user"></i>User 
            </router-link>
           
        </li>
        <li class=" "  >
            <router-link :to="{ name: 'upload-list' }">
            <i class="fa-solid fa-envelope"></i> Upload Bond List
            </router-link>

        </li>
        <li class=" "  v-if="
            $ability.can('view_bond')">
            <router-link :to="{ name: 'bond' }">
                <i class="fa-solid fa-hands-bound"></i> Bonds
            </router-link>

        </li>
       
        <li class=" "  v-if="
            $ability.can('view_settings')">
            <router-link :to="{ name: 'setting' }">
                <i class="fa-solid fa-gear"></i> Settings
            </router-link>
        </li>
        <li class=" "  v-if="
            $ability.can('view_success_stories')">
               <router-link :to="{ name: 'winbond' }">
                <i class="fa-solid fa-shield-halved"></i> SuccessStories
            </router-link>
          
        </li>
        <li class="" v-if="
            $ability.can('view_latest_notification')">
            <a href=""><i class="fa-solid fa-bell"></i>Latest Notification</a>
        </li>
       

    </ul>
</div>
    <div class="dashboard-cred" style="background-color: white;padding-top: 10px;">
        <a @click="logout" class="d-flex" style="cursor: pointer;">
        <i class="fa-solid fa-right-from-bracket"></i>
        <div class="cred-details">
            <h4>Logout</h4>
            <p style="width: 138px;overflow-wrap: break-word;"></p>
        </div>
        
        </a>
       
    </div>
</aside>
</template>
<style>
.logo{
    width:250px;
    height: 97px;
}
</style>