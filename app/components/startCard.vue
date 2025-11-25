<template>
  <div>
    <UCard :class="staticData.mapToClass(props.metric.class)>
          <template #header>
            <div class="w-full text-center text-xl font-semibold text-black">
              {{ props.metric.title }}
            </div>
          </template>
          <div class="text-black text-5xl font-semibold w-full text-center">
            {{ props.metric.count }}
          </div>
        </UCard>
  </div>
</template>

<script setup>
import { bg } from '@nuxt/ui/runtime/locale/index.js';


const staticData = useStaticData();

const props = defineProps({
  metricClass: 'info',
  title: String,
  count: [Number, String],
})

</script>

<style>

</style>