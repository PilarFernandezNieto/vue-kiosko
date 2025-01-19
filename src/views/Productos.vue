<script setup>
import { useQuery } from "@tanstack/vue-query";
import clienteAxios from "@/config/axios";
import { VueSpinner } from "vue3-spinners";
import Producto from "@/components/Producto.vue";
import { computed, onMounted, ref } from "vue";
import Pagination from "v-pagination-3";

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
      `api/admin/productos?page=${page}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return data;
  },
  refetchInterval: 5000,
  keepPreviousData: true,
});
const productosAll = computed(() => {
  const result = productos?.value?.data || [];
  return result;
});

const totalPages = computed(() => {
  const result = productos?.value?.meta?.total || 59;
  return result;
});


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
    <pagination
      v-model="currentPage"
      :records="totalPages"
      :per-page="9"
      @paginate="onPaginate"
    />
  </div>
</template>
<style>
/* Contenedor general de la paginación */
.VuePagination {
  margin-top: 20px;
  display: flex;
  justify-content: center;
}

/* Estilos del contenedor de la lista de paginación */
.VuePagination__pagination {
  display: flex;
  list-style: none;
  padding: 0;
  margin: 0;
}

/* Estilo para cada página en la lista */
.VuePagination__pagination-item .page-link {
  padding: 10px 15px;
  margin: 0 5px;
  border-radius: 4px;
  border: 1px solid #ddd;
  background-color: #f9f9f9;
  color: #333;
  font-size: 14px;
  text-align: center;
  cursor: pointer;
  transition: background-color 0.3s;
}

/* Estilo para la página activa */
.VuePagination__pagination-item.active .page-link {
  border-color: #4f46e5;
  color: #333;
  font-weight: bold;
}

/* Estilo para los botones de "Anterior" y "Siguiente" */
.VuePagination__pagination-item-prev-page .page-link,
.VuePagination__pagination-item-next-page .page-link {
  background-color: #4f46e5; /* Cambia al color que prefieras */
  color: white;
  font-weight: bold;
  padding: 10px 15px;
  border-radius: 4px;
}

/* Cambiar el color de los botones cuando están deshabilitados */
.VuePagination__pagination-item.disabled .page-link {
  background-color: #f1f1f1;
  color: #aaa;
  cursor: not-allowed;
}

/* Efecto hover para los botones */
.VuePagination__pagination-item .page-link:hover {
  background-color: #f0f0f0;
  color: #333;
  text-decoration: none;
}

/* Estilos del conteo de registros (por ejemplo: "Showing 28 to 36 of 59 records") */
.VuePagination__count {
  margin-top: 10px;
  font-size: 14px;
  color: #333;
  text-align: center;
  font-weight: 500;
}
</style>
