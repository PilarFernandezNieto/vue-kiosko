import { computed, ref } from "vue";
import { defineStore } from "pinia";
import { categorias as categoriasDB } from "@/data/categorias";

export const useKioskoStore = defineStore("kiosko", () => {
  const categorias = ref(categoriasDB);
  const producto = ref({});
  const pedido = ref([]);
  const categoriaActual = ref(categorias.value[0]);
  const modal = ref(false);

  const seleccionarCategoria = (id) => {
    const categoria = categorias.value.filter(
      (categoria) => categoria.id === id
    )[0];
    categoriaActual.value = categoria;
  };

  const toggleModal = () => {
    modal.value = !modal.value;
  };

  const seleccionarProducto = (nuevoProducto) => {
    producto.value = nuevoProducto;
  };

  const agregarPedido = (producto) => {
    if (pedido.value.some((pedidoState) => pedidoState.id === producto.id)) {
      const pedidoActualizado = pedido.value.map((pedidoState) =>
        pedidoState.id === producto.id ? producto : pedidoState
      );
      pedido.value = pedidoActualizado;
    } else {
      pedido.value = [...pedido.value, producto];
    }
  };

  return {
    categorias,
    producto,
    pedido,
    categoriaActual,
    seleccionarCategoria,
    modal,
    toggleModal,
    seleccionarProducto,
    agregarPedido,
  };
});
