<template>
    <div>
        <h1>johgn</h1>
        <h1 @click="router.push('/Gacha')">click on me tpo go to gacha</h1>
    </div>
</template>

<script setup>

import router from '@/router';
import { supabase } from '@/superbase';
import { ref, onMounted } from 'vue';

const collGachaItems = ref([])
const error = ref(null)

onMounted(async () => {
  let { data: gachaItems, error: err } = await supabase
    .from('gachaItems')
    .select('*')
  if (err) {
    error.value = err.message
  } else {
    console.log(gachaItems)
    collGachaItems.value = gachaItems
  }
})

console.log(collGachaItems)


</script>

<style lang="scss" scoped>

</style>