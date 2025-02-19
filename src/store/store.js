import { defineStore } from "pinia";
import { ref, computed, reactive } from "vue";
import { Notify, uid } from "quasar";
import jsonData from "./Data.json";
import { useRouter } from "vue-router";
import { request } from "../ServerFunc";

// *********=============== ✨ Store Transactions 🌟  ===============********* //
export const useJasonData = defineStore("jsonData", () => {
  // =========================================> State  <====================================
  const data = ref(jsonData);
  // const data = reactive({
  //   entries: JSON.parse(localStorage.getItem("entries") || "[]"),
  // });

  // console.log(data.value);

  // =========================================> Getters  <====================================

  // =========================================> Actions  <====================================

  // =========================================> Returns  <====================================
  return { data };
});


// *********=============== ✨ Store User Authentication 🌟  ===============********* //
// localStorage.setItem("user", JSON.stringify({name: 'SJ', email: 'zL6Fg@example.com'}))
// localStorage.setItem("user", JSON.stringify({name: 'SJ', email: 'zL6Fg@example.com', isAdmin: true}))

export const useAuthStore = defineStore("auth", () => {
  const user = ref(JSON.parse(localStorage.getItem("user")) || null);
  const isAuthenticated = ref(user ? true : false);
  // const token = ref(JSON.parse(localStorage.getItem("token")) || null);
  const loading = ref(false);
  const error = ref(null);
  const router = useRouter(); // Get the router instance
  // const isAdmin = ref(user ? true : false);
  const isLoggedIn = computed(() => isAuthenticated.value);
  const isAuthAdmin = computed(() => !!user.value?.isAdmin);
  const getUser = computed(() => user.value);
  // const getToken = computed(() => token.value);

  async function login(loginForm) {
    loading.value = true;
    error.value = null;
    try {
      const response = await request("login", loginForm);
      console.log(response);
      if (!response.success) error.value = "Login failed.";
      isAuthenticated.value = true;
      loading.value = false;
      user.value = response.user;
      console.log(user.value);
      // token.value = data.token;
      localStorage.setItem("user", JSON.stringify(response.user));
      Notify.create({
        message: `${response.user.name} successfully logged in`,
        position: "top-right",
        color: "positive",
      });
      router.push("/u/home");
    } catch (err) {
      error.value = err.error;
      Notify.create({
        message: `Signup failed. ${err.error}`,
        position: "top-right",
        color: "negative",
      });
      loading.value = false;
    }
  }

  async function signup(signupForm) {
    loading.value = true;
    error.value = null;

    signupForm.id = uid();
    const response = await request("signup", signupForm);
    console.log(response);
    try {
      if (!response.success) error.value = "Signup failed.";
      router.push("/u/home");
      isAuthenticated.value = true;
      loading.value = false;
      user.value = response.user;
      // token.value = data.token;
      Notify.create({
        message: `${signupForm.name} successfully Created`,
        position: "top-right",
        color: "positive",
      });
      localStorage.setItem("user", JSON.stringify(response.user));
    } catch (err) {
      error.value = err.error;
      Notify.create({
        message: `Signup failed. ${err.error}`,
        position: "top-right",
        color: "negative",
      });
      loading.value = false;
    }
  }

  async function logout() {
    loading.value = true;
    try {
      isAuthenticated.value = false;
      user.value = null;
      // token.value = null;
      localStorage.removeItem("user");
      router.push("/");
      Notify.create({
        message: `Successfully Logout`,
        position: "top-right",
        color: "positive",
      });
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      loading.value = false;
    }
  }

  function initialize() {
    // if (token.value) {      isAuthenticated.value = true;    }
    if (user.value) {
      isAuthenticated.value = true;
    }
  }
  return {
    isAuthenticated,
    user,
    //  token,
    loading,
    error,
    isLoggedIn,
    getUser,
    // getToken,
    login,
    signup,
    logout,
    initialize,
  };
});

// *********=============== ✨ Store🌟  ===============********* //

// *********=============== ✨ Store 🌟  ===============********* //
