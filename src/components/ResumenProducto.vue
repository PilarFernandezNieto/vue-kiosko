<script setup>
import { formatearMoneda } from '@/helpers';
import { useKioskoStore } from '@/stores/kioskoStore';

const kiosko = useKioskoStore();

defineProps({
  producto: {
    type: Object,
    required: true,
  },
});
</script>
<template>
  <div class="shadow p-4 bg-white">
    <div class="space-y-2">
      <p class="text-xl font-bold">{{ producto.nombre }}</p>
      <p class="text-lg font-bold">Cantidad: {{ producto.cantidad }}</p>
      <p class="text-lg font-bold text-amber-500">Precio: {{ formatearMoneda(producto.precio) }}</p>
      <p class="text-lg text-gray-700">Subtotal {{ formatearMoneda(producto.precio * producto.cantidad) }}</p>
    </div>

    <div class="flex justify-between gap-2 pb-4 mt-4">
      <button
        type="button"
        class="bg-sky-700 p-2 text-white rounded-md font-bold uppercase shadow-md text-center"
        @click="kiosko.editarCantidad(producto.id)"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"
          />
        </svg>
      </button>
      <button
        type="button"
        class="bg-red-700 p-2 text-white rounded-md font-bold uppercase shadow-md text-center"
        @click="kiosko.eliminarProductoPedido(producto.id)"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="{2}"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
          />
        </svg>
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
