<template>
  <div class="h-full bg-gray-700">
    <UNavigationMenu
      orientation="vertical" 
      :items="items"
      :ui="{
        link: 'text-xl pl-6'
      }"
      class="p-10 text-xl" />
  </div>
</template>

<script lang="ts" setup>
import type { NavigationMenuItem } from '@nuxt/ui';

const items = ref<NavigationMenuItem[]>([
  [
    {
      label: 'Dashboard',
      icon: 'i-lucide-layout-dashboard',
      type: 'link',
      to: '/dashboard'
    },
    
    {
      label: 'Students',
      icon: 'i-lucide-book-user',
      type: 'link',
      to: '/students'
    },
    
    {
      label: 'Marks',
      icon: 'i-lucide-book-check',
      type: 'link',
      to: '/marks'
    },
  ]
])
</script>

<style scoped>

</style>