<script setup>
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores';
import logo from '@/assets/images/logo2.png';
const auth = useAuthStore();
const router = useRouter();
const successMessage = ref("");
const errorMessage = ref("");
const isSubmitting = ref(false);
const formData = reactive({
  email: ''
});

const forgets = async (event) => {
        event.preventDefault();
    successMessage.value = "";
    errorMessage.value = "";
    isSubmitting.value = true;
    
    try {
        const response = await auth.forget({ email: formData.email }); 
     
        if (response.data.success) {
            successMessage.value = response.data.message;
        } else {
            errorMessage.value = response.data.message || "Something went wrong.";
        }
    } catch (error) {
        errorMessage.value = error.response?.data?.message || "Failed to send reset email.";
    } 
};
</script>

<template>
    <div class="login-outer-container">
        <div class="login-container">
            <img :src="logo" alt="Logo" />
            <h2>Forget Password</h2>
            <p class="message">Enter your email to receive a password reset link.</p>

            <form @submit.prevent="forgets">
                <label class="email-label" for="email">Email</label>
                <input v-model="formData.email" type="email" placeholder="Enter your email" required autocomplete="email" autofocus />

                <button type="submit">Send Email</button>
            </form>

            <p v-if="successMessage" class="success-message">{{ successMessage }}</p>
            <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>

            <router-link :to="{ name: 'register' }">Sign up</router-link>
        </div>
        <div class="footer">
            <p>Copyright © 2024 <span>My WEB</span></p>
            <p>-</p>
            <a href="#">Privacy Policy</a>
        </div>
    </div>
</template>

<style>
.success-message {
    color: green;
    margin-top: 10px;
}
.error-message {
    color: red;
    margin-top: 10px;
}
</style>
