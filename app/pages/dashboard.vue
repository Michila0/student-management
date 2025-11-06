<template>
    <UCard class="h-full bg-gray-800">
        <template #header>
            <UButton color="info" @click="getStudent">Refresh</UButton>
        </template>

        <UCard class="max-w-md mx-auto mt-10 p-6 bg-white shadow-xl rounded-lg">
              <div class="m-5 grid grid-cols-4 gap-4">
            <UCard v-for="item in studentCount" :class="item.class">
              <template #header>
                <div class="w-full text-center text-2xl font-semibold text-black">All Student</div>
              </template>
              <div class="text-black text-5xl text-semibold w-full text-center">{{ item.id[0] }}</div>
            </UCard>
          </div>
        </UCard>
    </UCard>
    
    
</template>


<script setup lang="ts">
const studentCount = ref([]);

// const getDashboardData = async () => {
//     const response = await $fetch('/api/student/count');
//     console.log(response);
    
//     studentCount.value = response;
// }

const getStudent = async () => {
    try {
    const response = await $fetch('/api/student/', {
        method: 'GET',
    });
    console.log(response);
    } catch (error) {
        console.error('Error fetching students:', error);
    }
}
</script>