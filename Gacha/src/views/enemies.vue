<template>
    <div>
        <div v-for="enemy in enemies" :key="'hp-' + enemy.id">HP: {{ enemy.hp }}</div>
        <img v-for="enemy in enemies" :key="'img-' + enemy.id" src="/goblin.png" alt="Goblin"@click="hitEnemy(enemy.id)"/>
    </div>
</template>

<script setup>
import { ref } from 'vue'

const enemies = ref([
  { id: 1, hp: 10 },
  { id: 2, hp: 10 },
])

function hitEnemy(enemyId) {
  const enemy = enemies.value.find(e => e.id === enemyId)
  if (!enemy) return

  enemy.hp -= 1
  if (enemy.hp <= 0) {
    enemies.value = enemies.value.filter(e => e.id !== enemyId)
  }
}
</script>

<style lang="scss" scoped>

</style>