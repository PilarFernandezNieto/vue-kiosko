<script setup>
import { formatearMoneda } from "@/helpers";
import { useKioskoStore } from "@/stores/kioskoStore";
import { computed } from "vue";

const kiosko = useKioskoStore();

const props = defineProps({
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

const agotado = computed(() => !props.producto.disponible)



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
        class=" text-white w-full mt-5 p-3 uppercase font-bold rounded-md"  :class="[
          agotado ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-800 text-white'
        ]"
        @click="kiosko.productoAgotado(producto.id)"
      >
      {{ agotado ? 'Producto Agotado' : 'Producto Disponible' }} 
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
