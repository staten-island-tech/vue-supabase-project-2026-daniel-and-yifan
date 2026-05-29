<template>
    <div>
        <div v-for="enemy in enemies" :key="'hp-' + enemy.id">HP: {{ enemy.hp }}</div>
        <img v-for="enemy in enemies" :key="'img-' + enemy.id" src="/enemy/goblin.png" alt="goblin" @click="hitEnemy(enemy.id)"/>
    </div>
</template>

<script setup>
import { supabase } from '@/supabase'
import { ref } from 'vue'

const enemies = ref([ 
{ id: 1 , hp: 3 , maxHp: 3 , rarity: null , drops: null }, 
{ id: 2 , hp: 5 , maxHp: 5 , rarity: null , drops: null }, 
])

function hitEnemy(enemyId) {
  const enemy = enemies.value.find(e => e.id === enemyId)
  if (!enemy) return
   if (enemy.hp <= 0) {
    enemies.value = enemies.value.filter(e => e.id !== enemyId)
  }
  if  (enemy.hp <= 0) {
    enemy.hp = enemy.maxHp
  return
  }
  enemy.hp -= 1
}
</script>

<style >
</style>