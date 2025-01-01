import { ref } from "vue";
import { defineStore } from "pinia";
import { categorias as categoriasDB } from "@/data/categorias";
import { useToastStore } from "./toastStore";

export const useKioskoStore = defineStore("kiosko", () => {
  const categorias = ref(categoriasDB);
  const producto = ref({});
  const cantidad = ref(1);
  const pedido = ref([]);
  const categoriaActual = ref(categorias.value[0]);
  const modal = ref(false);
  const toast = useToastStore();

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

  const editarCantidad = (id) => {
    const productoActualizar = pedido.value.find(
      (producto) => producto.id === id
    );
    producto.value = {
      ...productoActualizar,
      cantidad: productoActualizar.cantidad,
    };
    toggleModal();
  };
  const eliminarProductoPedido = (id) => {
    const pedidoActualizado = pedido.value.filter(
      (producto) => producto.id !== id
    );
    pedido.value = pedidoActualizado;
    toast.mostrarExito("Producto eliminado del pedido");
  };

  return {
    categorias,
    producto,
    cantidad,
    pedido,
    categoriaActual,
    seleccionarCategoria,
    modal,
    toggleModal,
    seleccionarProducto,
    agregarPedido,
    editarCantidad,
    eliminarProductoPedido,
  };
});
