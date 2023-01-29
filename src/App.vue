<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { collection, query, where } from "firebase/firestore";
import foooter from './components/foooter.vue'
import headeeer from './components/headeeer.vue'

</script>

<template>
        <!-- <RouterLink to="/">Home</RouterLink> -->
        <!-- <RouterLink to="/about">About</RouterLink> -->

        <headeeer/>
        <main><RouterView /></main>
        <foooter/>

</template>

<style scoped>

</style>
