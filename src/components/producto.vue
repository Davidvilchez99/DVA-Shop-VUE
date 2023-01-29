<script setup>
import {router} from '../main.js'
const props = defineProps(['productos']);

function cambiarVistaProducto(id){
    router.push(`/producto/${id}`)
}
</script>

<template>
<div v-for="producto in props.productos" class="div--producto" @click="cambiarVistaProducto(producto.id)">
    <div class="div--product--img"><img :src=producto.image></div>
    <div class="info--div--product">
    <h2>{{ producto.title }}</h2>
    <p>{{ producto.price }} €</p>
    </div>
</div>
</template>
