<script setup>
import Categoria from "./Categoria.vue";
import { categorias } from "@/data/categorias";
</script>
<template>
  <aside class="md:w-72">
    <div class="p-4">
      <img src="/public/img/logo.svg" alt="imagen logo" class="w-40" />
    </div>
    <div class="mt-10">
      <div v-for="categoria in categorias" :key="categoria.id">
        <Categoria :categoria="categoria" />
      </div>
      <div class="my-5 px-5">
        <button class="text-center bg-red-500 w-full p-3 font-bold text-white truncate" type="button">Cancelar orden</button>
      </div>
    </div>
  </aside>
</template>

<style lang="scss" scoped></style>
