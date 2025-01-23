<script setup>
import clienteAxios from "@/config/axios";
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { useKioskoStore } from "@/stores/kioskoStore";
import SubmitInput from "@/components/SubmitInput.vue";
import { useToastStore } from "@/stores/toastStore";

const kioskoStore = useKioskoStore();
const router = useRouter();
const toast = useToastStore();
const datos = reactive({
  nombre: "",
  imagen: null,
  precio: 0,
  disponible: 0,
  categoria_id: "",
});
const token = localStorage.getItem("AUTH_TOKEN");

const handleImageChange = (e) => {
  datos.imagen = e.target.files[0];
  console.log(imagen.value);
};

const submitForm = async () => {
  const formData = new FormData();
  formData.append("nombre", datos.nombre);
  formData.append("imagen", datos.imagen);
  formData.append("precio", datos.precio);
  formData.append("disponible", datos.disponible ? 1 : 0);
  formData.append("categoria_id", datos.categoria_id);
  // Verificar el contenido del FormData
  formData.forEach((value, key) => {
    console.log(key, value);
  });
  try {
    const { data } = await clienteAxios.post("/api/admin/productos", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
    toast.mostrarExito(data.message);
    router.push({ name: "productos" });
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
        <label for="nombre" class="text-slate-800">Producto</label>
        <input
          type="text"
          id="nombre"
          name="nombre"
          placeholder="Nombre del producto"
          class="mt-2 w-full p-3 bg-gray-50 border border-gray-200 rounded-md"
          v-model="datos.nombre"
        />
      </div>
      <div class="mb-4">
        <label for="precio" class="text-slate-800">Precio</label>
        <input
          type="number"
          id="precio"
          name="precio"
          placeholder="Precio del producto"
          class="mt-2 w-full p-3 bg-gray-50 border border-gray-200 rounded-md"
          v-model="datos.precio"
        />
      </div>
      <div class="mb-4">
        <label for="imagen" class="text-slate-800">Imagen</label>
        <input
          type="file"
          @change="handleImageChange"
          id="imagen"
          class="mt-2 w-full p-3 bg-gray-50 border border-gray-200 rounded-md"
        />
      </div>
      <div class="lg:grid lg:grid-cols-3 items-center">
        <div class="flex items-center justify-around mb-4 lg:mb-0">
          <label for="disponible" class="text-slate-800">Disponible</label>
          <input
            type="checkbox"
            id="disponible"
            name="disponible"
            class="mt-2 p-3 bg-gray-50 border border-gray-200 rounded-md"
            v-model="datos.disponible"
          />
        </div>
        <div class="col-span-2 flex items-center justify-around gap-4">
          <label for="categoria" class="text-slate-800">Categoría</label>
          <select
            name="categoria"
            id="categoria"
            v-model="datos.categoria_id"
            class="p-3 w-full bg-gray-50 border border-gray-200 rounded-md"
          >
            <option value="0">--Selecciona categoría--</option>
            <option
              v-for="categoria in kioskoStore.categorias"
              :key="categoria.id"
              :value="categoria.id"
            >
              {{ categoria.nombre }}
            </option>
          </select>
        </div>
      </div>
      <SubmitInput value="Nuevo Producto">Enviar Producto</SubmitInput>
    </form>
  </div>
</template>
