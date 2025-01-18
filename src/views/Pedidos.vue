<script setup>
import { useQuery } from "@tanstack/vue-query";
import clienteAxios from "@/config/axios";
import { VueSpinner } from "vue3-spinners";
import { formatearMoneda } from "@/helpers";
import { useKioskoStore } from "@/stores/kioskoStore";

const token = localStorage.getItem("AUTH_TOKEN");
const kioskoStore = useKioskoStore();

const {
  data: pedidos,
  isLoading,
  isError,
  error,
  refetch,
} = useQuery({
  queryKey: ["pedidos"],
  queryFn: async () => {
    const { data } = await clienteAxios.get("/api/pedidos", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data.data;
  },
  refetchInterval: 5000,
});
</script>
<template>
  <div>
    <h1 class="text-4xl font-black">Pedidos</h1>
    <p class="text-2xl my-10">Administra pedidos desde aquí</p>
    <div v-if="isLoading" class="flex justify-center">
      <VueSpinner size="40" color="#16a34a" />
    </div>
    <div>
      <div
        v-for="pedido in pedidos"
        :key="pedido.id"
        class="p-5 bg-white shadow space-y-2 border-b mb-4 w-4/5 mx-auto"
      >
        <p class="text-xl font-bold text-slate-600">Contenido del pedido</p>
        <div
          v-for="producto in pedido.productos"
          :key="producto.id"
          class="border-b border-b-slate-200 last-of-type:border-none py-4"
        >
          <p class="text-sm">ID: {{ producto.id }}</p>
          <p>{{ producto.nombre }}</p>
          <p>
            Cantidad:
            <span class="font-bold">{{ producto.pivot.cantidad }}</span>
          </p>
        </div>

        <p class="text-lg font-bold text-slate-600">
          Cliente: <span class="font-normal">{{ pedido.user.name }}</span>
        </p>
        <p class="text-lg font-bold text-amber-500 mb-3">
          Total a pagar:
          <span class="font-normal text-slate-600">{{
            formatearMoneda(pedido.total)
          }}</span>
        </p>
        <button
          type="button"
          class="bg-indigo-600 hover:bg-indigo-800 px-5 py-2 rounded uppercase font-bold text-white text-center w-40 cursor-pointer"
          @click="kioskoStore.completarPedido(pedido.id)"
        >
          Completar
        </button>
      </div>
    </div>
  </div>
</template>
