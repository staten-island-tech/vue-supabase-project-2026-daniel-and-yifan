<template>
    <div id ="mainContainer">
        <h1 class="item" id="itemName">{{ weaponName }}</h1>
        <h2 class="item" id="rarity">{{ rarity }}</h2>
        <h2 class="item" id="flavor">{{ flavorText }}</h2>
        <img id="itemImg" :src="imgDir" alt=""/>
    </div>
</template>

<script setup>

import { onMounted, ref, watchEffect } from 'vue';

const props = defineProps({
    weaponName: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: true
    },
    rarity: {
        type: String,
        required: true
    },
    flavorText: {
        type: String,
        required: true
    }
})

var imgDir = ref()

watchEffect(()=> {
    imgDir.value = `./GachaItemsIMG/${props.img}`
    console.log(img)
})

</script>

<style lang="css" scoped>

#mainContainer{
    margin: auto;
    width:  50%;
}
#itemImg{
    width: 70%;
    display: block;
    margin: auto;
}
.item{
    margin: auto;
    width: fit-content;
}
</style>