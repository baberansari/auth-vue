import { createRouter, createWebHistory } from "vue-router";
import routes from "./routes";
import { useSessionStore,useAuthStore } from "@/stores";
import { ability } from '@/plugins/ability';
const router = createRouter({
  history: createWebHistory(),
  routes: routes,
});

router.beforeEach(async (to, from, next) => {
  const sessionStore = useSessionStore();
  const { access_token: accessToken } = sessionStore.getCookie() || {};
  const isAuth = to.path.startsWith("/auth");

  if (!accessToken) {
    if (isAuth) {
      next();
    } else {
      next({ name: "login" });
    }
  } else if (accessToken && !isAuth) {
    next();
  } else {
    next({ name: "dashboard" });
  }
});

router.beforeEach(async (to, from, next) => {
    const authStore = useAuthStore();


  let requiredPermissions = to.meta.permission;

  authStore.setRouteForbidden(false);

  if (!requiredPermissions) {
    return next();
  }

  if (!authStore.user) {
    try {
      await authStore.me();
    } catch (err) {
      console.log(err);
    }
  }

  requiredPermissions = Array.isArray(requiredPermissions)
    ? requiredPermissions
    : [requiredPermissions];

  const hasPermission = requiredPermissions.some((permission) => {
    return ability.can(permission);
  });

  if (!hasPermission) {
   
    authStore.setRouteForbidden(true);
  }

  next();
});

export default router;
