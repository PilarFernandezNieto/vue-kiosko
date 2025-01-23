<script setup>
import { RouterLink } from "vue-router";
import { watch, computed } from "vue";
import { useKioskoStore } from "@/stores/kioskoStore";
import { categorias } from "@/data/categorias";
const kioskoStore = useKioskoStore();
watch(
  () => kioskoStore.categorias, // Observar la propiedad `categorias`
  (newValue, oldValue) => {
    console.log("Categorías actualizadas:", newValue);
  },
  { deep: true } // Si los datos son objetos o arrays, usa deep para observar cambios internos.
);
</script>
<template>
  <div>
    <h1 class="text-4xl font-black">Categorías</h1>
    <p class="text-2xl my-10">Administra categorías desde aquí</p>
    <RouterLink
      :to="{ name: 'nueva-categoria' }"
      class="bg-indigo-600 hover:bg-indigo-800 rounded text-white py-2 px-4"
      >Nueva Categoría</RouterLink
    >
    <div class="w-2/3 bg-white shadow-md rounded-md mt-10 px-4 py-10 mx-auto">
      <div v-for="categoria in kioskoStore.categorias" :key="categoria.id">
        <div
          class="grid grid-cols-3 items-center border border-gray-200 p-4 mb-2 shadow"
        >
          <p class="text-lg">{{ categoria.nombre }}</p>
          <img
            :src="
              categoria.icono.startsWith('http')
                ? categoria.icono
                : `/img/icono_${categoria.icono}.svg`
            "
            :alt="`imagen_${categoria.nombre}`"
            class="w-16"
          />
          <div class="flex gap-4 justify-end">
            <RouterLink
              :to="{ name: 'home', params: { id: categoria.id } }"
              class="bg-indigo-600 hover:bg-indigo-800 rounded text-white py-2 px-4"
              >Editar</RouterLink
            >
            <button
              class="bg-red-600 hover:bg-red-800 rounded text-white py-2 px-4"
            >
              Eliminar
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
