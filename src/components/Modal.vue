<script setup>
import { ref, computed } from "vue";
import { useKioskoStore } from "@/stores/kioskoStore";
import { formatearMoneda } from "@/helpers";
import { useToastStore } from "@/stores/toastStore";

const kiosko = useKioskoStore();
const toast = useToastStore();
const cantidad = ref(
  kiosko.pedido.find((producto) => producto.id === kiosko.producto.id)
    ? kiosko.pedido.find((producto) => producto.id === kiosko.producto.id)
        .cantidad
    : 1
);

defineProps({
  modal: {
    type: Boolean,
    required: true,
  },
});

const edicion = computed(() => {
  return kiosko.pedido.some((producto) => producto.id === kiosko.producto.id);
});

const incrementar = () => {
  if (cantidad.value >= 5) return;
  cantidad.value++;
};
const restar = () => {
  if (cantidad.value <= 1) return;
  cantidad.value--;
};
const agregarPedidoAResumen = () => {
  const existePedido = kiosko.pedido.findIndex(
    (producto) => producto.id === kiosko.producto.id
  );

  if (existePedido >= 0) {
    kiosko.pedido[existePedido].cantidad = cantidad.value;
    kiosko.agregarPedido(kiosko.pedido[existePedido]);
    kiosko.toggleModal();
    toast.mostrarExito("Producto actualizado en el pedido");
  } else {
    const pedido = {
      ...kiosko.producto,
      cantidad: cantidad.value,
    };
    kiosko.agregarPedido(pedido);
    kiosko.toggleModal();
    toast.mostrarExito("Producto añadido al pedido");
  }
};
</script>

<template>
  <div
    v-if="modal"
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
  >
    <div
      class="bg-white rounded-md shadow-lg w-full max-w-[40rem] transform transition-all duration-300 relative p-5"
      :class="modal ? 'scale-100 opacity-100' : 'scale-95 opacity-0'"
    >
      <button
        type="button"
        class="text-gray-500 hover:text-gray-800 absolute top-4 right-4"
        @click="kiosko.toggleModal"
      >
        <i class="fa-regular fa-circle-xmark text-2xl"></i>
      </button>
      <div class="md:flex gap-5">
        <div class="md:w-1/3">
          <img
            :src="`/img/${kiosko.producto.imagen}.jpg`"
            class="rounded-md"
            alt="`producto_${kiosko.producto.nombre}`"
          />
        </div>
        <div class="md:w-2/3 py-5">
          <h1 class="text-2xl font-bold">{{ kiosko.producto.nombre }}</h1>
          <p class="mt-5 font-black text-4xl text-amber-500">
            {{ formatearMoneda(kiosko.producto.precio) }}
          </p>
          <div class="flex gap-4 mt-5">
            <button @click="restar">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="size-5 text-gray-500 hover:text-gray-800"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
            </button>
            <p class="text-2xl">{{ cantidad }}</p>
            <button type="button" @click="incrementar">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="size-5 text-gray-500 hover:text-gray-800"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
            </button>
          </div>
          <button
            type="button"
            class="bg-indigo-600 text-white px-4 py-2 mt-5 rounded-md uppercase font-black hover:bg-indigo-800"
            @click="agregarPedidoAResumen"
          >
            {{ edicion ? "Guardar cambios" : "Agregar al pedido" }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
