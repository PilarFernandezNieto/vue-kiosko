import { defineStore } from "pinia";
import { ref } from "vue";
import { useQuery } from "@tanstack/vue-query";
import apiAuth from "@/api/apiAuth";

export const useAuthStore = defineStore("auth", () => {
  const token = ref(localStorage.getItem("AUTH_TOKEN") || null);
  const user = ref(null);

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
      localStorage.setItem("AUTH_TOKEN", data.token);
      errores.value = [];
    } catch (error) {
      errores.value = Object.values(error.response.data.errors);
    }
  };
  const login = async (datos, errores) => {
    try {
      const { data } = await apiAuth.login(datos);
      console.log(data);

      setToken(data.token);
      errores.value = [];
    } catch (error) {
      console.log(errores.value);

      errores.value = Object.values(error.response.data.errors);
    }
  };
  const userQuery = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const { data } = await apiAuth.auth();
      console.log("user", data);

      user.value = data;
      return data;
    },
    staleTime: 1000 * 60 * 5, // 5 minutos sin hacer nuevas solicitudes
    enabled: !!localStorage.getItem("AUTH_TOKEN"),
  });

  const auth = async () => {
    if (!token.value) {
      return next({ name: "login" });
    } else {
      try {
        console.log("Haciendo solicitud apiAuth.auth()");

        const { data } = await apiAuth.auth();
        user.value = data;
        return data;
      } catch (error) {
        console.error("Fallo de autenticación", error);
        throw new Error("Unable to fetch user data");
      }
    }
  };

  return {
    token,
    user,
    registro,
    login,
    userQuery,
    auth,
  };
});
