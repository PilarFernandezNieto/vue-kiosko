<script setup>
import { computed, onMounted, ref } from "vue";
import { useQueryClient, useQuery } from "@tanstack/vue-query";
import clienteAxios from "@/config/axios";
import { useKioskoStore } from "@/stores/kioskoStore";
import Producto from "@/components/Producto.vue";

const kiosko = useKioskoStore();
const getProductos = async () => {
  try {
    const { data } = await clienteAxios("/api/productos");
    return data.data;
  } catch (error) {
    throw new Error("No se pudieron cargar los productos");
  }
};

const {
  data: productos,
  isLoading,
  isError,
  error,
} = useQuery({
  queryKey: ["productos"], // Clave única para esta consulta
  queryFn: getProductos, // Función que realiza la solicitud
  refetchInterval:3000
});

const productosCategoria = computed(() =>
  (productos.value || []).filter(
    (producto) => producto.categoria_id === kiosko.categoriaActual.id
  )
);
</script>

<template>
  <div v-if="isLoading">Cargando productos...</div>
  <div v-else-if="isError">Error al cargar productos: {{ error.message }}</div>
  <div v-else>
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
