@ -1,120 +0,0 @@
<template>
    <div id= "imgContainer" :class="{selected: selected, equipped: equipped, default: !selected && !equipped}" ref="imgContainer">
      <img id="itemImg" :src="imgDir" alt=""/>
    </div>
</template>

<script setup>
import { stringToBase64URL } from '@supabase/ssr';
import { defineProps, ref, watchEffect, onMounted } from 'vue';
import { useUserData } from '@/store';
import gsap from 'gsap';

let userData = useUserData()

const imgContainer = ref(null)


const props = defineProps({
  imgLink: {
    type: String,
    required: false
  },
  itemRarity: {
    type: String,
    required: true
  },
  index: {
    type: Number,
    required: false
  },
  itemType: {
    type: String,
    required: true
  },
  itemStat: {
    type: Number,
    required: true
  },
  selected: {
    type: Boolean,
    required: true
  },
  equipped: {
    type: Boolean,
    required: true
  }
})

var imgDir = ref()

const rarityColors = {
  ["horrible"] : "#e82121",
  good : "#ed9a12",
  yeah : "#fff366",
  great: "#edffb8"
}

let fadeDelay = userData.itemIndex * 0.1
userData.itemIndex += 1
const index = userData.itemIndex

onMounted(()=> {
  if (props.imgLink) {
      imgDir.value = `./GachaItemsIMG/${props.imgLink}`
      console.log(props.imgLink)
  } else if (typeof(props.img) == "undefined") {
      imgDir.value = null
  }

  gsap.from(imgContainer.value, {
    duration: 0.3,
    delay: fadeDelay,
    opacity: 0
  })
  
})

watchEffect(()=> {
  if (props.selected) {
    console.log(index, "selected")
  }
})
</script>

<style lang="css" scoped>

#imgContainer{
  width: 120px; height: 120px;
}

.default{
  border: solid;
  border-color: rgb(135, 160, 222);
}

.selected{
  filter: brightness(70%);
  border: solid;
  border-color: rgb(135, 160, 222);
}

.equipped{
  border: solid;
  border-color: rgb(169, 126, 255);
  filter: brightness(100%) opacity(60%);
}

.selected.equipped{
  border: solid;
  border-color: rgb(169, 126, 255);
  filter: brightness(70%) opacity(40%);
}

#itemImg{
  width: 100%;
  height: 100%;
  background-color: v-bind(rarityColors[itemRarity]);
}

</style>
