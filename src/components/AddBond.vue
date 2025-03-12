<script setup>
import { reactive } from "vue";
import { useBondStore } from "@/stores";
import { ref ,onMounted} from 'vue';
const props = defineProps({
  user: Object,
});

const bondStore = useBondStore();
const formData = reactive({
  category_id: "",
  bond_number: "",
});
const successMessage = ref("");
const errors = ref("");
const category = ref([]); 
// Submit Function
const addBondUpdate = async () => {
  try {
    successMessage.value = "";
    errors.value ="";
    const data = new FormData();
    data.append("category_id", formData.category_id);
    data.append("bond_number", formData.bond_number);

    const response = await bondStore.addBond(data); // Send data to the API

    if (response && response.data) {
        successMessage.value = response.data.message || "Bond Added Successfully!";
        setTimeout(() => {
        location.reload();
      }, 2000);
    } else {
       
      console.error("Unexpected response:", response);
    }
  } catch (error) {
    errors.value = error.message;
    // console.error("Update failed:", error);
  }
};
const bondCategory = async () => {
    try {
        const response = await bondStore.category();
        console.log(response.data.data);
        category.value = response.data.data;

    } catch (error) {
        
    }

};
onMounted(bondCategory);
</script>

<template>
    <br>
  <form @submit.prevent="addBondUpdate">
    <div v-if="successMessage" class="alert alert-success">{{ successMessage }}</div>
    <span class="invalid-feedback" v-if="errors">{{ errors }}</span>
    <div class="card">
      <div class="card-body">
        <br>
        <div class="col-md-12">
            <div class="row">
                <div class="input-container col">
                    <div class="row">
                        <div class="col-lg-6">
                            <label for="">Category</label>
                        </div>
                        <div class="col-lg-6">
                            <label for="">Bond Number</label>
                        </div>
                    </div>
                   

                </div>
            </div>
          <div class="row">
            <div class="input-container col">
              <div class="row">
                <div class="col-lg-6">
                  <select
                    name="category_id"
                    class="form-control"
                    v-model="formData.category_id"
                  >
                  <option v-for="(item, index) in category" :key="index" :value="item.id">
    {{ item.amount }}
  </option>
                  </select>
                </div>
                <div class="col-lg-6">
                  <input
                    type="text"
                    class="form-control"
                    name="bond_number"
                    id="bond_number"
                    v-model="formData.bond_number"
                    placeholder="Enter bond number"
                    required
                  />
                </div>
              </div>
            </div>
          </div>
          <br />
          <div class="d-flex gap-2 justify-content-end mt-4 button-group">
            <a class="back-btn" href="#">Cancel</a>
            <button type="submit" class="find-matches-btn">Add Bond</button>
          </div>
        </div>
      </div>
    </div>
  </form>
</template>
<style>
.invalid-feedback{
    display:block;
}
</style>