<template>
    <div>
        <h2>{{ weaponName }}</h2>
    </div>
</template>

<script setup>

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

console.log(props)

var itemImg = `gacha/src/Components/${props.img}`
</script>

<style lang="css" scoped>

</style>