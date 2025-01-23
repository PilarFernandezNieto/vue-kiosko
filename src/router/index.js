import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "@/stores/authStore";
import apiAuth from "@/api/apiAuth";
import Layout from "@/layouts/Layout.vue";
import AuthLayout from "@/layouts/AuthLayout.vue";
import AdminLayout from "@/layouts/AdminLayout.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: Layout,
      children: [
        {
          path: "",
          name: "inicio",
          meta: { requiresAuth: true },
          component: () => import("@/views/InicioView.vue"),
        },
      ],
    },
    {
      path: "/auth",
      name: "auth",
      component: AuthLayout,
      children: [
        {
          path: "login",
          name: "login",
          component: () => import("@/views/LoginView.vue"),
        },
        {
          path: "registro",
          name: "registro",
          component: () => import("@/views/RegistroView.vue"),
        },
      ],
    },
    {
      path: "/admin",
      name: "admin",
      meta: { requiresAdmin: true },
      component: AdminLayout,
      children: [
        {
          path: "",
          name: "pedidos",
          component: () => import("@/views/Pedidos.vue"),
        },
        {
          path: "productos",
          name: "productos",
          component: () => import("@/views/Productos.vue"),
        },
        {
          path: "nuevo",
          name: "nuevo-producto",
          component: () => import("@/views/NuevoProductoView.vue"),
        },
        {
          path: ":id/editar",
          name: "editar-producto",
          component: () => import("@/views/EditarProductoView.vue"),
        },
        {
          path: "categorias",
          name: "categorias",
          component: () => import("@/views/Categorias.vue"),
        },
        {
          path: "nueva",
          name: "nueva-categoria",
          component: () => import("@/views/NuevaCategoriaView.vue"),
        },

      ],
    },
  ],
});
router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore();
  const requiresAuth = to.matched.some((url) => url.meta.requiresAuth);
  const requiresAdmin = to.matched.some((url) => url.meta.requiresAdmin);

  try {
    if (requiresAuth && !authStore.token) {
      return next({ name: "login" });
    }

    if (requiresAdmin) {
      const { data } = await apiAuth.auth(); // Verifica al usuario autenticado
      if (!data.admin) {
        return next({ name: "inicio" });
      }
    }
    next(); // Permite la navegación si pasa las verificaciones
  } catch (error) {
    console.error("Error during navigation:", error);
    if (requiresAuth || requiresAdmin) {
      return next({ name: "login" });
    }
    next();
  }
});

export default router;
