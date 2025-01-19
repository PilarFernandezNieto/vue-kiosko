<script setup>
import { useQuery } from "@tanstack/vue-query";
import clienteAxios from "@/config/axios";
import { VueSpinner } from "vue3-spinners";
import Producto from "@/components/Producto.vue";
import { computed, ref } from "vue";

const token = localStorage.getItem("AUTH_TOKEN");
const currentPage = ref(1);

const {
  data: productos,
  isLoading,
  isError,
  error,
  refetch,
} = useQuery({
  queryKey: ["productos", currentPage],
  queryFn: async ({ queryKey }) => {
    const page = queryKey[1];
    const { data } = await clienteAxios.get(
      `/api/admin/productos?page=${page}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(data)
    return data;
  },
  refetchInterval: 5000,
  keepPreviousData: true,
});

const productosAll = computed(() => productos?.value?.data || []);
const totalPages = computed(() => productos?.value?.meta.last_page || 1);
</script>
<template>
  <div>
    <h1 class="text-4xl font-black">Productos</h1>
    <p class="text-2xl my-10">Administra productos desde aquí</p>
    <div v-if="isLoading" class="flex justify-center">
      <VueSpinner size="40" color="#16a34a" />
    </div>
    <div class="grid gap-4 grid-cols-1 md:grid-cols-3 md:p-10">
      <div v-for="producto in productosAll" :key="producto.id">
        <Producto :producto="producto" :botonDisponible="true" />
      </div>
    </div>

    <!-- Paginación -->
    <div class="flex justify-center items-center space-x-2 mt-4">
      <button
        :disabled="currentPage === 1"
        @click="currentPage--"
        class="px-4 py-2 bg-indigo-600 hover:bg-indigo-800 text-white font-bold rounded"
      >
        Anterior
      </button>
      <!-- Botones de páginas numeradas -->
      <div class="flex space-x-1">
        <button
          v-for="page in totalPages"
          :key="page"
          :disabled="page === currentPage"
          @click="currentPage = page"
          class="px-3 py-2 border rounded hover:bg-indigo-300"
        >
          {{ page }}
        </button>
      </div>

      <button
        :disabled="currentPage === totalPages"
        @click="currentPage++"
        class="px-4 py-2 bg-indigo-600 hover:bg-indigo-800 text-white font-bold rounded"
      >
        Siguiente
      </button>
    </div>
    <div class="text-center mt-4 text-sm">
      <span>Página {{ currentPage }} de {{ totalPages }}</span>
    </div>
    
  </div>
</template>
