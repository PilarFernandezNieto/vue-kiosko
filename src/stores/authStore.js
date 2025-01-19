import { defineStore } from "pinia";
import { useQuery } from "@tanstack/vue-query";
import { ref } from "vue";
import { useRouter } from "vue-router";
import apiAuth from "@/api/apiAuth";
import { useToastStore } from "@/stores/toastStore";

export const useAuthStore = defineStore("auth", () => {
  const token = ref(localStorage.getItem("AUTH_TOKEN") || null);
  const user = ref(null);
  const router = useRouter();
  const toast = useToastStore();

  const setToken = (newToken) => {
    token.value = newToken;
    if (newToken) {
      localStorage.setItem("AUTH_TOKEN", newToken);
    } else {
      localStorage.removeItem("AUTH_TOKEN");
    }
  };
  // Usar la query de Vue Query para obtener el usuario
  const {
    data: userData,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const { data } = await apiAuth.auth();
      user.value = data;
      return data;
    },
    enabled: !!localStorage.getItem("AUTH_TOKEN"),
   });

  const registro = async (datos, errores) => {
    try {
      const { data } = await apiAuth.registro(datos);
      errores.value = [];
      if (data.type === "success") {
        toast.mostrarExito(data.mensaje);
      }
      await router.push({ name: "login" });
    } catch (error) {
      errores.value = Object.values(error.response.data.errors);
    }
  };

  const login = async (datos, errores) => {
    try {
      const { data } = await apiAuth.login(datos);
      setToken(data.token);
      errores.value = [];
      console.log("desde login", user.value);
      await refetch();
      await router.push({ name: "inicio" });
    } catch (error) {
      console.log(errores.value);
      errores.value = Object.values(error?.response?.data?.errors);
    }
  };
  const auth = async () => {
    console.log("antes de la petición", user.value);
    
    if (!token.value) {
      return next({ name: "login" });
    } else {
      try {
        const { data } = await apiAuth.auth();
        user.value = data;
        console.log("desde auth", user.value);
        return data;
      } catch (error) {
        console.error("Fallo de autenticación", error);
        throw new Error("Unable to fetch user data");
      }
    }
  };
  const logout = async () => {
    try {
      await apiAuth.logout();
      setToken(null);
      user.value = null;
      await router.push({ name: "login" });
    } catch (error) {
      throw Error(error?.response?.data?.errors);
    }
  };

  return {
    token,
    user: userData,
    isLoading,
    isError,
    registro,
    login,
    logout,
    auth,
  };
});
