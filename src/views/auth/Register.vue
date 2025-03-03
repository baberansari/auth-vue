<script setup>
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores";
import logo from '@/assets/images/logo2.png';
const auth = useAuthStore();
const router = useRouter();

const formData = reactive({
  name: "",
  email: "",
  password: "",
  password_confirmation: "",
  keepLoggedIn: false,
});

const errors = ref({});

const validateForm = () => {
  errors.value = {}; // Reset errors
  let valid = true;

  if (!formData.name) {
    errors.value.name = "Name is required.";
    valid = false;
  }
  if (!formData.email) {
    errors.value.email = "Email is required.";
    valid = false;
  } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
    errors.value.email = "Invalid email format.";
    valid = false;
  }

  if (!formData.password) {
    errors.value.password = "New password is required.";
    valid = false;
  } else if (formData.password.length < 8) {
    errors.value.password = "New password must be at least 8 characters.";
    valid = false;
  }

  if (!formData.password_confirmation) {
    errors.value.password_confirmation = "Password confirmation is required.";
    valid = false;
  } else if (formData.password !== formData.password_confirmation) {
    errors.value.password_confirmation = "Passwords do not match.";
    valid = false;
  }

  return valid;
};

const register = async () => {
  if (!validateForm()) return;
  try {
    await auth.register({
      name: formData.name,
      email: formData.email,
      password: formData.password,
    });
    router.push("/dashboard");
  } catch (error) {
    console.error("Registration failed:", error);
  }
};
</script>

<template>
  <div class="login-outer-container">
    <div class="login-container">
      <img :src="logo" alt="Logo" />
      <h2>Register as User</h2>
      <p class="message">Welcome! Please enter your details.</p>
      <form @submit.prevent="register">
        <!-- Name Field -->
        <label class="email-label" for="name">Name</label>
        <input
          v-model="formData.name"
          type="text"
          class="form-control"
          placeholder="Enter your Name"
          required
          autofocus
        />
        <span class="invalid-feedback" v-if="errors.name">{{ errors.name }}</span>

        <!-- Email Field -->
        <label class="email-label" for="email">Email</label>
        <input
          v-model="formData.email"
          type="email"
          class="form-control"
          placeholder="Enter your email"
          required
        />
        <span class="invalid-feedback" v-if="errors.email">{{ errors.email }}</span>

        <!-- Password Field -->
        <label class="email-label" for="password">Password</label>
        <input
          v-model="formData.password"
          type="password"
          class="form-control"
          placeholder="••••••••"
          required
        />
        <span class="invalid-feedback" v-if="errors.password">{{ errors.password }}</span>

        <!-- Confirm Password Field -->
        <label class="email-label" for="password-confirm">Confirm Password</label>
        <input
          v-model="formData.password_confirmation"
          type="password"
          class="form-control"
          placeholder="••••••••"
          required
        />
        <span class="invalid-feedback" v-if="errors.password_confirmation">{{
          errors.password_confirmation
        }}</span>

        <!-- Remember Me -->
        <div class="remember-pass">
            <div>

                <input v-model="formData.keepLoggedIn" type="checkbox" id="remember" />
                <label for="remember">Remember for 30 days</label>
            </div>
        </div>

        <!-- Submit Button -->
        <button type="submit">Register</button>
      </form>

      <router-link :to="{ name: 'login' }">Back</router-link>
    </div>

    <div class="footer">
      <p>Copyright © 2024 <span>My WEB</span></p>
      <p>-</p>
      <a href="#">Privacy Policy</a>
    </div>
  </div>
</template>

<style>
.invalid-feedback {
  display: block;
  text-align: left;
}
</style>
