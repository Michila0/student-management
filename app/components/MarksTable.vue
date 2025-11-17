<template>
  <div class="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-xl rounded-lg">
    <h2 class="text-2xl font-semibold mb-6 text-gray-800">Student Mark List</h2>
    
    <div v-if="pending" class="text-center p-4 text-gray-500">
      <p>Loading student data...</p>
    </div>

    <div v-else-if="error" class="p-4 bg-red-100 border border-red-400 text-red-700 rounded">
      <p>Error fetching data: {{ error.message }}</p>
    </div>

    <div v-else-if="students && students.length > 0" class="overflow-x-auto border border-gray-200 rounded-lg">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th 
              v-for="column in columns" 
              :key="column.key"
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              {{ column.label }}
            </th>
          </tr>
        </thead>
        
        <tbody class="bg-white divide-y divide-gray-200">
          <tr 
            v-for="(student, index) in students" 
            :key="student.id"
            :class="{'bg-gray-50': index % 2 === 1}"
          >
            <td v-for="column in columns" :key="column.key" class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              {{ student[column.key as keyof Student] }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-else class="text-center p-6 text-gray-500 border-2 border-dashed border-gray-300 rounded">
      <p class="font-medium">No students found.</p>
      <p class="text-sm mt-1">Add a new student to populate the roster.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface Student {
  id: number
  name: string
  age: number
  classroom: string
  address: string
}

const { data: students, pending, error } = await useFetch<Student[]>('/api/student/');

const columns = ref([
  { key: 'id', label: 'ID' },
  { key: 'name', label: 'Name' },
  { key: 'age', label: 'Age' },
  { key: 'classroom', label: 'Classroom' },
  { key: 'address', label: 'Address' },
])
</script>