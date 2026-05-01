<template>
    <div>
        <p></p>
    </div>
</template>

<script setup>
import { supabase } from '@/superbase';
import { ref, onMounted } from 'vue';

const email = ref('')
const password = ref('')

onMounted(async function handleLogin() {
  const { data: profileInfo, error } = await supabase.from("profile").select("email")

  if (error) {
    console.error('Error logging in:', error.message)
  } else {
    console.log('Logged in successfully:', profileInfo)
  }
})
</script>

<style lang="scss" scoped>

</style>