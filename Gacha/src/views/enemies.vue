<template>
    <div>
        <div v-for="enemy in enemies" :key="'hp-' + enemy.id">HP: {{ enemy.hp }}</div>
        <img v-for="enemy in enemies" :key="'img-' + enemy.id" :src="enemy.rarity === 'Normal' ? '/enemy/goblin.png' : enemy.rarity === 'Gold' ? '/enemy/Gold_Goblin.png' : '/enemy/Diamond_Goblin.png'" alt="goblin" @click="hitEnemy(enemy.id)" />

    </div>
</template>

<script setup>
import { supabase } from '@/supabase'
import { ref, onMounted } from 'vue'

const enemies = ref([])
const coins = ref(0)
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

function hitEnemy ( enemyId ) { 
  const enemy = enemies.value.find( e => e.id === enemyId) 
  if (!enemy) return 
  enemy.hp -= 1 
  if (enemy.hp <= 0 ) { 
    coins.value += Number(enemy.drops) || 0
    enemies.value = enemies.value.filter( e => 
    e.id !== enemyId) } }

    onMounted( () => { 
  fetchEnemies() 
})
</script>

<style >

</style>