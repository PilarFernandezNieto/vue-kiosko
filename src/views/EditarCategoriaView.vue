<script setup>
import { computed, onMounted, ref } from "vue";
import clienteAxios from "@/config/axios";
import { useRoute, useRouter } from "vue-router";
import { useKioskoStore } from "@/stores/kioskoStore";
import { useToastStore } from "@/stores/toastStore";
import SubmitInput from "@/components/SubmitInput.vue";

const route = useRoute();
const router = useRouter();
const kioskoStore = useKioskoStore();
const toast = useToastStore();

const token = localStorage.getItem("AUTH_TOKEN");
const nuevoIcono = ref(null);

const categoria = ref({});

onMounted(() => {
  cargarCategoria();
});

const handleImageChange = (event) => {
  nuevoIcono.value = event.target.files[0];
};

const submitForm = async () => {
  const formData = new FormData();
  formData.append("_method", "PUT");
  formData.append("nombre", categoria.value.nombre);

  if (nuevoIcono.value) {
    formData.append("icono", nuevoIcono.value);
  }
  try {
    console.log("Headers enviados:", {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    });

    const { data } = await clienteAxios.post(
      `/api/admin/categorias/${categoria.value.id}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("Data desde editar categoria:", data);
    
    kioskoStore.actualizarCategoria(data.categoria);
    toast.mostrarExito(data.message);
    router.push({ name: "categorias" });
  } catch (error) {
    console.error("Error actualizando el categoria:", error);
  }
};

const cargarCategoria = async () => {
  try {
    const { data } = await clienteAxios.get(
      `/api/categorias/${route.params.id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    categoria.value = data;
  } catch (error) {
    console.log("Error desde crear categoria", error);
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
        <label for="nombre" class="text-slate-800">Categoría</label>
        <input
          type="text"
          id="nombre"
          name="nombre"
          placeholder="Nombre de la categoria"
          class="mt-2 w-full p-3 bg-gray-50 border border-gray-200 rounded-md"
          v-model="categoria.nombre"
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
      <div class="mb-4">
        <img :src="categoria.icono" alt="icono" class="w-40" />
      </div>

      <SubmitInput value="Editar Categoría"></SubmitInput>
    </form>
  </div>
</template>
