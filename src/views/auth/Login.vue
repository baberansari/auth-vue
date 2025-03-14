<script setup>
import { reactive,ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore,useSessionStore } from '@/stores';
import logo from '@/assets/images/logo2.png';

const auth = useAuthStore();
const router = useRouter();

const formData = reactive({
  email: '',
  password: '',
  keepLoggedIn: false,
});
const loading = ref(false);
const errors = ref([]);
const sessionStore = useSessionStore();
const login = async (event) => {
   
    try {
        loading.value =true;
      const  res =   await auth.login({ email: formData.email, password: formData.password });
      sessionStore.startUserSession(res.data);
        router.push("/dashboard");

    } catch (error) {
        errors.value = error.response.data.errors;
        console.log("Login failed:", error.response.data.errors);
    }finally{
        loading.value =false;
    }
};
</script>

<template>
    <div class="login-outer-container">
        <div class="login-container">
            <img :src="logo" alt="Logo" />
            <h2>Log in to admin account</h2>
            <p class="message">Welcome! Please enter your details.</p>

            <form @submit.prevent="login">  <!-- Prevent default submission -->
                <label class="email-label" for="email">Email</label>
                <input v-model="formData.email" type="email" placeholder="Enter your email" required autocomplete="email" autofocus />
               
                <span class="invalid-feedback" v-if="errors.email">{{ errors.email[0] }}</span>


                <label class="password-label" for="password">Password</label>
                <input v-model="formData.password" type="password" required autocomplete="current-password" placeholder="••••••••" />
               
                <div class="remember-pass">
                    <div>
                        <input v-model="formData.keepLoggedIn" type="checkbox" id="remember" />
                        <label for="remember">Remember for 30 days</label>
                    </div>
                    <router-link :to="{ name: 'forget-password' }">
                        Forgot password
                    </router-link>
                 
                </div>
                <button type="submit" :disabled="loading">
                    <div v-if="loading" class="spinner-border text-light" role="status">
                        <span class="sr-only">Loading...</span>
                    </div>
                    <span v-else>Sign in</span>
                </button>
            </form>
            <router-link :to="{ name: 'register' }">
                Sign up
            </router-link>
           

        </div>
        <div class="footer">
            <p>Copyright © 2024 <span>My WEB</span></p>
            <p>-</p>
            <a href="#">Privacy Policy</a>
        </div>
    </div>
</template>
<style>
.invalid-feedback{
    display:block;
}
</style>