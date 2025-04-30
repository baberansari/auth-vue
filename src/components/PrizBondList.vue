<script setup>
import NaveBar from './NaveBar.vue';
import { ref, computed, watch, defineProps } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const props = defineProps({
    response: {
        type: Array,
        required: true,
        default: () => []
    }
});

// Search Query State
const searchQuery = ref("");
const searchYear = ref(""); // New: Year Filter
const searchDate = ref(""); // New: Date Filter

// Pagination State
const currentPage = ref(1);
const itemsPerPage = 5;

// **Computed Property for Filtered Data (Search by bond number, year, date)**
const filteredData = computed(() => {
    return props.response.filter(candidate => {
        // const matchesBond = candidate.bond_number?.toLowerCase().includes(searchQuery.value.toLowerCase());
        const matchesYear = searchYear.value ? candidate.year === searchYear.value : true;
        const matchesDate = searchDate.value ? candidate.date === searchDate.value : true;
        return matchesYear && matchesDate;
        // return matchesBond && matchesYear && matchesDate;
    });
});

// **Watch for Search Changes & Reset Pagination**
watch([searchQuery, searchYear, searchDate], () => {
    currentPage.value = 1; // Reset to first page when any filter changes
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
        :title="'Bond List'" 
        description="View and analyze candidate profiles with detailed data." 
    /><br>
    
    <router-link :to="{ name: 'upload-list-bond' }" class="find-matches-btn">
        Upload List
    </router-link>

    <div class="recent-activities total-candidates active">
        <div class="header">
            <div>
                <h2>Upload Listing You </h2>
                <p>Keep track of matches.</p>
            </div>

            <!-- <div class="input-box">
                <input 
                    type="text" 
                    placeholder="Search by bond number" 
                    class="form-control search"
                    v-model="searchQuery"
                >
            </div> -->

            <div class="input-box">
                <input 
                    type="text" 
                    placeholder="Filter by year (e.g., 2024)" 
                    class="form-control search"
                    v-model="searchYear"
                >
            </div>

            <div class="input-box">
                <input 
                    type="date" 
                    placeholder="Filter by date" 
                    class="form-control search"
                    v-model="searchDate"
                >
            </div>
        </div>

        <table class="table data-table">
            <thead>
                <tr>
                    <th>Category</th>
                  
                    <th>Status</th>
                    <th>Year</th>
                    <th>Date</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in paginatedData" :key="item.id">
                    <td>{{ item.category_id }}</td>
                    <td>{{ item.status }}</td>
                    <td>{{ item.year }}</td>
                    <td>{{ item.date }}</td>
                    <td>
                        <router-link :to="`/edit-bond/${item.id}`" class="find-matches-btn">
                            Edit
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
