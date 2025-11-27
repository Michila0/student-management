<!-- <template>
  <div class="max-w-md mx-auto mt-10 p-6 bg-white shadow-xl rounded-lg">
    <h2 class="text-2xl font-semibold mb-6 text-gray-800">Add Mark Student</h2>
    
    <form @submit.prevent="submitMark" class="space-y-4">
      
      <div>
        <label for="student" class="block text-sm font-medium text-gray-700">Name</label>
        <select 
          v-model.number="form.studentId"
          id="student"
          required
          class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        >
        <option :value="0" disabled>Select a student</option>
        <option v-for="student in students" :key="student.id" :value="student.id">{{ student.name }}(ID: {{ student.id }})</option>
    </select>  
      </div>

      <div>
        <label for="subject" class="block text-sm font-medium text-gray-700">Subject</label>
        <select 
        v-model.number="form.subjectId"
        id="subject"
        required
        min="1"
        class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        >
            <option :value="0" disabled>Select a subject</option>
            <option v-for="subject in subjects" :value="subject.id" :key="subject.id">{{ subject.name }}</option>

        </select>
      </div>

      <div>
        <label for="marks" class="block text-sm font-medium text-gray-700">Marks</label>
        <input 
          v-model.number="form.mark"
          id="marks"
          type="number"
          max="100"
          min="0"
          required
          class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <button
        type="submit"
        :disabled="loading"
        class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
      >
        {{ loading ? 'Saving...' : 'Add Marks' }}
      </button>

      <p v-if="successMessage" class="text-sm text-green-600 mt-3 p-2 bg-green-100 border border-green-300 rounded">{{ successMessage }}</p>
      <p v-if="errorMessage" class="text-sm text-red-600 mt-3 p-2 bg-red-100 border border-red-300 rounded">{{ errorMessage }}</p>

    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface MarkData {
  studentId: number,
  subjectId: number,
  mark: number
}

interface Student {
  id: number,
  name: string
}

interface Subject {
  id: number,
  name: string
}

const form = ref<MarkData>({
  studentId: 0,
  subjectId: 0,
  mark: 0,
})

const loading = ref(false)
const successMessage = ref('')
const errorMessage = ref('')

const students = ref<Student[]>(await $fetch<Student[]>('/api/Students'))
const { data: subjects } = await useFetch<Subject[]>('/api/Subjects')


const submitMark = async () => {
  successMessage.value = ''
  errorMessage.value = ''
  
  if (form.value.studentId === 0|| form.value.subjectId === 0 || form.value.mark === undefined) {
    errorMessage.value = 'Please fill out all fields.'
    return
  }

  loading.value = true
  
  try {

    const payload = {
      studentId: form.value.studentId,
      subjectId: form.value.subjectId,
      mark: form.value.mark,
    };

    const mark = await $fetch<MarkData>('/api/Marks', {
      method: 'POST',
      body: payload,
    })

    if (!mark) {
      errorMessage.value = 'Failed to create mark: no response from server.'
    } else {
      successMessage.value = `Student ${mark.studentId} created successfully with Subject ID: ${mark.subjectId}`
      form.value = { studentId: 0, subjectId: 0, mark: 0 }
    }

  } catch (err: any) {
    console.error('API call error:', err)
    if (err?.data) {
      const e = err.data
      errorMessage.value = e.message || e.statusMessage || 'Failed to create mark.'
    } else {
      errorMessage.value = err?.message || 'An unexpected error occurred during the request.'
    }
  } finally {
    loading.value = false
  }
}
</script> -->


