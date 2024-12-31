<script setup>
import SubmitInput from "@/components/SubmitInput.vue";
import { RouterLink } from "vue-router";

function handleSubmit(e) {
  e.preventDefault();
  console.log("Formulario enviado");
}
</script>
<template>
  <h1 class="text-4xl font-black">Crea tu cuenta</h1>
  <p class="">Crea tu cuenta completando el formulario</p>
  <div class="bg-white shadow-md rounded-md mt-10 px-4 py-10">
    <form action="">
      <div class="mb-4">
        <label for="name" class="text-slate-800">Nombre</label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Tu nombre"
          class="mt-2 w-full p-3 bg-gray-50 border border-gray-200 rounded-md"
        />
      </div>
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
      <div class="mb-4">
        <label for="password_confirmation" class="text-slate-800"
          >Repetir password</label
        >
        <input
          type="password"
          id="password_confirmation"
          name="password_confirmation"
          placeholder="Repetir password"
          class="mt-2 w-full p-3 bg-gray-50 border border-gray-200 rounded-md"
        />
      </div>
      <SubmitInput value="Crear cuenta" @click="handleSubmit" />
    </form>
  </div>
  <nav class="mt-5">
        <RouterLink :to="{name: 'login'}">¿Ya tienes cuenta? Inicia sesión</RouterLink>
    </nav>
</template>

<style lang="scss" scoped></style>
