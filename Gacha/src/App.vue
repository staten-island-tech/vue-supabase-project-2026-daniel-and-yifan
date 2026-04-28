<script setup>
import { ref, onMounted } from 'vue'
import { supabase } from './supabase'

const transactions = ref([])
const error = ref(null)

onMounted(async () => {

  let { data: transactionData, error: err } = await supabase
    .from('transactions')
    .select('*')

  if (err) {
    error.value = err.message
  } else {
    transactions.value = transactionData
  }
})
</script>

<template>
  <main>
    <h1>Transaction Log</h1>
    
    <p v-if="error" style="color: red;">{{ error }}</p>
    
    <ul>
      <li v-for="t in transactions" :key="t.id">
        {{ t.created_at }}: {{ t.amount }}
      </li>
    </ul>
  </main>
</template>