<script setup>
import { RouterView } from "vue-router";
import AdminSidebar from "@/components/AdminSidebar.vue";
</script>
<template>
  <div class="md:flex">
    <AdminSidebar />
    <main class="flex-1 h-screen overflow-y-scroll bg-gray-100 p-3">
      <RouterView />
    </main>
    
  </div>
</template>

<style lang="scss" scoped></style>
