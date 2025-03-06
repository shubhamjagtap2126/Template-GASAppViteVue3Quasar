<template>
  <q-layout view="hHh LpR fFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn flat dense round @click="toggleLeftDrawer" icon="menu" aria-label="Menu" />
        <router-link to="/admin">
          <q-toolbar-title> Admin </q-toolbar-title>
        </router-link>
        <q-space />
        <div class="q-gutter-sm row items-center no-wrap">
          <!-- <q-btn round dense flat color="white" :icon="$q.fullscreen.isActive ? 'fullscreen_exit' : 'fullscreen'" @click="$q.fullscreen.toggle()" v-if="$q.screen.gt.sm"> </q-btn> -->
          <q-btn round dense flat color="white" icon="notifications">
            <q-badge color="red" text-color="white" floating> 5 </q-badge>
            <q-menu>
              <q-list style="min-width: 100px">
                <messages></messages>
                <q-card class="text-center no-shadow no-border">
                  <q-btn label="View All" style="max-width: 120px !important" flat dense class="text-indigo-8"></q-btn>
                </q-card>
              </q-list>
            </q-menu>
          </q-btn>
          <q-btn round flat>
            <q-avatar size="26px">
              <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
            </q-avatar>
          </q-btn>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" :width="200" overlay bordered class="bg-primary text-white">
      <q-list>
        <q-item v-for="(item, index) in menuItems" :key="index" :to="{ name: item.label }" active-class="q-item-no-link-highlighting">
          <q-item-section avatar>
            <q-icon :name="item.icon" />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ item.label }}</q-item-label>
          </q-item-section>
        </q-item>

        <q-expansion-item v-for="(expansionItem, index) in expansionItems" :key="index" :icon="expansionItem.icon" :label="expansionItem.label">
          <q-list class="q-pl-lg">
            <q-item v-for="(nestedItem, subIndex) in expansionItem.items" :key="subIndex" :to="{ name: nestedItem.label }" active-class="q-item-no-link-highlighting">
              <q-item-section avatar>
                <q-icon :name="nestedItem.icon" />
              </q-item-section>
              <q-item-section>
                <q-item-label>{{ nestedItem.label }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-expansion-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer elevated class="bg-primary">
      <div class="q-pa-xs text-center">
        <div class="text-body1 q-mt-sm text-white text-weight-bold">© 2020. All rights reserved.</div>
      </div>
    </q-footer>
  </q-layout>
</template>

<script setup>
import { ref } from "vue";
import { useQuasar } from "quasar";

const leftDrawerOpen = ref(false);
const $q = useQuasar();

const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value;
};

const menuItems = [
  { to: "admin/Dashboard1", icon: "dashboard", label: "Dashboard1" },
  { to: "admin/Dashboard2", icon: "dashboard", label: "Dashboard2" },
  { to: "admin/messages", icon: "message", label: "Messages" },
  { to: "admin/directory", icon: "card_giftcard", label: "Directory" },
  { to: "admin/TreeTable", icon: "list", label: "TreeTable" },
  { to: "admin/Charts", icon: "insert_chart", label: "Charts" },
  { to: "admin/Footer", icon: "info", label: "Footer" },
  { to: "admin/CardHeader", icon: "card_giftcard", label: "CardHeader" },
  { to: "admin/Cards", icon: "card_giftcard", label: "Cards" },
  { to: "admin/Tables", icon: "table_chart", label: "Tables" },
  { to: "admin/Contact", icon: "person", label: "Contact" },
  { to: "admin/Checkout", icon: "check_circle_outline", label: "Checkout" },
  { to: "admin/Calendar", icon: "date_range", label: "Calendar" },
  { to: "admin/Pagination", icon: "date_range", label: "Pagination" },
  { to: "admin/Ecommerce", icon: "shopping_cart", label: "Ecommerce" },
];
const expansionItems = [
  {
    icon: "pages",
    label: "Pages",
    items: [
      { to: "admin/Login-1", icon: "email", label: "Login-1" },
      { to: "admin/Lock", icon: "lock", label: "Lock" },
      { to: "admin/Lock-2", icon: "lock", label: "Lock-2" },
      { to: "admin/Pricing", icon: "list", label: "Pricing" },
      { to: "admin/Profile", icon: "person", label: "Profile" },
      { to: "admin/Maintenance", icon: "settings", label: "Maintenance" },
    ],
  },
  {
    icon: "map",
    label: "Maps",
    items: [
      { to: "admin/Map", icon: "map", label: "Map" },
      { to: "admin/MapMarker", icon: "location_on", label: "MapMarker" },
      { to: "admin/StreetView", icon: "streetview", label: "StreetView" },
    ],
  },
  {
    icon: "menu_open",
    label: "Menu Levels",
    items: [
      { to: "", icon: "", label: "Level 1" },
      {
        icon: "",
        label: "Level 2",
        items: [
          { to: "", icon: "", label: "Level 2.1" },
          {
            label: "Level 2.2",
            items: [
              { to: "", icon: "", label: "Level 2.2.1" },
              { to: "", icon: "", label: "Level 2.2.2" },
            ],
          },
        ],
      },
    ],
  },
];
</script>

<style scoped>
/* FONT AWESOME GENERIC BEAT */
.fa-beat {
  animation: fa-beat 5s ease infinite;
}

@keyframes fa-beat {
  0% {
    transform: scale(1);
  }
  5% {
    transform: scale(1.25);
  }
  20% {
    transform: scale(1);
  }
  30% {
    transform: scale(1);
  }
  35% {
    transform: scale(1.25);
  }
  50% {
    transform: scale(1);
  }
  55% {
    transform: scale(1.25);
  }
  70% {
    transform: scale(1);
  }
}
</style>
