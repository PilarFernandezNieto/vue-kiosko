<script setup>
import { RouterView } from "vue-router";
import Sidebar from "@/components/Sidebar.vue";
import Resumen from "@/components/Resumen.vue";
import Modal from "@/components/Modal.vue";
import { useKioskoStore } from "@/stores/kioskoStore";

const kiosko = useKioskoStore();

</script>
<template>
  <div class="md:flex">
    <Sidebar />
    <main class="flex-1 h-screen overflow-y-scroll bg-gray-100 p-3">
      <RouterView />
    </main>
    <Resumen />
  </div>
  <Modal v-if="kiosko.modal" :modal="kiosko.modal" />
  
</template>

<style lang="scss" scoped></style>
