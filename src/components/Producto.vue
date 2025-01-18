<script setup>
import { formatearMoneda } from "@/helpers";
import { useKioskoStore } from "@/stores/kioskoStore";

const kiosko = useKioskoStore();

defineProps({
  producto: {
    type: Object,
    required: true,
  },
  botonAgregar: {
    type: Boolean,
    default: false,
  },
  botonDisponible: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <div class="border p-3 shadow bg-white">
    <img
      :src="`/img/${producto.imagen}.jpg`"
      :alt="`imagen_${producto.nombre}`"
      class="w-full"
    />
    <div class="py-5">
      <h3 class="text-2xl font-bold md:min-h-24">{{ producto.nombre }}</h3>
      <p class="mt-5 font-black text-4xl text-amber-500">
        {{ formatearMoneda(producto.precio) }}
      </p>

      <button
        v-if="botonAgregar"
        type="button"
        class="bg-indigo-600 hover:bg-indigo-800 text-white w-full mt-5 p-3 uppercase font-bold rounded-md"
        @click="kiosko.toggleModal(), kiosko.seleccionarProducto(producto)"
      >
        Añadir
      </button>
      <button
        v-if="botonDisponible"
        type="button"
        class="bg-indigo-600 hover:bg-indigo-800 text-white w-full mt-5 p-3 uppercase font-bold rounded-md"
        @click=""
      >
        Producto Agotado
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
