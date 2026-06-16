<template class="test">
  <div id="background">
  
    <div id="gambleContainer">
      <GachaFormat v-if="display" :weaponName="itemData.name" :img="itemData.image" :flavorText="itemData.flavor" :rarity="itemData.rarity" :rarityColor="itemData.rarityColor" :key="itemData.name"/>
      <h1 id="roll" @click="doAGachaRoll()">roll (234 coins)</h1>
    </div>

    <div id = "return" @click="returnToEnemy">Back</div>
  </div>
</template>

<script setup>




import { supabase } from '@/supabase.js'
import { ref, onMounted } from 'vue';
import GachaFormat from '@/components/GachaFormat.vue';
import { useUserData } from '@/store.js';
import router from '@/router';
import gsap from 'gsap';

function returnToEnemy () {
  router.push("Enemies")
}

const userData = useUserData()


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
    console.log(error.value)
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
      "I would call you p2w if this game had microtransactions",
      "if only the IRS were real",
      "now something like that deserves a traditional romanian fist-bump"
    ]
}

async function doAGachaRoll(){
  if (userData.coins < 234) {return}
  userData.coins -= 234

  gsap.from("#roll", {
    opacity: 0.3,
    duration: 2
  })

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

  let {data: inventoryItem, error: err } = await supabase
    .from("Inventories")
    .select("user_id")
    .match({user_id: userData.uid, item_id: item.item_id})
  if (err) {
    error.value = err.message
    console.log(error.value)
  }
  else {
    console.log(inventoryItem)
  }

  if (!inventoryItem || inventoryItem.length == 0) {
    console.log("NOT DUPLICATE")
    let { data, error } = await supabase
      .from('Inventories')
      .insert([{ item_name: item.item_name, user_id: userData.uid, created_at: new Date(), updated_at: new Date(), item_id: item.item_id},
    ])
    .select()
    if (error) {
      console.log(error.message)
    }
  }
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

#background {
    background-color: #ffbed7;
background-image: url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23e87171' fill-opacity='0.4' fill-rule='evenodd'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40'/%3E%3C/g%3E%3C/svg%3E");
  height: 100vh;
  position: absolute;
  width: 100vw;
  left: 0;
  top:0;
  font-family: Consolas;
}

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
  font-size: large;
}

#return {
  position: absolute;
  left: 6vw;
  top: 70vh;
  size: 10%;
  padding: 0;
  width: 15rem;
  height: 5rem;
  border: solid;
  text-align: center;
  border-radius: 10px;
  border-width: 7px;
  line-height: 5rem;
  background-color: rgb(255, 155, 193);
  border-color: rgb(223, 130, 226);
  font-family: Consolas;
}
body{
  margin: 0
}
#gambleContainer{
  width: 60%;
  margin: auto;
  margin-top: 3rem;
  height: 50rem;
  background-color: rgba(255, 255, 255, 0.5);
}
</style>