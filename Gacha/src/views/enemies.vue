<template>
    <div>

        <div id="gacha" @click="moveToGacha">GACHA</div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import router from '@/router'
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

function moveToGacha() {
  router.push("Gacha")
}
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

</style>