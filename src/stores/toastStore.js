import { defineStore } from "pinia";
import { useToast } from "vue-toast-notification";
import "vue-toast-notification/dist/theme-sugar.css";

export const useToastStore = defineStore("toast", () => {
  
  const toast = useToast();

  const mostrarExito = (mensaje) => {
    toast.success(mensaje, { duration: 3000, position: "top-right" });
  };

  const mostrarError = (mensaje) => {
    toast.error(mensaje, { duration: 3000, position: "top-right" });
  };

  const mostrarInfo = (mensaje) => {
    toast.info(mensaje, { duration: 3000, position: "top-right" });
  };

  const mostrarAdvertencia = (mensaje) => {
    toast.warning(mensaje, { duration: 3000, position: "top-right" });
  };

  return {
    mostrarExito,
    mostrarError,
    mostrarInfo,
    mostrarAdvertencia,
  };
});
