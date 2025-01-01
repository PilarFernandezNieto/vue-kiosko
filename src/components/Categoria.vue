<script setup>
import { useKioskoStore } from "@/stores/kioskoStore";

const kiosko = useKioskoStore();

defineProps({
  categoria: {
    type: Object,
    required: true,
  },
});

const resaltarCategoriaActual = (categoria) =>
  kiosko.categoriaActual?.id === categoria.id ? "bg-amber-400" : "bg-white";
</script>
<template>
  <div
    class="flex items-center gap-4 border w-full p-3 hover:bg-amber-400 cursor-pointer"
    :class="resaltarCategoriaActual(categoria)"
    @click="kiosko.seleccionarCategoria(categoria.id)"
  >
    <img
      :src="`/img/icono_${categoria.icono}.svg`"
      alt="icono_{{ categoria.nombre }}"
      class="w-12"
    />
    <p class="text-lg font-bold cursor-pointer truncate">
      {{ categoria.nombre }}
    </p>
  </div>
</template>

<style lang="scss" scoped></style>
