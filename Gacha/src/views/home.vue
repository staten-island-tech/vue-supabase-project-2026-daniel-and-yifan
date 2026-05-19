<template>
    <div>
        <h1>johgn</h1>
        <h1 @click="router.push('/Gacha')">click me to go tgo gacha</h1>
    </div>
</template>

<script setup>

import router from '@/router';
import { supabase } from '@/superbase';
import { ref, onMounted } from 'vue';


</script>

<style lang="css" scoped>

</style>