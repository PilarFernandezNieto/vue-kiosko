import { computed, ref } from "vue";
import { defineStore } from "pinia";
import { categorias as categoriasDB } from "@/data/categorias";

export const useKioskoStore = defineStore("kiosko", () => {
  const categorias = ref(categoriasDB);
  const producto = ref({});
  const pedido = ref([]);
  const categoriaActual = ref(categorias.value[0]);
  const modal = ref(false);

  const handleClickCategoria = (id) => {
    const categoria = categorias.value.filter(
      (categoria) => categoria.id === id
    )[0];
    categoriaActual.value = categoria;
  };

  const handleClickModal = () => {
    modal.value = !modal.value;
  };

  const handleSetProducto = (nuevoProducto) => {
    producto.value = nuevoProducto;
  };

  const handleAgregarPedido = ({ categoria_id, imagen, ...producto }) => {
    pedido.value = [...pedido.value, producto];
  };

  return {
    categorias,
    producto,
    pedido,
    categoriaActual,
    handleClickCategoria,
    modal,
    handleClickModal,
    handleSetProducto,
    handleAgregarPedido,
  };
});
