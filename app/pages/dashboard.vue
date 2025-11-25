<template>
  <UCard class="h-full bg-gray-800">
    <!-- <div class="justify-end flex">
      <UButton color="info" icon="icon-circle-plus" to="/addStudentForm">Add Student</UButton>
    </div> -->

    <div class="m-5">

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <UCard v-for="metric in studentMetrics" :key="metric.title" :class=staticData.mapToClass(metric.class)>
          <template #header>
            <div class="w-full text-center text-xl font-semibold text-black">
              {{ metric.title }}
            </div>
          </template>
          <div class="text-black text-5xl font-semibold w-full text-center">
            {{ metric.count }}
          </div>
        </UCard>
        
      </div>
    </div>

  </UCard>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

const staticData = useStaticData();

const studentMetrics = ref([
  { title: 'Total Students', count: 0 as number|| '', class: 'bg-emerald-600' },
  { title: 'Average GPA', count: 0 as number|| '', class: 'bg-teal-200' },

]);

interface DashboardStats {
  totalStudents: number;
  averageGPA: number;
}

const getStudent = async () => {
  try {
    const response = await $fetch<DashboardStats[]>('/api/Dashboard/stats', {
      method: 'GET',
    });
    
    if (response) {
      // const totalCount = response.length;
      // const AverageGPA = response.reduce((sum, student) => sum + (student as any).gpa, 0) / totalCount || 0;

      studentMetrics.value = [
        { title: 'Total Students', count: response.totalStudents, class: 'bg-red-200' },
        { title: 'Average GPA', count: response.averageGPA.toFixed(2), class: 'bg-blue-200' },

      ];
      console.log('Stats fetched successfully:', response);
    } else {
      console.error('API response was not an array:', response);
    }
  } catch (error) {
    console.error('Error fetching students:', error);
    studentMetrics.value = [
      { title: 'Total Students', count: 'Error', class: 'bg-red-200' },
      { title: 'Average GPA', count: 'Error', class: 'bg-red-200' },
    ];
  }
}

onMounted(() => {
  getStudent();
});
</script>