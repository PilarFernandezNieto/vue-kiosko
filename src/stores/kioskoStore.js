import { computed, ref } from "vue";
import { defineStore } from "pinia";
import { categorias as categoriasDB } from "@/data/categorias";

export const useKioskoStore = defineStore("kiosko", () => {

const categorias = ref(categoriasDB);
const categoriaActual= ref(categorias.value[0]);


const handleClickCategoria = (id)=> {
   const categoria = categorias.value.filter((categoria) => categoria.id === id)[0];
   categoriaActual.value = categoria;
}

  return {
    categorias,
    categoriaActual,
    handleClickCategoria
  };
});
