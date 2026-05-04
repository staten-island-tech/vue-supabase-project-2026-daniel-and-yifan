<template>
    <div>
        <img src="{{ img }}" alt="">
        <h2>{{ weaponName }}</h2>
    </div>
</template>

<script>

const props = defineProps({
    weaponName: {
        type: String,
        required: true
    },
    img: {
        type: Object,
        required: true
    },
    rarity: {
        type: String,
        required: true
    },
    flavorText: {
        type: String,
        required: false
    }
})
</script>

<style lang="css" scoped>

</style>