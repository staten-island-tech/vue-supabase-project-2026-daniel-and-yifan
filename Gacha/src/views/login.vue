<template>
    <div>
      <form @submit.prevent="handleLogin">
        <input v-model="email" type="email" placeholder="Enter your email"/>
      <button type="submit">Login</button>
    </form>
    </div>
</template>

<script setup>
import { supabase } from '@/superbase';
import { ref, onMounted } from 'vue';

const email = ref('')

onMounted(async function handleLogin() {
  const { data: profileInfo, error } = await supabase.from("profile").select("email").eq('email',email.value).single()
    if (error) {
    console.error('Error logging in:', error.message)
  } else {
    console.log('Logged in successfully:', profileInfo)
  }
    if (error || !data) {
    console.error('Email not found')
    return
  }

  console.log('Login success:', data)
})
</script>

<style lang="scss" scoped>

</style>
