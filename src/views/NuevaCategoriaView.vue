<script setup>
import clienteAxios from "@/config/axios";
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { useKioskoStore } from "@/stores/kioskoStore";
import SubmitInput from "@/components/SubmitInput.vue";
import { useToastStore } from "@/stores/toastStore";

const kioskoStore = useKioskoStore();
const toast = useToastStore();
const router = useRouter();
const datos = reactive({
  nombre: "",
  icono: null,

});
const token = localStorage.getItem("AUTH_TOKEN");
console.log("token", token);


const handleImageChange = (e) => {
  datos.icono = e.target.files[0];
  console.log(icono.value);
};

const submitForm = async () => {
  const formData = new FormData();
  formData.append("nombre", datos.nombre);
  formData.append("icono", datos.icono);
  // Verificar el contenido del FormData
  formData.forEach((value, key) => {
    console.log(key, value);
  });
  try {
    const { data } = await clienteAxios.post("/api/admin/categorias", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
    toast.mostrarExito(data.message);
    router.push({ name: "categorias" });
    console.log(data);
  } catch (error) {
    console.error(error);
  }
};
</script>
<template>
  <div class="w-full h-screen flex overflow-hidden items-center justify-center">
    <form
      @submit.prevent="submitForm"
      class="w-2/3 bg-white shadow-md rounded-md mt-10 px-4 py-10"
    >
      <div class="mb-4">
        <label for="nombre" class="text-slate-800">Categoria</label>
        <input
          type="text"
          id="nombre"
          name="nombre"
          placeholder="Nombre de la categoria"
          class="mt-2 w-full p-3 bg-gray-50 border border-gray-200 rounded-md"
          v-model="datos.nombre"
        />
      </div>

      <div class="mb-4">
        <label for="icono" class="text-slate-800">Icono</label>
        <input
          type="file"
          @change="handleImageChange"
          id="icono"
          class="mt-2 w-full p-3 bg-gray-50 border border-gray-200 rounded-md"
        />
      </div>

      <SubmitInput value="Nueva Categoria"</SubmitInput>
    </form>
  </div>
</template>
