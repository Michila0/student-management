<template>
  <div class="max-w-2xl mx-auto mt-10 p-6">
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-2xl font-semibold text-gray-800">Student Details</h2>
      <button 
        @click="goBack" 
        class="text-gray-600 hover:text-gray-900 font-medium flex items-center gap-1"
      >
        ← Back to List
      </button>
    </div>

    <div v-if="pending" class="text-center p-8 bg-white shadow rounded-lg text-gray-500">
      <p>Loading student profile...</p>
    </div>

    <div v-else-if="error" class="p-4 bg-red-100 border border-red-400 text-red-700 rounded shadow">
      <p>Error fetching student: {{ error.message }}</p>
    </div>

    <div v-else-if="student" class="bg-white shadow-xl rounded-lg overflow-hidden border border-gray-200">
      
      <div class="bg-red-100 p-6 flex items-center gap-4">
        <div class="h-16 w-16 bg-red-300 rounded-full flex items-center justify-center text-2xl font-bold text-white">
          {{ student.name.charAt(0) }}
        </div>
        <div>
          <h1 class="text-2xl font-bold text-gray-900">{{ student.name }}</h1>
          <p class="text-gray-600">{{ student.email }}</p>
        </div>
      </div>

      <div class="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        
        <div class="bg-gray-50 p-4 rounded border border-gray-100">
          <p class="text-xs font-bold text-gray-400 uppercase tracking-wide">Student ID</p>
          <p class="text-lg font-medium text-gray-800">#{{ student.id }}</p>
        </div>

        <div class="bg-gray-50 p-4 rounded border border-gray-100">
          <p class="text-xs font-bold text-gray-400 uppercase tracking-wide">Current Grade</p>
          <p class="text-lg font-medium text-gray-800">{{ student.grade }}</p>
        </div>

        <div class="bg-gray-50 p-4 rounded border border-gray-100 col-span-1 md:col-span-2">
          <div class="flex justify-between items-center">
            <div>
                <p class="text-xs font-bold text-gray-400 uppercase tracking-wide">Current GPA</p>
                <p class="text-3xl font-bold text-blue-600 mt-1">{{ student.currentGPA.toFixed(1) }}</p>
            </div>
             <div class="h-12 w-12 rounded-full border-4 flex items-center justify-center font-bold text-xs"
                :class="getGpaColor(student.currentGPA)">
                GPA
             </div>
          </div>
        </div>

      </div>
    </div>

    <div v-else class="text-center p-6 text-gray-500">
      Student not found.
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute();
const router = useRouter();

// Interface matching your image data
interface Student {
  id: number
  name: string
  email: string
  currentGPA: number
  grade: string
}

// Fetch specific student based on URL ID (e.g. /api/student/2)
const { data: student, pending, error } = await useFetch<Student>(`/api/student/${route.params.id}`);

const goBack = () => {
  router.push('/students'); // Or wherever your list page is located
}

// Helper to color code the GPA circle
const getGpaColor = (gpa: number) => {
    if (gpa >= 3.5) return 'border-green-500 text-green-600 bg-green-50';
    if (gpa >= 2.5) return 'border-yellow-500 text-yellow-600 bg-yellow-50';
    return 'border-red-500 text-red-600 bg-red-50';
}
</script>