<template>
  <div class="mx-auto mt-10 p-6 bg-white shadow-xl rounded-lg">
    <h2 class="text-2xl font-semibold mb-6 text-gray-800">Add Mark Student</h2>
    
    <form @submit.prevent="submitMark" class="space-y-4">
      
      <!-- Student Dropdown -->
      <div>
        <label for="student" class="block text-sm font-medium text-gray-700">Name</label>
        <select 
          v-model.number="form.studentId"
          id="student"
          required
          class="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        >
          <option :value="0" disabled>Select a student</option>
          <option v-for="student in students" :key="student.id" :value="student.id">
            {{ student.name }} (ID: {{ student.id }})
          </option>
        </select>
      </div>

      <!-- Subject Dropdown -->
      <div>
        <label for="subject" class="block text-sm font-medium text-gray-700">Subject</label>
        <select 
          v-model.number="form.subjectId"
          id="subject"
          required
          class="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        >
          <option :value="0" disabled>Select a subject</option>
          <option v-for="subject in subjects" :value="subject.id" :key="subject.id">
            {{ subject.name }}
          </option>
        </select>
      </div>

      <!-- Marks Input -->
      <div>
        <label for="marks" class="block text-sm font-medium text-gray-700">Marks</label>
        <input 
          v-model.number="form.mark"
          id="marks"
          type="number"
          max="100"
          min="0"
          required
          class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <button
        type="submit"
        :disabled="loading"
        class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
      >
        {{ loading ? 'Saving...' : 'Add Marks' }}
      </button>

      <p v-if="successMessage" class="text-sm text-green-600 mt-3 p-2 bg-green-100 border border-green-300 rounded">{{ successMessage }}</p>
      
      <!-- Improved Error Display -->
      <div v-if="errorMessage" class="text-sm text-red-600 mt-3 p-2 bg-red-100 border border-red-300 rounded">
         <p class="font-bold">Bad Request (400) Details:</p>
         <p>{{ errorMessage }}</p>
      </div>

    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface MarkData {
  studentId: number
  subjectId: number
  mark: number | null // Mark can be null if input is cleared
}

interface Student {
  id: number
  name: string
}

interface Subject {
  id: number
  name: string
}

const form = ref<MarkData>({
  studentId: 0,
  subjectId: 0,
  mark: 0,
})

const loading = ref(false)
const successMessage = ref('')
const errorMessage = ref('')

// Standard Nuxt way for initial setup fetching
const { data: students } = await useFetch<Student[]>('/api/Students')
const { data: subjects } = await useFetch<Subject[]>('/api/Subjects')


const submitMark = async () => {
  successMessage.value = ''
  errorMessage.value = ''
  
  // Refined Validation: Check for invalid IDs or explicitly missing/null mark
  if (
    form.value.studentId === 0 || 
    form.value.subjectId === 0 || 
    form.value.mark === null || 
    form.value.mark === undefined
  ) {
    errorMessage.value = 'Please select a student and subject, and provide a valid mark.'
    return
  }
  
  // Ensure mark is actually a number before sending, even if 0
  if (typeof form.value.mark !== 'number' && form.value.mark !== 0) {
     errorMessage.value = 'Mark must be a numeric value.'
     return
  }

  loading.value = true
  
  try {
    // FIX: Send a clean object to the API to avoid sending Vue's reactive proxy data
    const payload = {
      studentId: form.value.studentId,
      subjectId: form.value.subjectId,
      mark: form.value.mark,
    };
    
    const mark = await $fetch<MarkData>('/api/Marks', {
      method: 'POST',
      body: payload,
    })

    successMessage.value = `Mark added successfully for Student ID: ${mark.studentId}`
    form.value = { studentId: 0, subjectId: 0, mark: 0 }

  } catch (err: any) {
    console.error('API call error:', err)
    
    // Attempt to extract the detailed server validation message from the error response body
    let serverDetails = 'Could not get specific error from server response body.'
    
    if (err.data) {
        if (typeof err.data === 'string') {
          serverDetails = err.data;
        } else if (err.data.message) {
          serverDetails = err.data.message; // Common for NestJS/Express errors
        } else if (err.data.errors) {
          // Handle validation dictionaries (e.g., ASP.NET Core)
          serverDetails = Object.values(err.data.errors).flat().join('; ');
        } else if (err.data.title) {
          serverDetails = err.data.title; // Common for Problem Details 400 errors
        }
    }
    
    // Use the specific server details if available, otherwise fall back to generic message
    errorMessage.value = serverDetails;
    
  } finally {
    loading.value = false
  }
}
</script>