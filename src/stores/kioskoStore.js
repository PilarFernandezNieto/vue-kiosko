import { computed, ref } from "vue";
import { defineStore } from "pinia";
import { categorias as categoriasDB } from "@/data/categorias";

export const useKioskoStore = defineStore("kiosko", () => {

const categorias = ref(categoriasDB);
const categoriaActual= ref(categorias.value[0]);
const modal = ref(false);


const handleClickCategoria = (id)=> {
   const categoria = categorias.value.filter((categoria) => categoria.id === id)[0];
   categoriaActual.value = categoria;
}

const handleClickModal = () => {
    modal.value = !modal.value;
}

  return {
    categorias,
    categoriaActual,
    handleClickCategoria,
    modal,
    handleClickModal
  };
});
