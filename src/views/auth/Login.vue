<script setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores';

const auth = useAuthStore();
const router = useRouter();

const formData = reactive({
  email: '',
  password: '',
  keepLoggedIn: false,
});

const login = async (event) => {
    event.preventDefault(); // Prevent form submission refresh
    try {
        await auth.login({ email: formData.email, password: formData.password });
        router.push("/dashboard"); // Use router instance correctly
    } catch (error) {
        console.error("Login failed:", error);
    }
};
</script>

<template>
    <div class="login-outer-container">
        <div class="login-container">
            <img src="" alt="Logo" />
            <h2>Log in to admin account</h2>
            <p class="message">Welcome! Please enter your details.</p>

            <form @submit.prevent="login">  <!-- Prevent default submission -->
                <label class="email-label" for="email">Email</label>
                <input v-model="formData.email" type="email" placeholder="Enter your email" required autocomplete="email" autofocus />

                <label class="password-label" for="password">Password</label>
                <input v-model="formData.password" type="password" required autocomplete="current-password" placeholder="••••••••" />

                <div class="remember-pass">
                    <div>
                        <input v-model="formData.keepLoggedIn" type="checkbox" id="remember" />
                        <label for="remember">Remember for 30 days</label>
                    </div>
                </div>

                <button type="submit">Sign in</button>
            </form>
        </div>
        <div class="footer">
            <p>Copyright © 2024 <span>My WEB</span></p>
            <p>-</p>
            <a href="#">Privacy Policy</a>
        </div>
    </div>
</template>
