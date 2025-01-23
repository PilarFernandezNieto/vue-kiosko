<script setup>
import { RouterLink } from "vue-router";
import { useRoute } from "vue-router";
import { useAuthStore } from "@/stores/authStore";
const authStore = useAuthStore();
const route = useRoute();
</script>
<template>
  <aside class="md:w-72 md:h-screen">
    <div class="p-4">
      <RouterLink :to="{ name: 'inicio' }">
        <img src="/img/logo.svg" alt="logo" class="w-40" />
      </RouterLink>
    </div>
    <nav class="flex flex-col p-4 space-y-4">
      <RouterLink :to="{ name: 'pedidos' }" class="font-bold text-2xl p-3" :class="route.name === 'pedidos' ?  'bg-amber-400 rounded' : ''"
        >Pedidos</RouterLink
      >
      <RouterLink :to="{ name: 'productos' }" class="font-bold text-2xl p-3" :class="route.name === 'productos' ?  'bg-amber-400 rounded' : ''"
        >Productos</RouterLink
      >
      <RouterLink :to="{ name: 'categorias' }" class="font-bold text-2xl p-3" :class="route.name === 'categorias' ?  'bg-amber-400 rounded' : ''"
        >Categorías</RouterLink
      >
    </nav>
    <div class="my-5 px-5">
      <button
        class="text-center bg-red-500 w-full p-3 font-bold text-white truncate rounded"
        type="button"
        @click="authStore.logout"
      >
        Cerrar Sesión
      </button>
    </div>
  </aside>
</template>
