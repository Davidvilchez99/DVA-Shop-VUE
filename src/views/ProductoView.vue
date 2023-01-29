<script setup>
import {ref} from 'vue'
import {useRoute} from 'vue-router'
import { productosRef } from '../firebase.js'
import { getAuth } from 'firebase/auth'
import { onAuthStateChanged, signOut } from 'firebase/auth'
var estaLogueado = ref(false);
var userId = ref("");
const auth = getAuth();

onAuthStateChanged(auth, (user) => {
    if (user) {
    estaLogueado.value = true;
    userId.value = user.uid;
    } else {
     estaLogueado.value = false;

    }
  });

const router = useRoute();
var producto = ref([]);
var talla = ref("");
var cantidad = ref(1);
producto.value = productosRef.value.filter(producto => producto.id ==  router.params.id);
// var carrito = ref([]);
// console.log(carrito)

// function AñadirProducto() {
//         let added = ref(false);
//             if (added) {
//                 // done.style.transform = "translate(-110%) skew(-40deg)";
//                 added = false;
//             }
//             else {
//                 if (talla == "") {
//                     alert("Debe escoger una talla");
//                 }
//                 else {
//                     // done.style.transform = "translate(0px)";
//                     let producto = ref({
//                         id: producto.value[0].id,
//                         category: producto.value[0].category,
//                         image: producto.value[0].image,
//                         title: producto.value[0].title,
//                         price: producto.value[0].price,
//                         size: talla,
//                         amount: parseInt(cantidad)
//                     })
//                     var prodcutosExistentes = ref(false);
//                     for (j = 0; j < carrito.length; j++) {
//                         if (carrito[j].id == producto.id && carrito[j].size == producto.size) {
//                             carrito[j].amount += parseInt(cantidad);
//                             prodcutosExistentes = true;
//                         }
//                     }
//                     if (!prodcutosExistentes) {
//                         carrito.push(producto);
//                     }
//                     console.log(carrito)
//                     // localStorage.setItem("carrito", JSON.stringify(carrito));
//                 }
//                 added = true;
//             }

//         }

var carrito = ref([]);
var gastosDeEnvio = 3;

    if (localStorage.carrito != null)
        carrito.value = JSON.parse(localStorage.carrito);
    else {
        carrito.value = [];
    }
var productoLocalStorage = ref()
function AñadirProducto(){
    if (producto.value[0].category == "men's clothing" || producto.value[0].category == "women's clothing")
      if (talla.value == "") {
        alert("Debe escoger una talla");
      }
      else{
      productoLocalStorage = {
              id: producto.value[0].id,
              category: producto.value[0].category,
              image: producto.value[0].image,
              title: producto.value[0].title,
              price: producto.value[0].price,
              size: talla.value,
              amount: cantidad.value,
              idUser: userId.value
            };

              // carrito.value.push(productoLocalStorage);
              // console.log(carrito.value);
              // localStorage.setItem("carrito", JSON.stringify(carrito.value));

              var prodcutosExistentes = false;
                    for (let j = 0; j < carrito.value.length; j++) {
                      // console.log(carrito.value[j].id+ productoLocalStorage.id);
                      // console.log(carrito.value[j].size+ productoLocalStorage.size);
                      // console.log(carrito.value[j].idUser+ productoLocalStorage.idUser);
                        if (carrito.value[j].id == productoLocalStorage.id && carrito.value[j].size == productoLocalStorage.size && carrito.value[j].idUser == productoLocalStorage.idUser ) {
                            carrito.value[j].amount += cantidad.value;
                            prodcutosExistentes = true;
                        }
                    }
                    if (!prodcutosExistentes) {
                        carrito.value.push(productoLocalStorage);
                    }
                    localStorage.setItem("carrito", JSON.stringify(carrito.value));
          }
      else{
        productoLocalStorage = {
              id: producto.value[0].id,
              category: producto.value[0].category,
              image: producto.value[0].image,
              title: producto.value[0].title,
              price: producto.value[0].price,
              amount: cantidad.value,
              idUser: userId.value
            };

              // carrito.value.push(productoLocalStorage);
              // console.log(carrito.value);
              // localStorage.setItem("carrito", JSON.stringify(carrito.value));
              var prodcutosExistentes2 = false;
                    for (let j = 0; j < carrito.value.length; j++) {
                      // console.log(carrito.value[j].id+ productoLocalStorage.id);
                      // console.log(carrito.value[j].size+ productoLocalStorage.size);
                      // console.log(carrito.value[j].idUser+ productoLocalStorage.idUser);
                        if (carrito.value[j].id == productoLocalStorage.id && carrito.value[j].size == productoLocalStorage.size && carrito.value[j].idUser == productoLocalStorage.idUser ) {
                            carrito.value[j].amount += cantidad.value;
                            prodcutosExistentes2 = true;
                        }
                    }
                    if (!prodcutosExistentes2) {
                        carrito.value.push(productoLocalStorage);
                    }
                    localStorage.setItem("carrito", JSON.stringify(carrito.value));
            
      }
}



</script>

<template>
<div id="product--container">
        <div id="imagenes">
            <img :src=producto[0].image alt="">
        </div>
        <div id="info">
            <h1>{{producto[0].title}}</h1>
            <p>{{producto[0].description}}</p>
            <p>{{producto[0].price}} €</p>
            <p>Valoracion: {{producto[0].rating}}</p>
            <select v-if="producto[0].category !== 'jewelery' && producto[0].category !== 'electronics' " v-model="talla" name="" id="">
                <option disabled value="">Talla</option>
                <option value="XS">XS</option>
                <option value="S">S</option>
                <option value="M">M</option>
                <option value="L">L</option>
                <option value="XL">XL</option>
            </select>
        <br><label>Cantidad: </label><input v-model="cantidad" type="number" min="1" max="20" id="cantidad-producto"><br>
        <button v-if="estaLogueado" @click="AñadirProducto" class="addtocart">
          <div class="pretext">
          <i class="fa fa-cart-plus"></i> ADD TO CART
        </div> 
        <!-- <div class="pretext done" :style="{
        transform: added == true ? 'translate(-110%) skew(-40deg)': 'translate(0px)' ,
      }">
          <div class="posttext"><i class="fa fa-check"></i> ADDED</div>
        </div>  -->
      </button>
      <p v-else >Debe estar logueado para comprar</p>
        </div>
        </div>
</template>
