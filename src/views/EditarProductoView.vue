<script setup>
import { computed, onMounted, ref } from "vue";
import clienteAxios from "@/config/axios";
import { useRoute, useRouter } from "vue-router";
import { useKioskoStore } from "@/stores/kioskoStore";
import { useToast } from "vue-toast-notification";
import SubmitInput from "@/components/SubmitInput.vue";

const route = useRoute();
const router = useRouter();
const kioskoStore = useKioskoStore();
const toast = useToast();
const token = localStorage.getItem("AUTH_TOKEN");
const nuevaImagen = ref(null);

const producto = ref({});

onMounted(() => {
  cargarProducto();
});

const handleImageChange = (event) => {
  nuevaImagen.value = event.target.files[0];
};

const submitForm = async () => {
  const formData = new FormData();
  formData.append("_method", "PUT");
  formData.append("nombre", producto.value.nombre);
  formData.append("precio", producto.value.precio);
  formData.append("categoria_id", producto.value.categoria_id);
  formData.append("disponible", producto.value.disponible ? 1 : 0);

  if (nuevaImagen.value) {
    formData.append("imagen", nuevaImagen.value);
  }
  for (let pair of formData.entries()) {
    console.log(`${pair[0]}: ${pair[1]}`);
  }

  try {
    console.log("Headers enviados:", {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    });

    const { data } = await clienteAxios.post(
      `/api/admin/productos/${producto.value.id}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    router.push({ name: "productos" });
  } catch (error) {
    console.error("Error actualizando el producto:", error);
  }
};

const cargarProducto = async () => {
  try {
    const { data } = await clienteAxios.get(
      `/api/productos/${route.params.id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    producto.value = data;
  } catch (error) {
    console.log("Error desde crear producto", error);
  }
};

const isDisponible = computed(() => producto.value.disponible === 1);
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
          v-model="producto.nombre"
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
          v-model="producto.precio"
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
      <div class="mb-4">
        <img :src="producto.imagen" alt="imagen" class="w-40" />
      </div>
      <div class="lg:grid lg:grid-cols-3 items-center">
        <div class="flex items-center justify-around mb-4 lg:mb-0">
          <label for="disponible" class="text-slate-800">Disponible</label>
          <input
            type="checkbox"
            id="disponible"
            name="disponible"
            class="mt-2 p-3 bg-gray-50 border border-gray-200 rounded-md"
            :checked="isDisponible"
            v-model="producto.disponible"
          />
        </div>
        <div class="col-span-2 flex items-center justify-around gap-4">
          <label for="categoria" class="text-slate-800">Categoría</label>

          <select
            name="categoria"
            id="categoria"
            v-model="producto.categoria_id"
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
      <SubmitInput value="Editar Producto"></SubmitInput>
    </form>
  </div>
</template>
