<script setup>
import { useQuery } from "@tanstack/vue-query";
import clienteAxios from "@/config/axios";
import { VueSpinner } from "vue3-spinners";
import Producto from "@/components/Producto.vue";

const token = localStorage.getItem("AUTH_TOKEN");
const {
  data: productos,
  isLoading,
  isError,
  error,
  refetch,
} = useQuery({
  queryKey: ["productos"],
  queryFn: async () => {
    const { data } = await clienteAxios.get("/api/productos", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data.data;
  },
  refetchInterval: 5000
});
</script>
<template>
  <div>
    <h1 class="text-4xl font-black">Productos</h1>
    <p class="text-2xl my-10">Administra productos desde aquí</p>
    <div v-if="isLoading" class="flex justify-center">
      <VueSpinner size="40" color="#16a34a" />
    </div>
    <div class="grid gap-4 grid-cols-1 md:grid-cols-3 2xl:grid-cols-4 md:p-10">

      <div v-for="producto in productos" :key="producto.id">
        <Producto :producto="producto" :botonDisponible="true" />
      </div>
    </div>
  </div>
</template>
