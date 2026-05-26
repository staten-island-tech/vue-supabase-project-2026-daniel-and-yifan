<template>
    <div>
      <form @submit.prevent="handleLogin">
        <input v-model="email" type="email" placeholder="Enter your email"/>
        <input v-model="password" type="password" placeholder="Enter your password"/>
      <button type="submit">Login</button>
    </form>
    </div>
</template>

<script setup>
import { supabase } from '@/supabase';
import { ref, onMounted,  } from 'vue';
import { useRouter } from 'vue-router';
import { useUserData } from '@/store';
const userData = useUserData()
const router = useRouter()



const email = ref('')
const password = ref('')

async function handleLogin() {
  const {data, error: SignInError} = await supabase.auth.signInWithPassword({
    email: email.value,
    password: password.value,
  })
  if (SignInError){
    console.error('Login Failed:', SignInError.message)
      return
  }
  console.log('Login success, user:', data.user)
  const { data: profileInfo, error: profileError } = await supabase.from("profile").select("id").eq('email',email.value).single()
    if (profileError) {
      console.error('Cant Fetch profile:', profileError.message)
    return
  }

  
  userData.uid = profileInfo
  console.log('Profile:', userData.uid)
  router.push("/Enemies")
}
</script>

<style lang="scss" scoped>

</style>
