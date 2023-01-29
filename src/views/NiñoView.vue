<script setup>
import { productosRef } from '../firebase.js'
import {ref} from 'vue'
import producto from '../components/producto.vue'
var productos = ref([]);
productos.value = productosRef.value.filter(producto => producto.category == "kid" );
var select = ref("");
function ordenar(){
    if (select.value == "asc"){
        productos.value.sort(function(a, b) {
            return b.price - a.price;
        });
    }else if (select.value == "desc"){
        productos.value.sort(function(a, b) {
            return a.price - b.price;
        });
    }
}

</script>

<template>

<div id="div--select">
                <select id="select" v-model="select">
                <option disabled value="">Orden</option>
                <option value="desc">Descendente</option>
                <option value="asc">Ascendente</option>
                </select>
                <button @click="ordenar" class="ordenarProductos">Ordenar</button>
                </div>
              <div class="div--container">
                <producto :productos="productos" />
            </div>`
</template>