<script setup>
import { ref } from 'vue';
import { useMaleListingStore } from "@/stores";

const maleListingStore = useMaleListingStore();

const formData = ref({
    old_password: "",
    password: "",
    password_confirmation: ""
});

const errors = ref({
    old_password: "",
    password: "",
    password_confirmation: ""
});

const successMessage = ref("");
const isSubmitting = ref(false);

const validateForm = () => {
    errors.value = {}; // Reset errors
    let valid = true;

    if (!formData.value.old_password) {
        errors.value.old_password = "Current password is required.";
        valid = false;
    }
    if (!formData.value.password) {
        errors.value.password = "New password is required.";
        valid = false;
    } else if (formData.value.password.length < 8) {
        errors.value.password = "New password must be at least 8 characters.";
        valid = false;
    }
    if (formData.value.password !== formData.value.password_confirmation) {
        errors.value.password_confirmation = "Passwords do not match.";
        valid = false;
    }

    return valid;
};

const changePassword = async () => {
    if (!validateForm()) return;

    isSubmitting.value = true;
    successMessage.value = "";

    try {
        const response = await maleListingStore.changePassword({
            old_password: formData.value.old_password,
            password: formData.value.password,
            password_confirmation: formData.value.password_confirmation
        });

        successMessage.value = response.success || "Password changed successfully!";
        formData.value = { old_password: "", password: "", password_confirmation: "" };
    } catch (error) {
        
        if (error.response && error.response.status === 422) {
            errors.value = { old_password: error.response.data.error };
        }
        console.log(errors.old_password);
    } finally {
        isSubmitting.value = false;
    }
};
</script>

<template>
    <div class="edit_section change-password">
        <form @submit.prevent="changePassword" class="form edit-form">
            <div v-if="successMessage" class="alert alert-success">{{ successMessage }}</div>

            <div class="row">
                <div class="col-lg-3">
                    <label class="form-label mb-0">Current password</label>
                </div>
                <div class="input-container col">
                    <input type="password" v-model="formData.old_password" class="form-control" placeholder="••••••••" />
                    <span class="invalid-feedback" v-if="errors.old_password">{{ errors.old_password }}</span>
                </div>
            </div>

            <div class="row">
                <div class="col-lg-3">
                    <label class="form-label mb-0">New password</label>
                </div>
                <div class="input-container col">
                    <input type="password" v-model="formData.password" class="form-control" required />
                    <span class="invalid-feedback" v-if="errors.password">{{ errors.password }}</span>
                </div>
            </div>

            <div class="row">
                <div class="col-lg-3">
                    <label class="form-label mb-0">Confirm new password</label>
                </div>
                <div class="input-container col">
                    <input type="password" v-model="formData.password_confirmation" class="form-control" required />
                    <span class="invalid-feedback" v-if="errors.password_confirmation">{{ errors.password_confirmation }}</span>
                </div>
            </div>

            <div class="d-flex gap-2 justify-content-end mt-4 button-group">
                <a class="back-btn" href="#">Cancel</a>
                <button type="submit" :disabled="isSubmitting" class="find-matches-btn">
                    {{ isSubmitting ? "Updating..." : "Save Changes" }}
                </button>
            </div>
        </form>
    </div>
</template>
<style>
.invalid-feedback{
    display:block;
}
</style>
