<template>
    <!-- <div class="h-20 bg-gray-950">
        <div>
            <NuxtImg class="flex justify-start h-18" src="/images/17975497.png" alt="Logo"/>
        </div>
        <div class="flex justify-end text-white h-18">register</div>
    </div> -->
    <navbar/>
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
    </UCard>
  </div>
</template>

<script setup>
const data = ref({
  email: '',
  password: ''
})

const isLoading = ref(false)

const login = async () => {
  console.log('login start...')
  
  try {
    const respose = await $fetch('api/login', {
      method: 'POST',
      body: data.value 
    });

    console.log('Login response', respose)
    navigateTo('/dashboard')
  }
  catch(error){
    console.log('Login failed')
    console.log('error', error.data)

    alert(error.data.statusMessage)
  }
}
</script>
<style></style>