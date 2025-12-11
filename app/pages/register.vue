<template>
  <div class="h-screen flex items-center justify-center bg-gray-900">
    <UCard class="bg-gray-800 w-fit text-white">
      <template #header>
        <p class="text-semibold text-2xl w-full text-center">CREATE ACCOUNT</p>
      </template>

      <UForm class="space-y-4" @submit="handleSubmit">
        <UFormField size="xl" icon="i-lucide-mail" label="Email">
          <UInput 
            v-model="data.email" 
            class="min-w-80 md:min-w-100" 
            placeholder="Enter your email" 
            type="email" 
            required 
          />
        </UFormField>
        
        <UFormField size="xl" icon="i-lucide-square-asterisk" label="Password">
          <UInput 
            v-model="data.password" 
            class="min-w-80 md:min-w-100" 
            placeholder="Enter your password" 
            type="password" 
            required 
          />
        </UFormField>

        <UFormField size="xl" icon="i-lucide-square-asterisk" label="Confirm Password">
          <UInput 
            v-model="data.confirmPassword" 
            class="min-w-80 md:min-w-100" 
            placeholder="Confirm your password" 
            type="password" 
            required 
          />
        </UFormField>
        
        <UButton 
          class="min-w-80 md:min-w-100" 
          type="submit" 
          size="xl" 
          color="primary" 
          label="Register"
          :loading="isLoading"
        />
      </UForm>
      
      <template #footer>
        <p class="text-sm text-center">
          Already have an account? 
          <ULink to="/login" class="text-secondary-400 hover:text-secondary-300 font-semibold">
            Sign In
          </ULink>
        </p>
      </template>
    </UCard>
  </div>
</template>

<script setup>
import { ref } from 'vue'

definePageMeta({
  layout: false // Use a full-page layout without the main application frame
})

const toast = useToast()

// Reactive data for the registration form
const data = ref({
  email: '',
  password: '',
  confirmPassword: ''
})

const isLoading = ref(false)

const handleSubmit = async () => {
  isLoading.value = true

  // 1. **Client-side Validation:** Check if passwords match
  if (data.value.password !== data.value.confirmPassword) {
    toast.add({
      title: 'Validation Error',
      description: 'The password and confirmation password do not match.',
      color: 'warning',
    })
    isLoading.value = false
    return
  }

  // 2. **API Call**
  try {
    const response = await $fetch('/api/Auth/CreateUser', {
      method: 'POST',
      // Send the entire data object, matching the curl request body
      body: data.value 
    });

    console.log('Registration response:', response)

    // Success Toast
    toast.add({
      title: 'Success!',
      description: 'Account created successfully. You can now log in.',
      color: 'success',
      icon: 'i-lucide-check-circle',
    })
    
    // Redirect the user to the login page after successful registration
    await navigateTo('/login')
  }
  catch(error){
    console.error('Registration failed:', error.data || error)

    // Extracting a helpful error message from the response if available
    const errorMessage = error.data?.message || error.data?.statusMessage || 'Registration failed. Please try again.';

    // Error Toast
    toast.add({
      title: 'Error',
      description: errorMessage,
      color: 'error',
      icon: 'i-lucide-x-octagon',
    })
  }
  finally {
    // 3. **Reset Loading State**
    isLoading.value = false 
  }
}
</script>
<style></style>