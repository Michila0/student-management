<template>
  <div class="max-w-md mx-auto mt-10 p-6 bg-white shadow-xl rounded-lg">
    <h2 class="text-2xl font-semibold mb-6 text-gray-800">Add New Student</h2>
    
    <form @submit.prevent="createStudent" class="space-y-4">
      
      <div>
        <label for="name" class="block text-sm font-medium text-gray-700">Name</label>
        <input 
          v-model="form.name"
          id="name"
          type="text"
          required
          class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div>
        <label for="age" class="block text-sm font-medium text-gray-700">Age</label>
        <input 
          v-model.number="form.age"
          id="age"
          type="number"
          required
          min="1"
          class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div>
        <label for="classroom" class="block text-sm font-medium text-gray-700">Classroom</label>
        <input 
          v-model.number="form.classroom"
          id="classroom"
          type="text"
          required
          class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div>
        <label for="address" class="block text-sm font-medium text-gray-700">Address</label>
        <input 
          v-model.number="form.address"
          id="address"
          type="text"
          required
          min="1"
          class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <button 
        type="submit"
        :disabled="loading"
        class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
      >
        {{ loading ? 'Saving...' : 'Create Student' }}
      </button>

      <p v-if="successMessage" class="text-sm text-green-600 mt-3 p-2 bg-green-100 border border-green-300 rounded">{{ successMessage }}</p>
      <p v-if="errorMessage" class="text-sm text-red-600 mt-3 p-2 bg-red-100 border border-red-300 rounded">{{ errorMessage }}</p>

    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface StudentData {
  name: string
  age: number | null
}

const form = ref<StudentData>({
  name: '',
  age: null,
})

const loading = ref(false)
const successMessage = ref('')
const errorMessage = ref('')


interface StudentResponse {
  id: number
  name: string
}

const createStudent = async () => {
  successMessage.value = ''
  errorMessage.value = ''
  
  if (!form.value.name || !form.value.age) {
    errorMessage.value = 'Please fill out both the Name and Age fields.'
    return
  }

  loading.value = true
  
  try {
    const { data: student, error } = await useFetch<StudentResponse>('/api/student/', {
      method: 'POST',
      body: form.value,
    })

    if (error.value) {
      // error.value may not be strongly typed; cast to any for accessing status properties
      const e: any = error.value
      errorMessage.value = e.statusMessage || `Failed to create student. Status: ${e.statusCode}`
    } else if (student.value) {
      successMessage.value = `Student ${student.value.name} created successfully with ID: ${student.value.id}`
      
      form.value = { name: '', age: null }
    }

  } catch (err) {
    console.error('API call error:', err)
    errorMessage.value = 'An unexpected error occurred during the request.'
  } finally {
    loading.value = false
  }
}
</script>