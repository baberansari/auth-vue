<script setup>
import { reactive, ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useAuthStore } from '@/stores';
import logo from '@/assets/images/logo2.png';
const auth = useAuthStore();
const router = useRouter();
const route = useRoute();

const successMessage = ref("");
const errorMessage = ref("");
const isSubmitting = ref(false);
const errors = ref({});

const formData = reactive({
    token: '',
    email: '',
    password: '',
    password_confirmation: ''
});

// Extract token & email from route when component is mounted
onMounted(() => {
    formData.token = route.params.token || '';
    formData.email = route.query.email || '';
});

const validateForm = () => {
    errors.value = {}; // Reset errors
    let valid = true;

    if (!formData.password) {
        errors.value.password = "New password is required.";
        valid = false;
    } else if (formData.password.length < 8) {
        errors.value.password = "New password must be at least 8 characters.";
        valid = false;
    }
    if (formData.password !== formData.password_confirmation) {
        errors.value.password_confirmation = "Passwords do not match.";
        valid = false;
    }

    return valid;
};

const resetPassword = async () => {
    if (!validateForm()) return;

    isSubmitting.value = true;
    successMessage.value = "";
    errorMessage.value = "";

    try {
        const response = await auth.resetPassword({
            email: formData.email,
            token: formData.token,
            password: formData.password,
            password_confirmation: formData.password_confirmation
        });

        successMessage.value = response.message || "Password reset successfully!";
        router.push("/login");
    } catch (error) {
        errorMessage.value = error.response?.data?.message || "Failed to reset password.";
    } finally {
        isSubmitting.value = false;
    }
};
</script>

<template>
    <div class="login-outer-container">
        <div class="login-container">
            <img :src="logo" alt="Logo" />
            <h2>Reset Password</h2>
            <p class="message">Enter a new password to reset your account.</p>

            <form @submit.prevent="resetPassword">
                <div v-if="successMessage" class="alert alert-success">{{ successMessage }}</div>
                <div v-if="errorMessage" class="alert alert-danger">{{ errorMessage }}</div>

                <div class="row">
                    
                      
                   
                    <div class="input-container col text-left">
                        <label class="form-label mb-0 ">New Password</label>
                        <input  @input="errors.password = null" type="password" v-model="formData.password" class="form-control" required />
                        <span class="invalid-feedback" v-if="errors.password">{{ errors.password }}</span>
                    </div>
                </div>

                <div class="row">
                   
                    <div class="input-container col text-left">
                        <label class="form-label mb-0">Confirm New Password</label>
                        <input  @input="errors.password_confirmation"  type="password" v-model="formData.password_confirmation" class="form-control" required />
                        <span class="invalid-feedback" v-if="errors.password_confirmation">{{ errors.password_confirmation }}</span>
                    </div>
                </div>

                <button type="submit" :disabled="isSubmitting">Reset Password</button>
            </form>

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
.invalid-feedback{
    display:block;
}
.error-message {
    color: red;
    margin-top: 10px;
}
</style>
