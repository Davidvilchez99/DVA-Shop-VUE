<script setup>
import {router} from '../main.js'
const props = defineProps(['productosPrivados']);

function cambiarVistaProducto(id){
    router.push(`/productoPrivado/${id}`)
}
</script>

<template>
<div v-for="productoPrivado in props.productosPrivados" class="div--producto" @click="cambiarVistaProducto(productoPrivado.id)">
    <div class="div--product--img"><img :src=productoPrivado.image></div>
    <div class="info--div--product">
    <h2>{{ productoPrivado.title }}</h2>
    <button>Editar Producto</button>
    </div>
</div>
</template>
