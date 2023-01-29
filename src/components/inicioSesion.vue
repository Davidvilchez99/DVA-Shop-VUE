<script setup>
import {ref} from 'vue'
import {  createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import {auth} from '../firebase.js'




var usuario = ref("");
var contraseña =ref("");

function altaUsuario(){
    // createUserWithEmailAndPassword(auth, usuario.value, contraseña.value)
    signInWithEmailAndPassword(auth, usuario.value, contraseña.value)
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
function altaUsuarioGoogle(){
    // createUserWithEmailAndPassword(auth, usuario.value, contraseña.value)
    // signInWithEmailAndPassword(auth, usuario.value, contraseña.value)
    signInWithPopup(auth, new GoogleAuthProvider())
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
</script>

<template>




    <div id="user--div">
        <div id="registro">
            <h2>Inicio se sesión</h2>
            <input placeholder="Usuario" type="text" v-model="usuario"><br>
            <input placeholder="Contraseña" type="password" v-model="contraseña"><br>
    <input @click="altaUsuario" type="submit" id="registrarse-submit" value="Registrarse"/>
    <i @click="altaUsuarioGoogle" class="fa fa-google" style="font-size: 25px;" aria-hidden="true"></i>
        </div>
        <div id="registrarse">
        <h2>Registrarse</h2>
        <input type="text" id="userName" placeholder="Nombre de usuario" required>
        <input type="text" id="name" placeholder="Nombre" required>
        <input type="text" id="surname" placeholder="Apellidos" required>
        <input type="tel" id="tel" pattern="[0-9]{9}" placeholder="Telefono" required>
        <input type="email" id="email-btn" placeholder="Correo" required>
        <input type="password" id="password" pattern="(?=^.{8,}$)((?=.*d)|(?=.*W+))(?![.
        ])(?=.*[A-Z])(?=.*[a-z]).*$" placeholder="Contraseña" required><br>
        <input type="submit" id="registrarse-submit" value="Registrarse">
        </div>
        <div id="registro--div--respuesta">
        <p id="p-registro-respuesta"></p>
        <p id="p2-registro-respuesta"></p>
    </div>
    </div>
</template>