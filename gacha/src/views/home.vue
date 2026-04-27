<template>
    <div>
        <h1>johgn</h1>
    </div>
</template>

<script setup>

import { supabase } from '@/superbase';
import { ref, onMounted } from 'vue';

const transactions = ref([])

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

<style lang="scss" scoped>

</style>