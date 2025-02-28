<script setup>
defineProps({
  title: String,
  totalCount: Number,
  svgs:String
});
</script>
<template>
          <div class="custom-card">
                <div class="svg-container"  v-html="svgs">
                   
                </div>

                <div class="card-body">
                    <h5 class="card-title">{{ title }}</h5>
                    <p class="card-text">{{ totalCount }}</p>
                </div>
            </div>
</template>