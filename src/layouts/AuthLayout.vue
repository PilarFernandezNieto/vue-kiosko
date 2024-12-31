<script setup>
import { RouterView } from "vue-router";
</script>
<template>
  <main class="max-w-4xl m-auto mt-10 md:mt-28 flex flex-col md:flex-row items-center">
    <img src="/public/img/logo.svg" alt="imagen logotipo" class="max-w-xs"/>
    
    <div class="p-10 w-full">
      <RouterView />
    </div>
  </main>
</template>

<style lang="scss" scoped></style>
