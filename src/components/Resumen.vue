<script setup>
import { computed, watch, ref } from "vue";
import { useKioskoStore } from "@/stores/kioskoStore";
import { formatearMoneda } from "@/helpers";
import SubmitInput from "./SubmitInput.vue";
import ResumenProducto from "./ResumenProducto.vue";
const kiosko = useKioskoStore();

const comprobarPedido = ref("");

const total = computed(() =>
  kiosko.pedido.reduce(
    (total, producto) => producto.precio * producto.cantidad + total,
    0
  )
);
watch(
  () => kiosko.pedido.length,
  () => {
    if (kiosko.pedido.length === 0) {
      comprobarPedido.value = true;
    } else {
      comprobarPedido.value = false;
    }
  }
);
const handleSubmit = () => {
  console.log(total.value);
  kiosko.crearPedido(total.value);
};
</script>
<template>
  <aside class="w-72 h-screen overflow-y_scroll p-5">
    <h1 class="text-4xl font-black">Mi Pedido</h1>
    <p class="text-lg my-5">Podrás ver el resumen y totales de tu pedido</p>
    <div class="py-5">
      <p v-if="kiosko.pedido.length === 0" class="text-center text-2xl">
        No hay elementos en el pedido
      </p>
      <div v-else v-for="producto in kiosko.pedido" :key="producto.id">
        <ResumenProducto :producto="producto" />
      </div>
    </div>
    <p class="mt-10 text-xl">Total: {{ formatearMoneda(total) }}</p>
    <form @submit.prevent="handleSubmit" class="w-full">
      <div class="mt-5">
        <SubmitInput :disabled="comprobarPedido" value="Confirmar pedido" />
      </div>
    </form>
  </aside>
</template>

<style lang="scss" scoped></style>
