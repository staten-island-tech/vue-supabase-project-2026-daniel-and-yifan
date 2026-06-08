<template>
    <div id="background">
      <h1>Login</h1>
      <form @submit.prevent="handleLogin">
        <input v-model="email" type="email" placeholder="Enter your email"/>
        <input v-model="password" type="password" placeholder="Enter your password"/>
        <button type="submit">Login</button>
      </form>
      <h1>Or create account.</h1>
        <form @submit.prevent="handleRegister">
          <input v-model="regEmail" type="emailreg" placeholder="Enter your email"/>
          <input v-model="regPassword" type="passwordreg" placeholder="Enter your password"/>
        <button type="submit">Register</button>
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

const email = ref()
const password = ref()
const regEmail = ref()
const regPassword = ref()

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

  
  userData.uid = profileInfo.id
  console.log('Profile:', userData.uid)
  router.push("/Enemies")
}

async function handleRegister() {
  const { data, error } = await supabase.auth.signUp({
    email: regEmail.value,
    password: regPassword.value,
  })
  if (error) {
    console.error('Signup Failed:', error.message)
    return
  }
  console.log('Login success, user:', data.user)
  alert("SIGNUP COMPLETE")
}
</script>

<style lang="css" scoped>
#background {
    background-color: #d8a61e;
  height: 100vh;
  position: absolute;
  width: 100vw;
  left: 0;
  top:0;
}

</style>
