<script setup>
import { productos as productosDB } from "@/data/productos";
import Producto from "@/components/Producto.vue";
import { useKioskoStore } from "@/stores/kioskoStore";
import { computed } from "vue";

const kiosko = useKioskoStore();
const productos = computed(() =>
  productosDB.filter(
    (producto) => producto.categoria_id === kiosko.categoriaActual.id
  )
);
</script>

<template>
  <h1 class="text-4xl font-black">{{ kiosko.categoriaActual.nombre }}</h1>
  <p class="text-2xl my-10">Elige y personaliza tu pedido a continuación</p>
  <div class="grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
    <div v-for="producto in productos" :key="producto.id">
      <Producto :producto="producto" />
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
