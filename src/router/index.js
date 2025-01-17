import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "@/stores/authStore";
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
          component: () => import("@/views/Productos.vue")
        }
      ]
    },
  ],
});
router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore();
  const requiresAuth = to.matched.some((url) => url.meta.requiresAuth);

  if (requiresAuth && !authStore.token) {
    next({ name: "login" });
  } else {
    next();
  }
});

export default router;
