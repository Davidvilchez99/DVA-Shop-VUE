<script setup>
import { collection, addDoc, deleteDoc, doc, updateDoc, setDoc, query, where } from 'firebase/firestore'

import {ref} from 'vue'
import { getStorage, ref as ref2, uploadBytes, getDownloadURL } from "firebase/storage";
import { useFirestore } from 'vuefire'
import { storage} from '../firebase.js'

const db = useFirestore()


var Nombre = ref("");
var Descripcion = ref("");
var Valoracion = ref("");
var Precio = ref();
var Categoria = ref("");
var Imagen = ref();

function crearProducto(){
  const nuevoProducto = {
    title: Nombre.value,
    description: Descripcion.value,
    rating: Valoracion.value,
    price: Precio.value,
    category: Categoria.value,
    image: Imagen.value,
  }
  const docRef = addDoc(collection(db, "productos"), nuevoProducto)
}
// var file = ref();
  function subirArchivo(e){
    const file = e.target.files[0]
    const storageRef = ref2(storage, file.name);

    uploadBytes(storageRef, file).then((snapshot) => {
      console.log('Uploaded a blob or file!');

      getDownloadURL(storageRef)
      .then((url) => {
        Imagen.value = url;
      })
    });
  }

  
</script>

<template>
    <div id="product--container">
        <div id="info">
            <div id="registro">
                <h2>Crear producto</h2>
                <input placeholder="Nombre" type="text" v-model="Nombre"><br>
                <textarea placeholder="Descripcion" v-model="Descripcion" name="" id="" cols="30" rows="10"></textarea>
                <input placeholder="Valoracion" type="number" v-model="Valoracion"><br>
                <input placeholder="Precio" type="number" v-model="Precio"><br>
                <input placeholder="Categoria" type="text" v-model="Categoria"><br>
                <label for="">Subir archivo</label>
                <input ref="file" @change="subirArchivo" type="file">
                <input @click="crearProducto" type="submit" id="crear-submit" value="crear" />
            </div>
        </div>
    </div>
</template>