<template>
  
  <div id="gambleContainer">
    <GachaFormat v-if="display" :weaponName="itemData.name" :img="itemData.image" :flavorText="itemData.flavor" :rarity="itemData.rarity" :rarityColor="itemData.rarityColor" :key="itemData.name"/>
    <h1 id="roll" @click="doAGachaRoll()">roll</h1>
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
  rarity : null,
  rarityColor : null
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

const rarityColors = {
  ["horrible"] : "#e82121",
  good : "#ed9a12",
  yeah : "#fff366",
  great: "#edffb8"
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

  if (item.imglink !== null) {
    itemData.value.image = item.imglink
  }
  if (item.item_name!==null){
    itemData.value.name = item.item_name
  }
  if (item.rarity!== null) {
    itemData.value.rarity = item.rarity
    let flavorRoll = roll(0, rarityMessages[item.rarity].length - 1)
    itemData.value.flavor = rarityMessages[item.rarity][flavorRoll]

    itemData.value.rarityColor = rarityColors[item.rarity]
  }
  console.log(itemData.value)
  display.value = true
}


</script>



<style lang="css" scoped>

#roll{
  size: 10%;
  padding: 0;
  margin-left: auto;
  margin-right: auto;
  margin-top: 5%;
  width: 15rem;
  height: 5rem;
  border: solid;
  text-align: center;
  border-radius: 10px;
  border-width: 7px;
  line-height: 5rem;
  background-color: rgb(255, 155, 193);
  border-color: rgb(223, 130, 226);
}
#gambleContainer{
  width: 60%;
  margin: auto;
  margin-top: 3rem;
  height: 50rem;
  background-color: rgba(255, 255, 255, 0.5);
}
</style>