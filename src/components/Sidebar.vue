<script setup>
import { computed, onMounted } from "vue";
import { RouterLink } from "vue-router";
import Categoria from "./Categoria.vue";
import { useKioskoStore } from "@/stores/kioskoStore";
import { useAuthStore } from "@/stores/authStore";

const kiosko = useKioskoStore();
const authStore = useAuthStore();
onMounted(() => {
  authStore.auth();
});

const userName = computed(() => authStore.user?.name || "");
const isAdmin = computed(() => authStore.user?.admin);
</script>
<template>
  <aside class="md:w-72">
    <div class="p-4">
      <img src="/img/logo.svg" alt="imagen logo" class="w-40" />
    </div>
    <p class="p-4 text-lg">Hola, {{ userName }}</p>
    
      <RouterLink
       v-if="isAdmin" class=" ml-4 p-2 text-lg font-medium border border-green-600 bg-green-300 text-green-600 rounded-md"
        :to="{ name: 'pedidos' }"
        >Panel Administración</RouterLink
      >
    

    <div class="mt-10">
      <div v-for="categoria in kiosko.categorias" :key="categoria.id">
        <Categoria :categoria="categoria" />
      </div>
      <div class="my-5 px-5">
        <button
          class="text-center bg-red-500 w-full p-3 font-bold text-white truncate"
          type="button"
          @click="authStore.logout"
        >
          Cancelar orden
        </button>
      </div>
    </div>
  </aside>
</template>

<style lang="scss" scoped></style>
