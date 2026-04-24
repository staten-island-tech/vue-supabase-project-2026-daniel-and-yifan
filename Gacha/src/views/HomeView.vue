<template>
  <div>

  </div>
</template>

<script>
 import { ref, onMounted } from 'vue'
 import { supabase } from 'src/views/supabase'
  
 const todos = ref([])
 async function getTodos() {
   const { data } = await supabase.from('todos').select()
   todos.value = data
 }
onMounted(() => {
  getTodos()
})
</script>

<style>

</style>
