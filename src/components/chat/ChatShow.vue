<script setup>

const BASE_URL = 'https://app.focussubs.com/storage/';
// const BASE_URL = 'http://focus_subs.test/storage/';
import Avatar from '../../assets/img/profile_avater.png'
const props = defineProps({
    chats: {
        type: Object
    },
    checkOnlineUsers: {
        type: Object
    },
    activeChat: {
        type: Number
    },
    auth: {
    type: Object,
    default: () => ({}),
  },

});

defineEmits(['loadMessage'])

</script>

<template>
     <div :class="`contact ${activeChat === chat.chat_id ? 'active' : ''}`" @click="$emit('loadMessage', chat?.user?.id, props.auth.id, chat?.chat_id, index)"  v-for="(chat, index) in props.chats" :key="chat.chat_id">
        <img class="rounded-circle" :src="chat?.user?.profile_image ?BASE_URL+chat?.user?.profile_image : Avatar" alt="" />
        <!-- <img
                    src="/assets/Bg.png"
                    class="rounded-circle"
                    alt="Profile"
                  /> -->
                  <div class="peek">
                    <h6 class="mb-0"> {{ chat?.user?.name }}</h6>
                    <p class="text-muted">{{ chat.message }}</p>
                  </div>
                  <small class="ml-auto text-muted">{{ chat.created_at }}</small>
                </div>
    <!-- <ul class="users_chat_list">
        <li class="users_chat_list_box_cselem active" @click="$emit('loadMessage', chat?.user?.id, $page.props.auth.id, chat?.chat_id, index)"
            v-for="(chat, index) in props.chats" :key="chat.chat_id">
            <div class="img-bx-pr-cslem" :class="{ 'is_online_yes': checkOnlineUsers.find(e => e.user_id == chat.user.id) }">
                <img :src="chat?.user?.profile?.image ? '/'+chat?.user?.profile?.image : '/assets/img/logo.png'" alt="" />
            </div>
            <div class="name-bx-pr-cslem">
                <h5>
                    {{ chat?.user?.first_name }}
                    <span class="pink_circle"></span>
                </h5>
                <p>
                    {{ chat.message }}
                </p>
            </div>
            <div class="active_time_cs_elem">
                <span>{{ chat.created_at }}</span>
            </div>
        </li>
    </ul> -->
</template>
