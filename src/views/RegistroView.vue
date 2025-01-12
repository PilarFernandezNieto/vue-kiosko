<script setup>
import { reactive, ref } from "vue";
import { RouterLink } from "vue-router";
import { useAuthStore } from "@/stores/authStore";
import SubmitInput from "@/components/SubmitInput.vue";
import Alerta from "@/components/Alerta.vue";


const authStore = useAuthStore();


const datos = reactive({
  name: "",
  email: "",
  password: "",
  password_confirmation: "",
});
const errores = ref({});

const handleSubmit = async () => {
  authStore.registro(datos, errores)
};
</script>
<template>
  <h1 class="text-4xl font-black">Crea tu cuenta</h1>
  <p class="">Crea tu cuenta completando el formulario</p>
  <div class="bg-white shadow-md rounded-md mt-5 px-4 py-10">
    <form action="" @submit.prevent="handleSubmit" method="post" novalidate>
      <div v-if="errores" class="my-4">
        <div v-for="(error, index) in errores" :key="index">
          <Alerta v-if="error.length < 2"> {{ error[0] }}</Alerta>
          <div v-if="error.length >= 2">
            <Alerta v-for="(errorPassword, index) in error" :key="index">{{
              errorPassword
            }}</Alerta>
          </div>
        </div>
      </div>
      <div class="mb-4">
        <label for="name" class="text-slate-800">Nombre</label>

        <input
          type="text"
          id="name"
          name="name"
          placeholder="Tu nombre"
          class="mt-2 w-full p-3 bg-gray-50 border border-gray-200 rounded-md"
          v-model="datos.name"
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
          v-model="datos.email"
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
          v-model="datos.password"
        />
        <div v-if="errores">
          <p v-for="errorPassword in errores.password">
            {{ errorPassword[0] }}
          </p>
        </div>
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
          v-model="datos.password_confirmation"
        />
      </div>
      <SubmitInput value="Crear cuenta" />
    </form>
  </div>
  <nav class="mt-5">
    <RouterLink :to="{ name: 'login' }"
      >¿Ya tienes cuenta? Inicia sesión</RouterLink
    >
  </nav>
</template>

<style lang="scss" scoped></style>
