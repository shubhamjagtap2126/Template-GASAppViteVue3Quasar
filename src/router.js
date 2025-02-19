
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  // { path: '/about', component: About },
  {
    path: "/",
    name: "index",
    component: () => import("./layout/PublicLayout.vue"),
    children: [
      { path: "", name: "Home", component: () => import("./views/HelloWorld.vue") },
      // { path: "login", name: "login", component: Login },
      // { path: "signup", name: "signup", component: Signup },
      // { path: 'contact', name: 'Contact', component: () => import('./views/Contact.vue') },
      // { path: "about", name: "about", component: () => import("./views/About.vue") },
    ],
  },
  {
    path: "/u",
    name: "User",
    meta: { requiresAuth: true }, // Add a meta property for authentication
    component: () => import("./layout/AuthLayout.vue"),
    children: [
      { path: "", name: "AuthHome", component: () => import("./views/HelloWorld.vue") },
      // { path: "todo", name: "todo", component: () => import("./views/TodoApp.vue") },
      // { path: "products", name: "Products", component: () => import("./views/Products.vue") },
      // { path: "forms", name: "Forms", component: () => import("./views/Forms.vue") },
    ],
  },
  {
    path: "/admin",
    name: "Admin",
    component: () => import("./layout/AdminLayout.vue"),
    meta: { requiresAdmin: true, requiresAuth: true }, // Requires both authentication and admin role
    children: [
      { path: "", name: "AdminHome", component: () => import("./views/HelloWorld.vue") },
      // { path: "dashboard", name: "Dashboard", component: () => import("./views/Dashboard.vue") },
      // { path: 'users', name: 'Users', component: () => import('./views/Users.vue') },
    ],
  },
  { path: "/:catchAll(.*)*", component: () => import("./views/ErrorNotFound.vue") },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Navigation Guard for Authentication and Authorization
router.beforeEach((to, from, next) => {
  const isAuthenticated = true; /* Your authentication logic here (e.g., check local storage) */
  const isAdmin = true; /* Your admin role check logic here (e.g., check user roles) */

  if (to.meta.requiresAuth && !isAuthenticated) {
    next({ name: "Home" }); // Redirect to home or login page
  } else if (to.meta.requiresAdmin && !isAdmin) {
    next({ name: "Profile" }); // Redirect to a page accessible by authenticated users
  } else {
    next(); // Allow navigation
  }
});

export default router;

