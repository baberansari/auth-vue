<script setup>
import { onMounted, ref } from 'vue';
import ChangePassword from '@/components/ChangePassword.vue';
import NaveBar from '@/components/NaveBar.vue';
import Profile from '@/components/Profile.vue';
import { useMaleListingStore } from '@/stores';


const list = useMaleListingStore();
const userData = ref({}); // Store the fetched data

const fetchUser = async () => {
  try {
    const res = await list.user();
    if (res && res.data.data) {
        userData.value =res.data.data; // Convert object to array
    }
  } catch (error) {
    console.error("Dashboard fetch failed:", error);
  }
};

onMounted(fetchUser);

const activeTab = ref('profile');

const setActiveTab = (tab) => {
    activeTab.value = tab;
};
</script>

<template>
   <NaveBar 
        title="Profile Setting" 
        description="Update your photo and personal details here.." 
    />

    <div class="profile-container">
        <div class="looking-for">
            <div class="tab tab_seeting">
                <a href="#" :class="{ active: activeTab === 'profile' }" @click.prevent="setActiveTab('profile')">
                    Candidate Profile
                </a>
                <a href="#" :class="{ active: activeTab === 'changePassword' }" @click.prevent="setActiveTab('changePassword')">
                    Change Password
                </a>
            </div>
        </div>
    </div>

    <Profile :user="userData"  v-if="activeTab === 'profile'" />
    <ChangePassword v-if="activeTab === 'changePassword'" />

</template>

<style scoped>
.active {
    color: red;
    font-weight: bold;
    /* text-decoration: underline; */
}
</style>
