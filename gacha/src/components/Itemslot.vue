<template>
    <div>
      <img id="itemImg" :src="imgDir" alt=""/>
    </div>
</template>

<script setup>
import { stringToBase64URL } from '@supabase/ssr';
import { defineProps, ref, watchEffect } from 'vue';


const props = defineProps({
  imgLink: {
    type: String,
    required: true
  },
  itemRarity: {
    type: String,
    required: true
  },
  animDelay: {
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
  }
})

var imgDir = ref()

watchEffect(()=> {
    if (props.imgLink) {
        imgDir.value = `./GachaItemsIMG/${props.imgLink}`
        console.log(props.img)
    } else if (typeof(props.img) == "undefined") {
        imgDir.value = null
    }
})
</script>

<style lang="css" scoped>

</style>