<script setup>
import { reactive, ref, onMounted } from 'vue';
import { useRouter } from "vue-router";
import { useMaleListingStore } from "@/stores";

const props = defineProps({
  user: Object,
});

const MaleListingStore = useMaleListingStore();
const router = useRouter();
const emit = defineEmits(["updateUser"]);

const formData = reactive({
  email: "",
  name: "",
  last_name: "",
});

const selectedFile = ref(null); // Store the selected image file

// Initialize formData with user data when component is mounted
onMounted(() => {
  setTimeout(() => {
    if (props.user) {
      formData.name = props.user.name || "";
      formData.last_name = props.user.fname || "";
      formData.email = props.user.email || "";
    }
  }, 500); // 5 seconds delay
});

// Handle file selection
const handleFileUpload = (event) => {
  selectedFile.value = event.target.files[0]; // Store the selected file
};

// Update user profile
const userUpdate = async () => {
  try {
    const data = new FormData();
    data.append("email", formData.email);
    data.append("last_name", formData.last_name);
    data.append("name", formData.name);
    
    if (selectedFile.value) {
      data.append("image", selectedFile.value);
    }

    const response = await MaleListingStore.userUpdate(data); // Send data to the API

    if (response && response.data.user) {
    location.reload();
    }
  } catch (error) {
    console.error("Update failed:", error);
  }
};
</script>

<template>
  <form @submit.prevent="userUpdate">
    <div class="row">
      <div class="col-lg-3">
        <label for="name" class="form-label mb-0">Name</label>
      </div>
      <div class="input-container col">
        <div class="row">
          <div class="col-lg-6">
            <input
              type="text"
              class="form-control"
              name="name"
              v-model="formData.name"
              id="fullName"
              placeholder="James Anderson"
              required
            />
          </div>
          <div class="col-lg-6">
            <input
              type="text"
              class="form-control"
              name="last_name"
              id="lastName"
              v-model="formData.last_name"
              placeholder="Last Name"
              required
            />
          </div>
        </div>
      </div>
    </div>

    <br />

    <div class="row">
      <div class="col-lg-3">
        <label for="email" class="form-label mb-0">Email Address</label>
      </div>
      <div class="input-container col">
        <div class="email-with-icon">
          <i class="fa-regular fa-envelope"></i>
          <input
            type="email"
            class="form-control"
            name="email"
            v-model="formData.email"
            id="email"
            placeholder="example@gmail.com"
            required
          />
        </div>
      </div>
    </div>

    <br />

    <div class="row">
      <div class="col-lg-3">
        <label for="profilePhoto" class="form-label mb-0">
          Your Photo <i class="fa-regular fa-circle-question"></i>
        </label>
        <p class="sub-label">This will be displayed on your profile.</p>
      </div>
      <div class="input-container image-upload-setting col">
        <img
          :src="props.user?.image ? 'http://myapi.test/' + props.user.image : 'default-image.jpg'"
          alt="Profile"
          class="upload-preview"
          id="profilePreview"
        />
        <div class="upload-container">
          <label for="fileUpload" class="d-block text-center">
            <i class="upload-icon bi bi-cloud-upload-fill"></i>
            <div class="upload-text">
              Click to upload <span>or drag and drop</span>
            </div>
            <small>SVG, PNG, JPG or GIF (max. 800×400px)</small>
          </label>
          <input type="file" id="fileUpload" name="image" accept="image/*" @change="handleFileUpload" />
        </div>
      </div>
    </div>

    <br />
    <div class="d-flex gap-2 justify-content-end mt-4 button-group">
      <a class="back-btn" href="#">Cancel</a>
      <button type="submit" class="find-matches-btn">Save Changes</button>
    </div>
  </form>
</template>
