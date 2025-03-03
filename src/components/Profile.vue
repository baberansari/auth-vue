<script setup>
defineProps({
  user: Object
});


</script>

<template>
  <div class="row">
    <div class="col-lg-3">
      <label for="aboutMe" class="form-label mb-0">Name</label>
    </div>
    <div class="input-container col">
      <div class="row">
        <div class="col-lg-6">
          <input 
            type="text" 
            class="form-control" 
            name="name" 
            v-model="user.name" 
            id="fullName" 
            placeholder="James Anderson" />
        </div>
        <div class="col-lg-6">
          <input 
            type="text" 
            class="form-control" 
            name="last_name" 
            id="lastName" 
            v-model="user.fname"
            placeholder="Last Name" />
        </div>
      </div>
    </div>
  </div>

  <br>
  
  <div class="row">
    <div class="col-lg-3">
      <label for="email" class="form-label mb-0">Email Address</label>
    </div>
    <div class="input-container col">
      <div class="email-with-icon">
        <i class="fa-regular fa-envelope"></i>
        <input 
          type="text" 
          class="form-control" 
          name="email" 
          v-model="user.email" 
          id="email" 
          placeholder="example@gmail.com" />
      </div>
    </div>
  </div>

  <br>

  <div class="row">
    <div class="col-lg-3">
      <label for="profilePhoto" class="form-label mb-0">Your Photo <i class="fa-regular fa-circle-question"></i></label>
      <p class="sub-label">This will be displayed on your profile.</p>
    </div>
    <div class="input-container image-upload-setting col">
      <img :src="user.profile_photo || 'default-image.jpg'" alt="Profile" class="upload-preview" id="profilePreview" />
      <div class="upload-container">
        <label for="fileUpload" class="d-block text-center">
          <i class="upload-icon bi bi-cloud-upload-fill"></i>
          <div class="upload-text">
            Click to upload <span>or drag and drop</span>
          </div>
          <small>SVG, PNG, JPG or GIF (max. 800×400px)</small>
        </label>
        <input type="file" id="fileUpload" name="image" accept="image/*" />
      </div>
    </div>
  </div>

  <br>

  <div class="row">
    <div class="col-lg-3">
      <label for="role" class="form-label mb-0">Role</label>
    </div>
    <div class="input-container col">
      <div class="row d-flex personal-info-form">
        <div class="col-lg-12">
          <label for="role" class="personal-label mb-0">Role</label>
        </div>
      </div>
    </div>
  </div>

  <div class="d-flex gap-2 justify-content-end mt-4 button-group">
    <a class="back-btn" href="">Cancel</a>
    <button type="submit" class="find-matches-btn">Save Changes</button>
  </div>
</template>
