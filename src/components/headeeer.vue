<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { collection, query, where } from "firebase/firestore"
import { getAuth } from 'firebase/auth'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { ref } from 'vue'
var estaLogueado = ref(false);
const auth = getAuth();
onAuthStateChanged(auth, (user) => {
    if (user) {
    estaLogueado.value = true;
    } else {
     estaLogueado.value = false;

    }
  });


</script>


<template>
      <header>
            <RouterLink id="home" to="/"><img id="logo" src="../views/concepto/logo.JPG" alt="logo img"></RouterLink>
            <div id="div--i">
                <!-- <RouterLink to="/registro"><i id="usuario" class="fa fa-user-circle-o"></i></RouterLink> -->
                <RouterLink v-if="!estaLogueado" to="/inicioSesion"><i id="usuario" class="fa fa-user-circle-o"></i></RouterLink>
                <RouterLink v-else  to="/inicioSesion"><i class="fa fa-sign-out" aria-hidden="true"></i></RouterLink>
                <RouterLink v-if="estaLogueado" to="/carrito"><i id="carrito" class="fa fa-shopping-cart"></i></RouterLink>            </div>
            <div id="nav">
                <ul>
                    <li id="mujer"><RouterLink to="/mujer">Mujer</RouterLink></li>
                    <!-- <li id="mujer">Mujer</li> -->
                    <li id="hombre"><RouterLink to="/hombre">Hombre</RouterLink></li>
                    <li id="joyeria"><RouterLink to="/joyeria">Joyeria</RouterLink></li>
                    <li id="electronica"><RouterLink to="/electronica">Electrónica</RouterLink></li>
                    <li v-if="estaLogueado" id="privado"><RouterLink to="/privado">Administración</RouterLink></li>
                </ul>
            </div>
        </header>
</template>