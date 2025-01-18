<script setup>
import { useQuery } from "@tanstack/vue-query";
import clienteAxios from "@/config/axios";

const token = localStorage.getItem("AUTH_TOKEN");
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
});
console.log(pedidos.value);
</script>
<template>
  <div>
    <h1 class="text-4xl font-black">Pedidos</h1>
    <p class="text-2xl my-10">Administra pedidos desde aquí</p>
    
    {{ pedidos }}
  </div>
</template>
