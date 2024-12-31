<script setup>
import { watch } from "vue";
import { RouterView } from "vue-router";
import Sidebar from "@/components/Sidebar.vue";
import Resumen from "@/components/Resumen.vue";
import { useKioskoStore } from "@/stores/kioskoStore";

const kiosko = useKioskoStore();
watch(() => kiosko.modal, (nuevoValor) => {
  console.log("El modal cambió:", nuevoValor);
});

</script>
<template>
  <div class="md:flex">
    <Sidebar />
    <main class="flex-1 h-screen overflow-y-scroll bg-gray-100 p-3">
      <RouterView />
    </main>
    <Resumen />
  </div>
</template>

<style lang="scss" scoped></style>
