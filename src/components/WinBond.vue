<script setup>
import NaveBar from './NaveBar.vue';
import { ref, computed, watch, defineProps } from 'vue';
import { useRoute, useRouter } from 'vue-router';
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

// Pagination State
const currentPage = ref(1);
const itemsPerPage = 5;

// **Computed Property for Filtered Data (Search by Name)**
const filteredData = computed(() => {
    return props.response.filter(candidate =>
        candidate.bonds.bond_number.toLowerCase().includes(searchQuery.value.toLowerCase())
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
        :title="'Win Bond'" 
        description="View and analyze candidate profiles with detailed data." 
    /><br>
    <router-link :to="{ name: 'add-bond' }" class="find-matches-btn">
                            Add New Bond</router-link>
    <div class="recent-activities total-candidates active">
        <div class="header">
            <div>
                <h2>Total Bonds You have to Win</h2>
                <p>Keep track of matches.</p>
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
                    <th>Category</th>
                    <th>Number</th>
                    <th>Status</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in paginatedData" :key="item.id">
                    <td> {{ item.bonds?.category?.amount }}</td>
                    <td> {{ item.bonds?.bond_number }}</td>
                    <td>
                        {{ item.status }}
                    </td>
                    <td>
                      ---
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
