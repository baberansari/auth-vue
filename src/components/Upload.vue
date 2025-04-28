<script setup>
import { reactive, ref, onMounted } from 'vue';
import { useBondStore } from "@/stores";
import { useRoute } from 'vue-router';

const route = useRoute();
const bondStore = useBondStore();

const formData = reactive({
  category_id: '',
  bond_file: null,
  date: '',  // ✅ added date field
  year: '',  // ✅ added year field
});

const successMessage = ref("");
const errors = ref("");
const category = ref([]);

// Submit Function
const uploadBondList = async () => {
  try {
    successMessage.value = "";
    errors.value = "";

    const data = new FormData();
    const bondId = route.params.id;

    data.append("category_id", formData.category_id);
    data.append("date", formData.date);  // ✅ append date
    data.append("year", formData.year);  // ✅ append year
    if (formData.bond_file) {
      data.append("bond_file", formData.bond_file);
    }

    const response = await bondStore.uploadList(data);

    if (response && response.data) {
      successMessage.value = response.data.message || "Bond Updated Successfully!";
      setTimeout(() => {
        // location.reload();
      }, 2000);
    } else {
      console.error("Unexpected response:", response);
    }
  } catch (error) {
    errors.value = error.message;
  }
};

const bondCategory = async () => {
  try {
    const response = await bondStore.category();
    category.value = response.data.data;
  } catch (error) {
    console.error(error);
  }
};

const loadData = async () => {
  await bondCategory();
};

onMounted(() => {
  loadData();
});

// handle file input
const handleFileChange = (e) => {
  const file = e.target.files[0];
  formData.bond_file = file;
};
</script>

<template>
   
  <br>
  <form @submit.prevent="uploadBondList" enctype="multipart/form-data">
    <div v-if="successMessage" class="alert alert-success">{{ successMessage }}</div>
    <span class="invalid-feedback" v-if="errors">{{ errors }}</span>

    <div class="card">
      <div class="card-body">
        <br>
        <div class="col-md-12">
          <div class="row">
            <div class="input-container col">
              <div class="row">
                <div class="col-lg-3">
                  <label>Category</label>
                </div>
                <div class="col-lg-3">
                  <label>Bond File</label>
                </div>
                <div class="col-lg-3">
                  <label>Date</label> <!-- ✅ new field label -->
                </div>
                <div class="col-lg-3">
                  <label>Year</label> <!-- ✅ new field label -->
                </div>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="input-container col">
              <div class="row">
                <div class="col-lg-3">
                  <select
                    name="category_id"
                    class="form-control"
                    v-model="formData.category_id"
                    required
                  >
                    <option v-for="(item, index) in category" :key="index" :value="item.id">
                      {{ item.amount }}
                    </option>
                  </select>
                </div>

                <div class="col-lg-3">
                  <input
                    type="file"
                    class="form-control"
                    name="bond_file"
                    id="bond_file"
                    @change="handleFileChange"
                    required
                  />
                </div>

                <div class="col-lg-3">
                  <input
                    type="date"
                    class="form-control"
                    name="date"
                    v-model="formData.date"
                    required
                  />
                </div>

                <div class="col-lg-3">
                  <input
                    type="text"
                    class="form-control"
                    name="year"
                    v-model="formData.year"
                    placeholder="Enter Year (e.g., 2024)"
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          <br />

          <div class="d-flex gap-2 justify-content-end mt-4 button-group">
            <a class="back-btn" href="#">Cancel</a>
            <button type="submit" class="find-matches-btn">Update Bond</button>
          </div>

        </div>
      </div>
    </div>
  </form>
</template>

<style>
.invalid-feedback {
  display: block;
}
</style>
