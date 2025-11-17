<template>

    <div class="flex justify-center">
            <StudentTable/>
    </div>
</template>

<script setup lang="ts">
import StudentForm from '~/components/StudentForm.vue';

const data = ref([
  { id: 1, name: "Alice Johnson", age: 15, grade: "10A", address: "45 Oak St" },
  { id: 2, name: "Bob Smith", age: 14, grade: "9B", address: "10 Pine Rd" },
  { id: 3, name: "Charlie Brown", age: 16, grade: "10B", address: "77 Elm Ave" },
])
</script>