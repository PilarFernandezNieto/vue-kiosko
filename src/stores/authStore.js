import { defineStore } from "pinia";
import { ref } from "vue";
import { useRouter } from "vue-router";
import apiAuth from "@/api/apiAuth";
import { useToastStore } from "@/stores/toastStore";


export const useAuthStore = defineStore("auth", () => {
  const token = ref(localStorage.getItem("AUTH_TOKEN") || null);
  const user = ref(null);
  const router = useRouter();
  const toast = useToastStore();
  const cachedUser = ref(localStorage.getItem("user_data") || null); // Caché local

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

  const login = async (datos, errores) => {
    try {
      const { data } = await apiAuth.login(datos);
      setToken(data.token);
      
      errores.value = [];
      user.value = await auth();
      localStorage.setItem("user_data", JSON.stringify(data.user));
      cachedUser.value = JSON.stringify(data.user);
      console.log(user.value);
      
      await router.push({ name: "inicio" });
    } catch (error) {
      console.log(errores.value);
      errores.value = Object.values(error?.response?.data?.errors);
    }
  };
  const auth = async () => {
    if (cachedUser.value) {
      user.value = JSON.parse(cachedUser.value); // Usar los datos almacenados
      return user.value;
    }
    if (!token.value) {
      return next({ name: "login" });
    } else {
      try {
        const { data } = await apiAuth.auth();
        user.value = data
        localStorage.setItem("user_data", JSON.stringify(data));
        cachedUser.value = JSON.stringify(data);
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
      localStorage.removeItem("AUTH_TOKEN");
      localStorage.removeItem("user_data");
      setToken(null);
      user.value = null;
      await router.push({ name: "login" });
    } catch (error) {
      throw Error(error?.response?.data?.errors);
    }
  };

  return {
    token,
    user,
    registro,
    login,
    logout,
    auth
  };
});
