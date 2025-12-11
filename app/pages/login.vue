<template>
    <div class="h-screen flex items-center justify-center bg-gray-900">
    <UCard class="bg-gray-800 w-fit text-white">
        <template #header>
            <p class="text-semibold text-2xl w-full text-center">SIGN IN</p>
        </template>

        <UForm class="space-y-4" @submit="login()">
            <UFormField size="xl" icon="i-lucide-mail">
                <UInput v-model="data.email"  class="min-w-80 md:min-w-100" placeholder="Enter your email" type="email" required />
            </UFormField>
            <UFormField size="xl" icon="i-lucide-square-asterisk">
                <UInput v-model="data.password"  class="min-w-80 md:min-w-100" placeholder="Enter your password" type="password" required />
            </UFormField>
            <UButton 
                class="min-w-80 md:min-w-100" 
                type="submit" 
                size="xl" 
                color="secondary" 
                label="Submit"
                :loading="isLoading"
            />
        </UForm>
        <template #footer>
        <p class="text-sm text-center">
          Already have an account? 
          <ULink to="/register" class="text-secondary-400 hover:text-secondary-300 font-semibold">
            Sign Up
          </ULink>
        </p>
      </template>
    </UCard>
  </div>
</template>

<script setup>
import { useUserStore } from '~/stores/user'
import { ref } from 'vue'

definePageMeta({
  layout: false
})
const toast = useToast()


const userStore = useUserStore()

const data = ref({
  email: '',
  password: ''
})

const isLoading = ref(false)

const login = async () => {
  console.log('login start...')
  isLoading.value = true
  
  try {
    const respose = await $fetch('/api/Auth/Login', {
      method: 'POST',
      body: data.value 
    });

    console.log('Login response', respose)
    userStore.user.name = data.value.email
    navigateTo('/dashboard')
    
    toast.add({
      title: 'Successful',
      description: 'Successfully logged in.',
      // icon: 'i-lucide-check-circle',
      color: 'success',
    })
  }
  catch(error){
    console.log('Login failed')
    console.log('error', error.data)

    // alert(error.data.statusMessage)

    toast.add({
      title: 'Error',
      description: 'Login failed. Please try again.',
      // icon: 'i-lucide-x-octagon',
      color: 'error',
    })
  }
}
</script>
<style></style>