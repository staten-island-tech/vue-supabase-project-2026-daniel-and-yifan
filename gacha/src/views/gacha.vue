<template>
    <div>
        <h1 id="roll" @click="doAGachaRoll()">roll</h1>
        <GachaFormat v-if="display" :weaponName="itemData.name" :img="itemData.image" :flavorText="itemData.flavor" :rarity="itemData.rarity" :key="itemData.name"/>
    </div>
</template>

<script setup>


import { supabase } from '@/supabase';
import { ref, onMounted } from 'vue';
import GachaFormat from '@/Components/GachaFormat.vue';

const itemData = ref({
  image : null,
  name : null,
  flavor : null,
  rarity : null
})

const error = ref(null)
var display = ref(false)

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
    return gachaItems
  }
}

function roll(min, max){
  let random = Math.floor(Math.random() * (max - min + 1)) + min;
  return random
}

const rarityMessages = {
  ["horrible"] : 
    [
      "God awful",
      "Gamble better",
      "HORRID"
    ],
  ["good"] : 
    [
      "Good enough",
      "Servicable",
      "Ok"
    ],
  ["yeah"] : 
    [
      "ok yeah actually that's pretty good",
      "good job",
      "YEAH"
    ],
  ["great"] : 
    [
      "boy if this game had microtransactions...",
      "if only the IRS were real",
      "gimme a fist bump right here"
    ]
}

async function doAGachaRoll(){
  let rngRoll = roll(1, 100)
  let rarity
  let items
  if (rngRoll < 40) {
    rarity = "horrible"
  } else if (rngRoll < 70) {
    rarity = "good"
  } else if (rngRoll < 90) {
    rarity = "yeah"
  } else {
    rarity = "great"
  }

  items = await grabItems(undefined, rarity)

  console.log(items, rarity, items.length)
  let weaponRoll = roll(0, items.length - 1)
  console.log(items[weaponRoll])
  let item = items[weaponRoll]
  if (item.imglink && item.item_name && item.rarity) {
    itemData.value.image = item.imglink
    itemData.value.name = item.item_name
    itemData.value.rarity = item.rarity

    let flavorRoll = roll(0, rarityMessages[item.rarity].length - 1)
    itemData.value.flavor = rarityMessages[item.rarity][flavorRoll]
    console.log(itemData.value)

    display.value = true
  } 
}


</script>



<style lang="css" scoped>
#roll{
  size: 10%;
  margin:0%;
  padding: 0;
  position: absolute;
}
</style>