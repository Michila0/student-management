<script setup lang="ts">
import AddStudentMark from './addStudentMark.vue';
import MarksTable from '../components/MarksTable.vue';
</script>

<template>
    <div class="m-5 justify-end flex">
      <UButton color="info" icon="icon-circle-plus" to="/addStudentMark">Add Marks</UButton>
    </div>
    <div class="flex justify-center">
        <MarksTable/>
    </div>

</template>