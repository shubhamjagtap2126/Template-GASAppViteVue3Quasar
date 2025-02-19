<script setup>
// import { defineProps } from 'vue';

const props = defineProps({
  name: { type: String, required: true },
  // caption: { type: String, default: '' },
  link: { type: String, default: '' },
  icon: { type: String, default: '' },
  separator: { type: Boolean, default: undefined }
})
</script>


<template>
  <q-item clickable v-ripple :to="{name : props.name}" >
    <!-- Icon -->
    <q-item-section v-if="props.icon" avatar class="pr-0">
      <q-icon :name="props.icon" />
    </q-item-section>
    <q-item-section >
      <q-item-label>{{ props.name }}</q-item-label>
      <!-- <q-item-label caption>{{ props.caption }}</q-item-label> -->
    </q-item-section>
  </q-item>
  <q-separator :key="props.name" v-if="props.separator" />
</template>
