<template>
    <div class="h-20 w-full bg-gray-900 flex justify-between">
      <div><NuxtImg src="/images/17975497.png" class="h-20 py-3 px-10"></NuxtImg></div>
      <div class="flex justify-center items-center h-20 py-3 px-10">
        <!-- <UButton color="info" icon="icon-circle-plus" to="/addStudentForm">New Student</UButton> -->

        <UIcon name="i-lucide-circle-user-round" class="size-10" />
        <p class="text-xl font-semibold pl-5">{{ userStore.user.name }}</p>
      </div>
    </div>
</template>

<script lang="ts" setup>
import { useUserStore } from '~/stores/user';
const userStore = useUserStore()
</script>

<style scoped>

</style>