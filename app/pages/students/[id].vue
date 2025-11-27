<template>
  <div class="max-w-3xl mx-auto mt-10 p-6">
    
    <button @click="$router.back()" class="mb-6 text-gray-600 hover:text-blue-600 flex items-center gap-2">
      <span>←</span> Back to List
    </button>

    <div v-if="pending" class="text-center p-10 bg-white rounded shadow">
      <p class="text-gray-500">Loading student #{{ route.params.id }}...</p>
    </div>

    <div v-else-if="error" class="p-4 bg-red-100 border border-red-400 text-red-700 rounded mb-4">
      <h3 class="font-bold">Error Loading Data</h3>
      <p>{{ error.message }}</p>
      <p class="text-xs mt-2">Check Network Tab (F12) to see if it is a 404 or 500 error.</p>
    </div>

    <div v-else-if="student" class="bg-white shadow-xl rounded-lg overflow-hidden border border-gray-200">
      
      <div class="bg-blue-600 p-6 text-white">
        <h1 class="text-3xl font-bold">{{ student.name }}</h1>
        <p class="opacity-80">ID: {{ student.id }}</p>
      </div>

      <div class="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        
        <div class="bg-gray-50 p-4 rounded border">
          <label class="text-xs font-bold text-gray-500 uppercase">Email</label>
          <p class="text-lg text-gray-900">{{ student.email }}</p>
        </div>

        <div class="bg-gray-50 p-4 rounded border">
          <label class="text-xs font-bold text-gray-500 uppercase">Current GPA</label>
          <p class="text-lg font-bold text-blue-600">{{ student.currentGPA }}</p>
        </div>

        <div class="bg-gray-50 p-4 rounded border">
          <label class="text-xs font-bold text-gray-500 uppercase">Grade</label>
          <p class="text-lg font-bold text-green-600">{{ student.grade }}</p>
        </div>

      </div>

      <!-- <div class="bg-gray-900 p-4 text-xs font-mono text-green-400 overflow-x-auto border-t border-gray-700">
        <p class="text-gray-500 mb-2 uppercase font-bold">Raw JSON Response:</p>
        <pre>{{ student }}</pre>
      </div> -->
    </div>

    <div v-else class="text-center p-10 text-gray-500 bg-white rounded shadow">
      Student data is empty or ID not found.
    </div>

  </div>
</template>

<script setup lang="ts">
const route = useRoute();

interface Student {
  id: number
  name: string
  email: string
  currentGPA: number
  grade: string
}

// Ensure this matches your confirmed endpoint: /api/Students/{id}
const { data: student, pending, error } = await useFetch<Student>(`/api/Students/${route.params.id}`);
</script>