<script setup>
import { onBeforeMount, onMounted, ref } from "vue";
import ChangePassword from "@/components/ChangePassword.vue";
import NaveBar from "@/components/NaveBar.vue";
import Profile from "@/components/Profile.vue";
import { useMaleListingStore } from "@/stores";

const list = useMaleListingStore();
const userData = ref({}); // Store the fetched data
const loading = ref(false); // Store the fetched data

const fetchUser = async () => {
  try {
    loading.value = true;
    const res = await list.user();

    if (res && res.data.user) {
     
      userData.value = res.data.user; // Convert object to array
    }
  } catch (error) {
    console.error("Dashboard fetch failed:", error);
  } finally {
    loading.value = false;
  }
};

onBeforeMount(async () => {
  await fetchUser();
});

const activeTab = ref("profile");

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
        <a
          href="#"
          :class="{ active: activeTab === 'profile' }"
          @click.prevent="setActiveTab('profile')"
        >
          Candidate Profile
        </a>
        <a
          href="#"
          :class="{ active: activeTab === 'changePassword' }"
          @click.prevent="setActiveTab('changePassword')"
        >
          Change Password
        </a>
      </div>
    </div>
  </div>

  <template v-if="activeTab === 'profile'">
    <Profile v-if="!loading" :user="userData" />
  </template>
  <template v-if="activeTab === 'changePassword'">
    <ChangePassword />
  </template>
</template>

<style scoped>
.active {
  color: red;
  font-weight: bold;
  /* text-decoration: underline; */
}
</style>
