<template>
    <div>
        <h1>john</h1>
    </div>
</template>

<script setup>

let data = await supabase.from('gachaItems').select('*')
console.log(data)

</script>



<style lang="scss" scoped>

</style>