<template>
    <div id="background">
      <div id="gacha" @click="moveToGacha">GACHA</div>
      <div id="invButton" @click="openInv">Inv</div>
      <div id="profile"></div>

      <div v-for="enemy in enemies" :key="'hp-' + enemy.id">HP: {{ enemy.hp }}</div>
      <img v-for="enemy in enemies" :key="'img-' + enemy.id" 
        :src="enemy.rarity === 'Normal' ? '/enemy/goblin.png' : enemy.rarity === 'Gold' ? '/enemy/Gold_Goblin.png' : '/enemy/Diamond_Goblin.png'" 
        alt="goblin" 
        @click="hitEnemy(enemy.id)" 
      />
      <div><b>Total Coins:</b> {{ userData.coins }}</div>


      <div id="ui" v-show="openedInv">
        <div id="equips">
          <div id="char">
            <h3 id="charMult">x{{ userData.equippedChar && userData.equippedChar.multiplier || 0 }} ATK</h3>
            <h3 id="charText">{{ userData.equippedChar?.tr_name ?? "Char" }}</h3>
            <div id="charContainer" @click="setChar">
              <img id="charImg" v-if="userData.equippedChar" :src="userData.charImg" alt="">
            </div>
          </div>
          <div id="weapon">
            <h3 id="weaponAttack">+{{ userData.equippedWeapon  && userData.equippedWeapon.attack || 1 }} ATK</h3>
            <h3 id="weaponText">{{ userData.equippedWeapon?.tr_name ?? "Weapon" }}</h3>
            <div id="weaponContainer" @click="setWeapon">
              <img id="weaponImg" v-if="userData.equippedWeapon" :src="userData.weaponImg" alt="">
            </div>
          </div>
          <h3 id="calculated">Total Calculated: {{ userData.calculatedDamage }} DMG</h3>
        </div>
        
        <div id="inventory">
          <Itemslot v-if="openedInv" v-for="item in foundItems" @click="selectItem(item)" 
            :key="item.item_id"
            :img-link="item.imglink"
            :item-rarity="item.rarity"
            :item-stat="item.attack || item.multiplier"
            :index="userData.itemIndex"
            :item-type="item.TYPE"
            :selected="!!selectedItem && selectedItem.item_id == item.item_id"
            :equipped="(!!userData.equippedWeapon && userData.equippedWeapon.item_id == item.item_id) || (!!userData.equippedChar && userData.equippedChar.item_id == item.item_id)"
          ></Itemslot>
        </div>
      </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import router from '@/router'
import { supabase } from '@/supabase.js'
import gsap from 'gsap'
import Itemslot from '@/components/Itemslot.vue'

const enemies = ref([])

import { useUserData } from '@/store'

let userData = useUserData()
const openedInv = ref(false)
const selectedItem = ref(null)
const foundItems = ref([])

function selectItem (item) {
  console.log("Clicked")
  if (selectedItem.value && selectedItem.value.item_id == item.item_id){
    selectedItem.value = null
    console.log("cleared selection")
  } else {
    selectedItem.value = item
  }
}

function setWeapon () {
  if (selectedItem.value && selectedItem.value.TYPE == "WEAPON") {
    if (userData.equippedWeapon && userData.equippedWeapon.item_id == selectedItem.value.item_id) {
      userData.equippedWeapon = null
      selectedItem.value = null
    } else {
    userData.equippedWeapon = selectedItem.value
    console.log("char set")
    selectedItem.value = null
    }
  } else if (!selectedItem.value && userData.equippedWeapon) {
    userData.equippedWeapon = null
  }
}

function setChar() {
  if (selectedItem.value && selectedItem.value.TYPE == "CHAR") {
    if (userData.equippedChar && userData.equippedChar.item_id == selectedItem.value.item_id) {
      userData.equippedChar = null
      selectedItem.value = null
    } else {
    userData.equippedChar = selectedItem.value
    console.log("char set")
    selectedItem.value = null
    }
  } else if (!selectedItem.value && userData.equippedChar) {
    userData.equippedChar = null
  }
}

