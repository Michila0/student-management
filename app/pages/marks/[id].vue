<template>
  <div class="max-w-xl mx-auto mt-10 p-8 bg-white shadow-2xl rounded-xl">
    <NuxtLink to="/marks" class="text-blue-600 hover:text-blue-800 text-sm mb-4 inline-block">
      &larr; Back to Marks List
    </NuxtLink>
    
    <h2 class="text-3xl font-bold mb-6 text-gray-900">
      Marks Details for Student ID: {{ studentId }}
    </h2>
    
    <div v-if="pending" class="text-center p-6 text-gray-500">
      <p>Loading specific student marks...</p>
    </div>

    <div v-else-if="error" class="p-4 bg-red-100 border border-red-400 text-red-700 rounded">
      <p>Error fetching marks: {{ error.message }}</p>
    </div>

    <div v-else-if="marks && marks.length > 0">
      <div v-for="item in marks" :key="item.subject" class="flex justify-between items-center py-3 border-b">
        <p class="text-lg font-medium text-gray-700">{{ item.subject }}</p>
        <p class="text-xl font-bold" :class="getMarkColor(item.mark)">{{ item.mark }}</p>
      </div>
    </div>
    
    <div v-else class="text-center p-6 text-gray-500 border-2 border-dashed border-gray-300 rounded mt-4">
      <p class="font-medium">No marks data found for this student.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
// Define the expected structure for the marks API response
interface MarkItem {
  subject: string,
  mark: string // e.g., "20%"
}

// Access the route parameters to get the student ID
const route = useRoute();
const studentId = route.params.id as string; 

// Fetch the marks data using the dynamic ID in the API URL
const { data: marks, pending, error } = await useFetch<MarkItem[]>(`/api/Students/${studentId}/marks`);

// Simple utility to color the mark based on a percentage value (optional)
const getMarkColor = (mark: string) => {
    // Extract number from "20%"
    const markValue = parseInt(mark.replace('%', ''));
    
    if (markValue >= 70) return 'text-green-600';
    if (markValue >= 50) return 'text-yellow-600';
    return 'text-red-600';
};
</script>