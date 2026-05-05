<template>
    <div>
      <form @submit.prevent="handleLogin">
        <input v-model="email" type="email" placeholder="Enter your email"/>\
        <input v-model="passwprd" type="password" placeholder="Enter your passwrod"/>
      <button type="submit">Login</button>
    </form>
    </div>
</template>

<script setup>
import { supabase } from '@/superbase';
import { ref, onMounted } from 'vue';

const email = ref('')

async function handleLogin() {
  const { data: profileInfo, error } = await supabase.from("profile").select("email").eq('email',email.value).single()
    if (error || !profileInfo) {
    console.error('Email not found')
    return
  }

  console.log('Login success:', profileInfo)
}
</script>

<style lang="scss" scoped>

</style>
