<script setup>
import SubmitInput from "@/components/SubmitInput.vue";
import { RouterLink } from "vue-router";
</script>
<template>
    <h1 class="text-4xl font-black">Iniciar sesión</h1>
    <p>Para hacer un pedido debes iniciar sesión</p>
    <div class="bg-white shadow-md rounded-md mt-10 px-4 py-10">
      <form action="">

        <div class="mb-4">
          <label for="email" class="text-slate-800">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Tu email"
            class="mt-2 w-full p-3 bg-gray-50 border border-gray-200 rounded-md"
          />
        </div>
        <div class="mb-4">
          <label for="password" class="text-slate-800">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Tu password"
            class="mt-2 w-full p-3 bg-gray-50 border border-gray-200 rounded-md"
          />
        </div>

        <SubmitInput value="Iniciar sesión" />
      </form>
    </div>
    <nav class="mt-5">
        <RouterLink :to="{name: 'registro'}">¿No tienes cuenta? Crea una aquí</RouterLink>
    </nav>
  </template>



<style lang="scss" scoped>

</style>