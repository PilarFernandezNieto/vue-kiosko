import { onMounted, ref, watch } from "vue";
import { defineStore } from "pinia";
import { useToastStore } from "./toastStore";
import { useAuthStore } from "./authStore";
import clienteAxios from "@/config/axios";

export const useKioskoStore = defineStore("kiosko", () => {
  const categorias = ref([]);
  const productos = ref([]);
  const producto = ref({});
  const cantidad = ref(1);
  const pedido = ref([]);
  const categoriaActual = ref({});
  const modal = ref(false);
  const toast = useToastStore();
  const authStore = useAuthStore();
  const token = localStorage.getItem("AUTH_TOKEN");

  onMounted(() => {
    obtenerCategorias();
    console.log('Token', token);
    
  });

  const obtenerCategorias = async () => {
    try {
      const { data } = await clienteAxios("/api/categorias", {

        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      categorias.value = data.data;
      console.log("Categorias", categorias.value);
      
      categoriaActual.value = data.data[0];
    } catch (error) {
      console.log(error);
    }
  };
  watch(
    () => categorias.value, // Observar la propiedad `categorias`
    (newValue, oldValue) => {
     obtenerCategorias();
    },
    { deep: true } // Si los datos son objetos o arrays, usa deep para observar cambios internos.
  );
  const seleccionarCategoriaActual = (id) => {
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
  const crearPedido = async (total) => {
    try {
      const { data } = await clienteAxios.post(
        "/api/pedidos",
        {
          total: total,
          productos: pedido.value.map((producto) => {
            return {
              id: producto.id,
              cantidad: producto.cantidad,
            };
          }),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.mostrarExito(data.message);
      setTimeout(() => {
        pedido.value = [];
      }, 1000);
      // Cerrar la sesión del usuario
      setTimeout(() => {
        localStorage.removeItem("AUTH_STORE");
        authStore.logout();
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  };

  const completarPedido = async(id) => {
    try {
      await clienteAxios.put(`/api/pedidos/${id}`, null, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
    } catch (error) {
      console.log("Error desde completar pedido", error);
    }
  }
  const editarProducto = async(id) => {
    try {
      await clienteAxios.put(`/api/productos/${id}`, null, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
    } catch (error) {
      console.log("Error desde producto agotado", error);
    }
  }

  const eliminarProducto = async (id) => {
    try {
      const {data} = await clienteAxios.delete(`/api/admin/productos/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      toast.mostrarExito(data.message);
      
      
    } catch (error) {
      console.log("Error desde eliminar producto", error);
    }
    
  }

  return {
    categorias,
    producto,
    cantidad,
    pedido,
    categoriaActual,
    seleccionarCategoriaActual,
    modal,
    toggleModal,
    seleccionarProducto,
    agregarPedido,
    editarCantidad,
    eliminarProductoPedido,
    crearPedido,
    completarPedido,
    editarProducto,
    eliminarProducto
  };
});
