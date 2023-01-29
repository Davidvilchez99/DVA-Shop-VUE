import { createApp } from 'vue'
import {ref} from 'vue'
import App from './App.vue'
import home from './views/HomeView.vue'
import mujer from './views/MujerView.vue'
import hombre from './views/HombreView.vue'
import niño from './views/NiñoView.vue'
import producto from './views/ProductoView.vue'
import productoPrivado from './views/ProductoPrivadoView.vue'
import registro from './views/RegistroView.vue'
import joyeria from './views/joyeriaView.vue'
import electronica from './views/ElectronicaView.vue'
import carrito from './views/CarritoView.vue'
import productoNuevo from './views/productoNuevoView.vue'
import inicioSesion from './components/inicioSesion.vue'
// import registro from './components/registro.vue'
import privado from './components/privado.vue'
import { createRouter, createWebHistory } from 'vue-router'
import './assets/index.css'
import { onAuthStateChanged } from 'firebase/auth'
import { auth} from './firebase.js'
import { firebaseApp } from './firebase'

import { VueFire, VueFireAuth } from 'vuefire'
const miapp = createApp(App);

// app.use(router)

// app.mount('#page')

miapp
  .use(VueFire, {
    // imported above but could also just be created here
    firebaseApp,
    modules: [
      // we will see other modules later on
      VueFireAuth(),
    ],
  });
export var estaAutenticado = false;
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      const uid = user.uid;
      estaAutenticado = true;
      // ...
    } else {
      // User is signed out
      // ...
      estaAutenticado = false;
    }
  });



const routes = [
    {
        path: '/',
        name: "home",
        component: home
    },
    {
        path: '/mujer',
        name: "mujer",
        component: mujer
    },
    {
        path: '/producto/:id',
        name: "producto",
        component: producto
    },
    {
        path: '/hombre',
        name: "hombre",
        component: hombre
    },
    {
        path: '/registro',
        name: "registro",
        component: registro
    },
    {
        path: '/carrito',
        name: "carrito",
        component: carrito
    },
    {
        path: '/niño',
        name: "niño",
        component: niño
    },
    {
      path: '/joyeria',
      name: "joyeria",
      component: joyeria
    },
    {
      path: '/electronica',
      name: "electronica",
      component: electronica
  },
    {
        path: '/inicioSesion',
        name: "inicioSesion",
        component: inicioSesion
    },
    {
        path: '/privado',
        name: "privado",
        component: privado,
        beforeEnter: (to, from) => {
            if (estaAutenticado)
                return true
            else
                return false
        }
    },
    {
      path: '/productoPrivado/:id',
      name: "productoPrivado",
      component: productoPrivado
    },
    {
      path: '/productoNuevo',
      name: "productoNuevo",
      component: productoNuevo
    }

    
]

export const router = createRouter({
    history: createWebHistory(),
    routes
})



miapp.use(router).mount('#page')

