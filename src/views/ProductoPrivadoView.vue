<script setup>
import { collection, addDoc, deleteDoc, doc, updateDoc, setDoc, query, where } from 'firebase/firestore'
import {ref} from 'vue'
import {useRoute} from 'vue-router'
import { productosRef } from '../firebase.js'
import { storage} from '../firebase.js'

// import { getStorage, ref as ref2, uploadBytes, getDownloadURL } from "firebase/storage";
import { useFirestore } from 'vuefire'
const db = useFirestore()
const router = useRoute();
var productoPrivado = ref([]);
var talla = ref("");
var cantidad = ref(1);
productoPrivado.value = productosRef.value.filter(producto => producto.id ==  router.params.id);
var Nombre = ref(productoPrivado.value[0].title);
var Valoracion = ref(productoPrivado.value[0].rating);
var Precio = ref(productoPrivado.value[0].price);
var Categoria = ref(productoPrivado.value[0].category);
var Descripcion = ref(productoPrivado.value[0].description);
const productoPrivadoRef = doc(db, "productos", productoPrivado.value[0].id);
function editarProducto(){
    updateDoc(productoPrivadoRef, {
        "title": Nombre.value,
        "rating": Valoracion.value,
        "price": Precio.value,
        "category": Categoria.value,
        "description": Descripcion.value
        })

        alert("Producto editado");
}
function eliminarProducto(){
    deleteDoc(doc(db, "productos", productoPrivado.value[0].id));
    alert("Producto eliminado");
    // router.push('/privado');
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
<div id="product--container">
        <div id="imagenes">
            <img :src=productoPrivado[0].image alt="">
        </div>
        <div id="info">
            <div id="registro">
                <h2>Edita el producto</h2>
            <input placeholder="Nombre" type="text" v-model="Nombre"><br>
            <textarea name="" id="" cols="30" rows="10" v-model="Descripcion"></textarea>
            <input placeholder="Valoracion" type="number" v-model="Valoracion"><br>
            <input placeholder="Precio" type="number" v-model="Precio"><br>
            <input placeholder="Categoria" type="text" v-model="Categoria"><br>
        <input @click="editarProducto" type="submit" id="editar-submit" value="Editar"/>
        </div>
            <i @click="eliminarProducto" class="fa fa-trash" style="font-size:36px" aria-hidden="true"></i>
        </div>
        </div>
</template>
