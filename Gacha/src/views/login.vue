<template>
    <div>
        
    </div>
</template>

<script setup>
import { supabase } from '@/superbase';
import { ref, onMounted } from 'vue';

const email = ref('')
const password = ref('')

onMounted(async function handleLogin() {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email.value,
    password: password.value,
  })

  if (error) {
    console.error('Error logging in:', error.message)
  } else {
    console.log('Logged in successfully:', data.user)
  }
})
</script>

<style lang="scss" scoped>

</style>