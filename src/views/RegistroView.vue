<script setup>
import {ref} from 'vue'
import {  createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import {auth} from '../firebase.js'




var usuario = ref("");
var contraseña =ref("");

function altaUsuario(){
    createUserWithEmailAndPassword(auth, usuario.value, contraseña.value)
    // signInWithEmailAndPassword(auth, usuario.value, contraseña.value)
    // signInWithPopup(auth, new GoogleAuthProvider())
        .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        // ...
    })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // ..
    });
}
// function altaUsuarioGoogle(){
//     // createUserWithEmailAndPassword(auth, usuario.value, contraseña.value)
//     // signInWithEmailAndPassword(auth, usuario.value, contraseña.value)
//     signInWithPopup(auth, new GoogleAuthProvider())
//         .then((userCredential) => {
//         // Signed in 
//         const user = userCredential.user;
//         // ...
//     })
//         .catch((error) => {
//             const errorCode = error.code;
//             const errorMessage = error.message;
//             // ..
//     });
// }
</script>

<template>




    <div id="user--div">
        <div id="registro">
            <h2>Registrarse</h2>
            <input placeholder="Usuario" type="text" v-model="usuario"><br>
            <input placeholder="Contraseña" type="password" v-model="contraseña"><br>
    <input @click="altaUsuario" type="submit" id="registrarse-submit" value="Registrarse"/>
        </div>
        <div id="registrarse">
        <h2>Inicio de sesión</h2>
        <input placeholder="Usuario" type="text" ><br>
            <input placeholder="Contraseña" type="password"><br>
    <input type="submit" id="registrarse-submit" value="Registrarse"/>
    </div>
    </div>
</template>