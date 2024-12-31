<script setup>
import { defineProps } from "vue";
import { formatearMoneda } from "@/helpers";

const props = defineProps({
  producto: {
    type: Object,
    required: true,
  },
});
const { nombre, imagen, precio } = props.producto;
</script>

<template>
  <div class="border p-3 shadow bg-white">
    <img :src="`/img/${imagen}.jpg`" :alt="`imagen_${nombre}`" class="w-full" />
    <div class="py-5">
      <h3 class="text-2xl font-bold xl:min-h-24">{{ nombre }}</h3>
      <p class="mt-5 font-black text-4xl text-amber-500">
        {{ formatearMoneda(precio) }}
      </p>
      <button type="button" class="bg-indigo-600 hover:bg-indigo-800 text-white w-full mt-5 p-3 uppercase font-bold rounded-sm">Añadir</button>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
