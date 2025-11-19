<template>
  <div class="justify-end flex m-5">
    <UButton color="info" icon="icon-circle-plus" to="addStudentForm">Add Student</UButton>
  </div>

  <div class="flex justify-center">
    <StudentTable/>
  </div>
</template>

<script setup lang="ts">
import StudentForm from '~/components/StudentForm.vue';

const data = ref([
  { id: 1, name: "Alice Johnson", email: "alice.johnson@example.com", currentGPA: 3.8, grade: "10A"},
  { id: 2, name: "Bob Smith", email: "bob.smith@example.com", currentGPA: 3.5, grade: "9B"},
  { id: 3, name: "Charlie Brown", email: "charlie.brown@example.com", currentGPA: 3.9, grade: "10B"},
])
</script>