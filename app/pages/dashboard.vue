<!-- <template>
    <UCard class="h-full bg-gray-800">
        <template #header>
            <UButton color="info" @click="getStudent">Refresh</UButton>
        </template>

        <UCard class="max-w-md mx-auto mt-10 p-6 bg-white shadow-xl rounded-lg">
              <div class="m-5 grid grid-cols-4 gap-4">
            <UCard v-for="item in studentCount" :class="item.class">
              <template #header>
                <div class="w-full text-center text-2xl font-semibold text-black">All Student</div>
              </template>
              <div class="text-black text-5xl text-semibold w-full text-center">{{ item.id.reverse([0]) }}</div>
            </UCard>
          </div>
        </UCard>
    </UCard>
    
    
</template>


<script setup lang="ts">
const studentCount = ref([]);

const getStudent = async () => {
    try {
    const response = await $fetch('/api/student/', {
        method: 'GET',
    });
    console.log(response);
    } catch (error) {
        console.error('Error fetching students:', error);
    }
}
</script> -->


<template>
  <UCard class="h-full bg-gray-800">
    <template #header>
      <UButton color="info" @click="getStudent">Refresh</UButton>
    </template>

    <div class="m-5">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <UCard v-for="metric in studentMetrics" :key="metric.title" :class="metric.class">
          <template #header>
            <div class="w-full text-center text-xl font-semibold text-black">
              {{ metric.title }}
            </div>
          </template>
          <div class="text-black text-5xl font-semibold w-full text-center">
            {{ metric.count }}
          </div>
        </UCard>
      </div>
    </div>

  </UCard>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
// Define a reactive variable to hold the metrics data
const studentMetrics = ref([
  { title: 'Total Students', count: 0, class: 'bg-blue-200' },
]);

// Define the type for the expected API response (adjust this if your student objects are different)
interface Student {
  id: number;
  name: string;
  // ... other student properties
}

const getStudent = async () => {
  try {
    // 1. Fetch the data
    const response = await $fetch<Student[]>('/api/student/', { // Use type casting for better safety
      method: 'GET',
    });
    
    // Check if the response is an array before processing
    if (Array.isArray(response)) {
      // 2. Calculate the total count
      const totalCount = response.length;

      // 3. Update the reactive metric state
      studentMetrics.value = [
        { title: 'Total Students', count: totalCount, class: 'bg-blue-200' },
      ];
      console.log('Fetched students count:', totalCount);
    } else {
      console.error('API response was not an array:', response);
    }
  } catch (error) {
    console.error('Error fetching students:', error);
    // Optionally set the count to 0 or display an error message
    studentMetrics.value = [
      { title: 'Total Students', count: 'Error', class: 'bg-red-200' },
    ];
  }
}

// 4. Fetch the data when the component is mounted
onMounted(() => {
  getStudent();
});
</script>