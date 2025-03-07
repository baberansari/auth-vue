<script setup>
import Chat from '@/components/chat/Chat.vue';
import DashCard from '@/components/DashCard.vue';
import NaveBar from '@/components/NaveBar.vue';
import { useChatStore ,useMaleListingStore} from '@/stores';
import { onMounted, ref } from 'vue';

const chats = useChatStore();
const maleList = useMaleListingStore();

const chatData = ref([]); // Store the chat messages
const userData = ref({}); // Store the user information

const fetchChats = async () => {
  try {
    const res = await chats.chats(); // Fetch chat data
    chatData.value = res.data.data || []; // Ensure it's an array

  } catch (error) {
    console.error("Dashboard fetch failed:", error);
  }
};

const fetchUser = async () => {
  try {
    const res = await maleList.user(); // Fetch user data
    userData.value = res.data.data || {}; // Ensure it's an object
  } catch (error) {
    console.error("User fetch failed:", error);
  }
};

onMounted(() => {
//   fetchChats();
  fetchUser();
});
</script>

<template>
  <div class="mt-4 ">
    <Chat :chats="chatData" :type="userData.type" :socketUrl="'http://127.0.0.1:3013'" :auth="userData">

    </Chat>
  </div>
</template>
<style>

</style>