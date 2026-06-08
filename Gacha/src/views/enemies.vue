<template>
    <div id="background">

        <div id="gacha" @click="moveToGacha">GACHA</div>
        <div id="invButton" @click="openedInv = !openedInv">Inv</div>

        <div v-for="enemy in enemies" :key="'hp-' + enemy.id">HP: {{ enemy.hp }}</div>
        <img v-for="enemy in enemies" :key="'img-' + enemy.id" :src="enemy.rarity === 'Normal' ? '/enemy/goblin.png' : enemy.rarity === 'Gold' ? '/enemy/Gold_Goblin.png' : '/enemy/Diamond_Goblin.png'" alt="goblin" @click="hitEnemy(enemy.id)" />
        <div><b>Total Coins:</b> {{ userData.coins }}</div>

        <div id="inventory" v-if="openedInv"></div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import router from '@/router'
import { supabase } from '@/supabase'
const enemies = ref([])

import { useUserData } from '@/store'

let userData = useUserData()
const openedInv = ref(false)

async function fetchEnemies () { 
  const { data, error } = await supabase
  .from( 'enemies' )
  .select( 'id, hp, drops, rarity' )
  if (error) { 
    console .error( 'Failed to load enemies:' , error) 
    return 
  }
  enemies.value = data ?? []
}

function moveToGacha() {
  router.push("Gacha")
}
  
function hitEnemy ( enemyId ) { 
  const enemy = enemies.value.find( e => e.id === enemyId) 
  if (!enemy) return 
  enemy.hp -= 1 
  if (enemy.hp <= 0 ) { 
    userData.coins += Number(enemy.drops) || 0
    enemies.value = enemies.value.filter( e => 
    e.id !== enemyId) } }

    onMounted( () => { 
  fetchEnemies() 
})
</script>

<style lang="css" scoped>

#gacha{
  position: absolute;
  left: 70%;
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
  left: 70%;
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

#inventory{
  position: absolute;
  left: 10vw;
  top: 60vh;
  background-color: brown;
  width: 80vw;
  height: 30vh;
}

#background {
    background-color: #a3afa6;
  height: 100vh;
  position: absolute;
  width: 100vw;
  left: 0;
  top:0;
  font-family: Consolas;
}
</style>