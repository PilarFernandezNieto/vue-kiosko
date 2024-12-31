<script setup>
defineProps({
  categoria: {
    type: Object,
    required: true,
  },
});
</script>
<template>
  <div class="flex items-center gap-4 border w-full p-3 hover:bg-amber-400 cursor-pointer">
    <img :src=" `/img/icono_${categoria.icono}.svg` " alt="icono_{{ categoria.nombre }}" class="w-12" />
    <p class="text-lg font-bold cursor-pointer truncate">{{ categoria.nombre }}</p>
  </div>
</template>

<style lang="scss" scoped></style>
