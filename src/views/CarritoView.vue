<script setup>
import { getAuth } from 'firebase/auth'
import { onAuthStateChanged, signOut } from 'firebase/auth'
// import {carrito} from './ProductoView.vue'
import {ref} from 'vue'
var userId = ref("");
var gastosDeEnvio = 3;
var cantidad = ref("");
const auth = getAuth();
var carritoLocal = ref([]);
var carritoFiltrado = ref([]);
carritoLocal.value = JSON.parse(localStorage.carrito);
onAuthStateChanged(auth, (user) => {
    if (user) {
    userId.value = user.uid;
    carritoFiltrado.value = carritoLocal.value.filter(producto => producto.idUser == userId.value );
console.log(carritoFiltrado.value);
    } else {
    }
  });

function eliminarProductoCarrito(id, talla){
    for (let i=0; i<carritoLocal.value.length; i++){
        if (carritoLocal.value[i].category == "men's clothing" || carritoLocal.value[i].category == "women's clothing"){
            // console.log(carritoLocal.value[i].size + talla)
            if (carritoLocal.value[i].id == id && carritoLocal.value[i].idUser == userId.value && carritoLocal.value[i].size == talla){
                carritoLocal.value.splice(i, 1);
            }
        }
        else{
            if (carritoLocal.value[i].id == id && carritoLocal.value[i].idUser == userId.value){
                carritoLocal.value.splice(i, 1);
            }
        }
    }
    for (let i=0; i<carritoFiltrado.value.length; i++){
        if (carritoFiltrado.value[i].category == "men's clothing" || carritoFiltrado.value[i].category == "women's clothing"){
            // console.log(carritoFiltrado.value[i].size + talla)
            if (carritoFiltrado.value[i].id == id && carritoFiltrado.value[i].idUser == userId.value && carritoFiltrado.value[i].size == talla){
                carritoFiltrado.value.splice(i, 1);
            }
        }
        else{
            if (carritoFiltrado.value[i].id == id && carritoFiltrado.value[i].idUser == userId.value){
                carritoFiltrado.value.splice(i, 1);
            }
        }
    }
    localStorage.carrito = JSON.stringify(carritoLocal.value);

}

function variarCantidad(id, talla, cantidad){
    for (let i=0; i<carritoLocal.value.length; i++){
        if (carritoLocal.value[i].category == "men's clothing" || carritoLocal.value[i].category == "women's clothing"){
            // console.log(carritoLocal.value[i].size + talla)
            if (carritoLocal.value[i].id == id && carritoLocal.value[i].idUser == userId.value && carritoLocal.value[i].size == talla){
                carritoLocal.value[i].amount = cantidad;
            }
        }
        else{
            if (carritoLocal.value[i].id == id && carritoLocal.value[i].idUser == userId.value){
                carritoLocal.value[i].amount = cantidad;
            }
        }
    }
    for (let i=0; i<carritoFiltrado.value.length; i++){
        if (carritoFiltrado.value[i].category == "men's clothing" || carritoFiltrado.value[i].category == "women's clothing"){
            // console.log(carritoFiltrado.value[i].size + talla)
            if (carritoFiltrado.value[i].id == id && carritoFiltrado.value[i].idUser == userId.value && carritoFiltrado.value[i].size == talla){
                carritoFiltrado.value[i].amount = cantidad;
            }
        }
        else{
            if (carritoFiltrado.value[i].id == id && carritoFiltrado.value[i].idUser == userId.value){
                carritoFiltrado.value[i].amount = cantidad;
            }
        }
    }
    localStorage.carrito = JSON.stringify(carritoLocal.value);

    // console.log(carritoFiltrado.value);
}

function actualizarCarrito() {
        let Subtotal = 0;
        for (let j = 0; j < carritoFiltrado.value.length; j++) {
            Subtotal += (carritoFiltrado.value[j].price * carritoFiltrado.value[j].amount);
        }
        return Subtotal;
    }
</script>

<template>
<!-- if (carrito.length == 0) {
            let vistaCarritoVacio = `<div id="div--carritoVacio"><h1 id="h1carritoVacio">Tu carrito está vacío</h1></div>`;
            $("main").html(vistaCarritoVacio);
        }
        else { -->
            <!-- productosCarrito = JSON.parse(localStorage.carrito); -->
            <div id="container--cesta--productos"><div id="productos">
            <div v-for="productoCarrito in carritoFiltrado " id="cesta-producto">
            <div><img :src=productoCarrito.image alt=""></div>
            <div>
                <h3>{{ productoCarrito.title }}</h3>
                <p v-if="productoCarrito.category !== 'jewelery' && productoCarrito.category !== 'electronics' ">Talla: {{productoCarrito.size}}</p>
                <p class="pPrecio">{{ productoCarrito.price }} €</p>
            </div>
            <div class="div-delete-producto">
            <!-- <button class="actualizarProducto">Actualizar</button> -->
            </div>
            <div class="div-actualizar-producto">
                <!-- <p hidden>{{ cantidad = productoCarrito.amount }}</p> -->
            <label>Cantidad: </label><input type="number" min="1" max="20" class="cantidadProducto" @change="variarCantidad(productoCarrito.id, productoCarrito.size, productoCarrito.amount)" v-model="productoCarrito.amount" name="cantidadProducto">
            <i @click="eliminarProductoCarrito(productoCarrito.id, productoCarrito.size)" class="papelera fa fa-trash"></i>
            </div>
        </div>
            </div>
        <div id="cesta">
            <p id="subtotal">Subtotal: {{  actualizarCarrito().toFixed(2)}} €</p>
            <p id="gastosdeEnvio">Gastos de envio: {{ gastosDeEnvio }} €</p>
            <p id="total">Total: {{ (actualizarCarrito()+gastosDeEnvio).toFixed(2)}} €</p>
            <button id="tramitarPedido">Tramitar pedido</button>
        </div>
        </div>
</template>