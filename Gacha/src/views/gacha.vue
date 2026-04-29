<template>
    <div>
        <h1>john</h1>
        <h1 @click="">roll</h1>
    </div>
</template>

<script setup>

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

function roll(min, max){
  let random = Math.floor(Math.random() * (max - min + 1)) + min;
  return random
}

function doAGachaRoll(){
  
}


console.log(collGachaItems)


</script>



<style lang="scss" scoped>

</style>