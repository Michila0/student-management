<template>
    <StudentForm/>

    <UCard class="flex justify-center">
        <template #default>
            <StudentTable/>
        </template>
    </UCard>
</template>

<script setup lang="ts">
import StudentForm from '~/components/StudentForm.vue';

const data = ref([
  { id: 1, name: "Alice Johnson", age: 15, classroom: "10A", address: "45 Oak St" },
  { id: 2, name: "Bob Smith", age: 14, classroom: "9B", address: "10 Pine Rd" },
  { id: 3, name: "Charlie Brown", age: 16, classroom: "10B", address: "77 Elm Ave" },
])
</script>