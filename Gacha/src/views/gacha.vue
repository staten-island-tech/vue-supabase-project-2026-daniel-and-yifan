<template>
    <div>
        <h1>john</h1>
        <h1 @click="doAGachaRoll()">roll</h1>
    </div>
</template>

<script setup>

import { supabase } from '@/supabase';
import { ref, onMounted } from 'vue';

const collGachaItems = ref({
  horrible : [],
  good : [],
  yeah : [],
  great : [],
})
const error = ref(null)

async function grabItems(select, equal) {
  if (!select) {
    select = "*"
  }
  if (!equal) {
    equal = "*"
  }
  let { data: gachaItems, error: err } = await supabase
    .from('gachaItems')
    .select(select)
    .eq("rarity", equal)
  if (err) {
    error.value = err.message
  } else {
    console.log(gachaItems)
    collGachaItems.value = gachaItems
  }
}

function roll(min, max){
  let random = Math.floor(Math.random() * (max - min + 1)) + min;
  return random
}

function doAGachaRoll(){
  let rngRoll = roll(1, 100)
  if (rngRoll < 40) {
    let items = grabItems(undefined, "horrible")
    console.log("horrible", items)
  } else if (rngRoll < 70) {
    console.log("Good enough")
  } else if (rngRoll < 90) {
    console.log("Yeah")
  } else {
    console.log("Great")
  }
}


console.log(collGachaItems)


</script>



<style lang="scss" scoped>

</style>