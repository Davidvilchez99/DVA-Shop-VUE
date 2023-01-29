<script setup>
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { auth, storage} from '../firebase.js'
import {ref} from 'vue'
// import { getStorage, ref as ref2, uploadBytes, getDownloadURL } from "firebase/storage";
import { productosRef } from '../firebase.js'
import productoPrivado from './productoPrivado.vue'
import {router} from '../main.js'
var productosPrivados = ref([]);
productosPrivados.value = productosRef.value;


var nombreUsuario = ref("");
onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      const uid = user.uid;
      nombreUsuario.value = user.email;

      // ...
    } else {
      // User is signed out
      // ...
    }
  });

  function cerrarSesion(){
    signOut(auth).then(() => {
    // Sign-out successful.
    router.push('/inicioSesion');
    }).catch((error) => {
    // An error happened.
    });
  }
  function crearProducto(){
    router.push('/productoNuevo');
  }

// var file = ref();
//   function subirArchivo(){
//     const storageRef = ref2(storage, 'imagen');

//     uploadBytes(storageRef, file.value.files[0].name).then((snapshot) => {
//       console.log('Uploaded a blob or file!');

//       getDownloadURL(storageRef)
//       .then((url) => {
//         console.log(url);
//       })
//     });
//   }

</script>

<template>
    <h2>ZONA PRIVADA</h2>
    <h2>Bienvenido {{ nombreUsuario }}</h2> <button @click="cerrarSesion">Salir</button>
    <button @click="crearProducto">Producto nuevo</button>
      <div class="div--container" style="gap: 1%;">
        <productoPrivado :productosPrivados = "productosPrivados"/>
      </div>

    <!-- <label for="">Subir archivo</label>
    <input ref="file" @change="subirArchivo" type="file"> -->
</template>