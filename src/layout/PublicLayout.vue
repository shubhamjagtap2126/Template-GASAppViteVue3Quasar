<template>
  <q-layout view="lHh Lpr lFf">
    <!-- Header for md and above -->
    <q-header elevated class="bg-blue-600">
      <q-toolbar>
        <!-- Logo -->
        <router-link to="/">
          <q-toolbar-title> My Website </q-toolbar-title>
        </router-link>

        <!-- Desktop Navigation Links (md and above) -->
        <div class="flex flex-row space-x-3 ml-auto">
          <q-btn v-for="(link, index) in navLinks" :key="index" flat :label="link.label" :to="link.to" class="text-white q-pa-none" />
        </div>

        <!-- Hamburger Menu for Mobile (visible on small screens) -->
        <q-btn flat icon="menu" @click="drawerOpen = !drawerOpen" class="q-mx-xs hidden" />
      </q-toolbar>
    </q-header>

    <!-- Drawer for Mobile Navigation -->
    <q-drawer v-model="drawerOpen" side="right" overlay :width="200">
      <q-list>
        <q-item v-for="(link, index) in navLinks" :key="index" clickable :to="link.to">
          <q-item-section>
            {{ link.label }}
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <!-- Main Content -->
    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer elevated>
      <div class="q-pa-md text-center">&copy; 2024 All rights reserved.</div>
    </q-footer>
  </q-layout>
</template>

<script setup>
import { ref } from "vue";

const drawerOpen = ref(false); // Controls the visibility of the mobile drawer

// Define the navigation links
const navLinks = [
  { label: "Testing", to: "/about" },
  { label: "Ticketmania", to: "/tickets" },
  { label: "Mail", to: "/mail" },
  { label: "Whatsapp", to: "/whatsapp" },
  { label: "Youtube", to: "/youtube" },
  { label: "User", to: "/u" },
  { label: "Admin", to: "/admin" },
];
</script>

<style scoped></style>
