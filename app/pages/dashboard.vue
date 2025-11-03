<template>
    <navbar/>
    
    <StudentForm/>
    
    <UCard class="flex justify-center">
        <template #header>
            <p>Student List</p>
        </template>
        <template #default>
            <table>
              <thead>
                <tr>
                  <th>id</th>
                  <th>name</th>
                  <th>age</th>
                  <th>classroom</th>
                  <th>address</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="student in data" :key="student.id">
                  <td>{{ student.id }}</td>
                  <td>{{ student.name }}</td>
                  <td>{{ student.age }}</td>
                  <td>{{ student.classroom }}</td>
                  <td>{{ student.address }}</td>
                </tr>
              </tbody>
            </table>
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