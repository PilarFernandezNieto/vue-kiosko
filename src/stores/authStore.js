import { defineStore } from "pinia";
import { ref, watch } from "vue";
import { useRouter } from "vue-router";
import { useQuery } from "@tanstack/vue-query";
import apiAuth from "@/api/apiAuth";
import { useToastStore } from "@/stores/toastStore";

export const useAuthStore = defineStore("auth", () => {
  const token = ref(localStorage.getItem("AUTH_TOKEN") || null);
  const user = ref(null);
  const middleware = ref("");
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
  const {
    data: userData,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const {data} = await apiAuth.auth();
      user.value = data;
      return data;
    },
    enabled: !!localStorage.getItem("AUTH_TOKEN"),
  });

  const login = async (datos, errores) => {
    try {
      const { data } = await apiAuth.login(datos);
      setToken(data.token);
      middleware.value = "guest";
      errores.value = [];
      await refetch();
      console.log("Datos del usuario después de refetch:", userData.value);
      await router.push({name: 'Inicio'})
    } catch (error) {
      console.log(errores.value);
      errores.value = Object.values(error?.response?.data?.errors);
    }
  };


  const auth = async () => {
    if (!token.value) {
      return next({ name: "login" });
    } else {
      try {
        const { data } = await apiAuth.auth();
        user.value = data;
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
      localStorage.removeItem('AUTH_TOKEN');
      setToken(null);
      await router.push({name: 'login'})
    } catch (error) {
      throw Error(error?.response?.data?.errors)
    }
    
  }

  return {
    middleware,
    token,
    user,
    error,
    registro,
    login,
    logout,
    userData,
    auth,
  };
});
