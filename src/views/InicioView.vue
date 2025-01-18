<script setup>
import { computed } from "vue";
import { useKioskoStore } from "@/stores/kioskoStore";
import Producto from "@/components/Producto.vue";

const kiosko = useKioskoStore();

const productosCategoria = computed(() =>
  (kiosko.productos || []).filter(
    (producto) => producto.categoria_id === kiosko.categoriaActual.id
  )
);
</script>

<template>

  <div>
    <h1 class="text-4xl font-black">{{ kiosko.categoriaActual.nombre }}</h1>
    <p class="text-2xl my-10">Elige y personaliza tu pedido a continuación</p>
    <div class="grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
      <div v-for="producto in productosCategoria" :key="producto.id">
        <Producto :producto="producto" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
