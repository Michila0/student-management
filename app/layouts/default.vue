<template>
    <div class="h-screen">
        <navbar/>
        <div class="h-full w-full grid grid-cols-4">
            <SideBar/>
            <div class="h-full col-span-3 bg-gray-800">
                <slot/>
            </div>
        </div>
    </div>
</template>

<script setup>
import navbar from '~/components/navbar.vue';
import SideBar from '~/components/SideBar.vue'; 
</script>