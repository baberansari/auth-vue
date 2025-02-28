<script setup>
import NaveBar from './NaveBar.vue';
import { ref, computed, watch, defineProps } from 'vue';

const props = defineProps({
    response: {
        type: Array,
        required: true,
        default: () => []
    }
});

// Search Query State
const searchQuery = ref("");

// Function to get marital status label
const getMaritalStatus = (status) => {
    const statuses = {
        0: "Single",
        1: "Married",
        2: "Divorced",
    };
    return statuses[status] || "Unknown";
};

// Pagination State
const currentPage = ref(1);
const itemsPerPage = 5;

// **Computed Property for Filtered Data (Search by Name)**
const filteredData = computed(() => {
    return props.response.filter(candidate =>
        candidate.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
});

// **Watch for Search Changes & Reset Pagination**
watch(searchQuery, () => {
    currentPage.value = 1; // Reset to first page when search query changes
});

// **Computed Property for Paginated Data**
const paginatedData = computed(() => {
    if (!filteredData.value.length) return [];
    const start = (currentPage.value - 1) * itemsPerPage;
    return filteredData.value.slice(start, start + itemsPerPage);
});

// **Total Pages Computed Property**
const totalPages = computed(() => Math.ceil(filteredData.value.length / itemsPerPage));

// **Pagination Controls**
const nextPage = () => {
    if (currentPage.value < totalPages.value) {
        currentPage.value++;
    }
};

const prevPage = () => {
    if (currentPage.value > 1) {
        currentPage.value--;
    }
};
</script>

<template>
    <NaveBar 
        title="Male Candidate" 
        description="View and analyze candidate profiles with detailed data." 
    />

    <div class="recent-activities total-candidates active">
        <div class="header">
            <div>
                <h2>Total Candidates</h2>
                <p>Keep track of candidates and their matches.</p>
            </div>
            <div class="input-box">
                <img src="" alt="">
                <input 
                    type="text" 
                    placeholder="Search by name" 
                    class="form-control search"
                    v-model="searchQuery"
                >
            </div>
        </div>

        <table class="table data-table">
            <thead>
                <tr>
                    <th>Full Name</th>
                    <th>Age</th>
                    <th>Gender</th>
                    <th>Location</th>
                    <th>Marital Status</th>
                    <th>User Id</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in paginatedData" :key="item.id">
                    <td><p>Full Name</p> {{ item.name }}</td>
                    <td><p>Age</p> {{ item.age }}</td>
                    <td><p>Gender</p> {{ item.gender === 0 ? 'Male' : 'Female' }}</td>
                    <td><p>Location</p> {{ item.countries ? item.countries.name : 'Unknown' }}</td>
                    <td><p>Status</p> {{ getMaritalStatus(item.marital_status) }}</td>
                    <td><p>Id</p> {{ item.id }}</td>
                    <td>
                        <router-link :to="`/candidates/${item.id}`" class="find-matches-btn">
                            View
                        </router-link>
                    </td>
                </tr>
            </tbody>
        </table>

        <!-- Pagination Controls -->
        <div class="table-pagination">
            <button @click="prevPage" :disabled="currentPage === 1">Previous</button>
            <span> Page {{ currentPage }} of {{ totalPages }} </span>
            <button @click="nextPage" :disabled="currentPage === totalPages">Next</button>
        </div>
    </div>
</template>
