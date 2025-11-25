<template>
  <div class="max-w-4xl mx-auto mt-10 p-6 bg-red-100 shadow-xl rounded-lg">
    <h2 class="text-2xl font-semibold mb-6 text-gray-800">Marks List</h2>
    
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
              <template v-if="column.key === 'actions'">
                <button 
                  @click="viewStudent(student.id)" 
                  class="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-1 px-3 rounded text-xs transition duration-150"
                >
                  View
                </button>
              </template>
              <template v-if="column.key === 'id'">{{ student.id }}</template>
              <template v-if="column.key === 'name'">{{ student.name }}</template>
              <!-- <template v-if="column.key === 'english'">{{ student.subjects.english }}%</template> -->
              <template v-if="column.key === 'maths'">{{ student.subjects.Mathematics }}%</template>
              <template v-if="column.key === 'currentGPA'">{{ student.gpa }}</template>

              <!-- <template v-else>
                {{ student[column.key as keyof Student] }}
              </template> -->
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

interface Marks {
    id: number,
    name: string,
    subjects: {
      Mathematics: string
    },
    gpa: number
  }

const { data: students, pending, error } = await useFetch<Marks[]>('/api/Marks/report');

const columns = ref([
  { key: 'id', label: 'ID' },
  { key: 'name', label: 'Name' },
  { key: 'english', label: 'English' },
  { key: 'Mathematics', label: 'Maths' },
  { key: 'gpa', label: 'Current GPA' },
  { key: 'actions', label: 'Actions' },
])

const viewStudent = (studentId: number) => {
  navigateTo("../components/MarksDetails.vue");
}

const data = ref([
  { id: 1, name: "Alice Johnson", english: 23, maths: 12 , currentGPA: 3.8},
  { id: 2, name: "Bob Smith", english: 23, maths: 12 , currentGPA: 3.5},
  { id: 3, name: "Charlie Brown", english: 23, maths: 12 , currentGPA: 3.9},
])
</script>