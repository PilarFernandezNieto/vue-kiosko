<script setup>
import { computed, onMounted, ref } from "vue";
import { useKioskoStore } from "@/stores/kioskoStore";
import { useQuery } from "@tanstack/vue-query";
import clienteAxios from "@/config/axios";
import { VueSpinner } from "vue3-spinners";
import Producto from "@/components/Producto.vue";

const kiosko = useKioskoStore();
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

const productosCategoria = computed(() =>
  (productos.value || []).filter(
    (producto) => producto.categoria_id === kiosko.categoriaActual.id
  )
);
</script>

<template>
  <div>
    <h1 class="text-4xl font-black">{{ kiosko.categoriaActual.nombre }}</h1>
    <p class="text-2xl my-10">Elige y personaliza tu pedido a continuación</p>
    <div v-if="isLoading" class="flex justify-center">
      <VueSpinner size="40" color="#16a34a" />
    </div>
    <div class="grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
      <div v-for="producto in productosCategoria" :key="producto.id">
        <Producto :producto="producto" :boton-agregar="true"/>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
