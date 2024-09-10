<template>
  <ClientOnly>
    <AppHeader></AppHeader>
    <AppBreadcrumbs></AppBreadcrumbs>
  </ClientOnly>
  <slot></slot>
</template>

<script setup lang="ts">

import App from "~/app.vue";
</script>