async function openInv () {
  openedInv.value = !openedInv.value

  if (openedInv.value == false) {
    foundItems.value = []
    userData.itemIndex = 0
    return
  }

  else
  
  {
  gsap.from("#inventory", {
    duration: 0.2,
    opacity: 0,
    y: -600,
    yoyo: true
  })

  gsap.from("#equips", {
    duration: 0.2,
    opacity: 0
  })
  let {data: invData, error1} = await supabase
  .from( "Inventories")
  .select("*")
  .match({user_id : userData.uid})
  if (error1) {
    console.log(error1.message)
  }
  console.log(invData)

  let {data: itemList, error2} = await supabase
  .from( "gachaItems")
  .select("*")
  if (error2) {
    console.log(error2.message)
  }

  console.log(itemList)

  invData.forEach(invItem => {
    itemList.forEach(listItem => {
      if (invItem.item_id == listItem.item_id) {
        foundItems.value.push(listItem)
      }
    });
  });
  console.log(foundItems.value)
  }

}

const originalHP = ref({})
async function fetchEnemies () { 
  let { data, error } = await supabase
  .from( 'enemies' )
  .select( 'id, hp, drops, rarity' )
  if (error) { 
    console .error( 'Failed to load enemies:' , error) 
    return 
  }
  enemies.value = (data ?? []).map(e => ({ ...e, dead: false }))
  enemies.value.forEach(e => {
    originalHP.value[e.id] = e.hp
  })
}

function moveToGacha() {
  router.push("Gacha")
}
  
function hitEnemy ( enemyId ) { 
  const enemy = enemies.value.find( e => e.id === enemyId) 
  if (!enemy) return 
  if (enemy.dead) return 
  enemy.hp -= userData.calculatedDamage
  if (enemy.hp <= 0 ) { 
    userData.coins += Number(enemy.drops) || 0
    enemy.dead = true
    const respawnSeconds = 10
    enemy.respawnTimer = respawnSeconds
    const interval = setInterval(() => {
      enemy.respawnTimer -= 1
      if (enemy.respawnTimer <= 0) {
        clearInterval(interval)
        enemy.hp = originalHP.value[enemyId] ?? 10
        enemy.dead = false
        delete enemy.respawnTimer
      }
    }, 1000)
  }
}

    onMounted( () => {
  fetchEnemies()
})
</script>

<style lang="css" scoped>

#gacha{
  position: absolute;
  left: 76%;
  top: 70%;
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
}

#invButton{
  position: absolute;
  left: 76%;
  top: 50%;
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
}

#equips{
  display: flex;
  flex-direction: row;
}

#inventory{
  
  background-color: rgb(118, 46, 31);
  
  overflow: scroll;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  border: solid;
  border-color: rgb(135, 160, 222);
  height: 30vh;
  pointer-events:visible;
}

#char{
  width: 120px;
  margin-right: 9px;
  
}

#calculated{
  align-self: flex-end;
  margin: 0px 18px;
}

#weapon{
  width: 120px;
}

h3{
  padding:0%;
  margin: 0;
}

#weaponText{
  padding:0%;
  margin: 0;
}

#charContainer{
  background-color: rgb(47, 14, 77);
  border: solid;
  border-color: rgb(79, 92, 169);
  border-width: 6px;
  width: 100%;
  height: 120px;
  border-right-width: 3px;
}

#weaponContainer{
  background-color: rgb(38, 31, 118);
  border: solid;
  border-color: rgb(79, 92, 169);
  border-width: 6px;
  width: 100%;
  height: 120px;
  border-left-width: 3px;
}

#charImg {
  width: 100%;
}
#weaponImg {
  width: 100%;
}

#ui{
  position: absolute;
  left: 25vw;
  top: 40vh;
  width: 50vw;
}

#background {
  background-color: #a3c3ab;
  height: 100vh;
  position: absolute;
  width: 100vw;
  left: 0;
  top:0;
  font-family: Consolas;
}
</style>