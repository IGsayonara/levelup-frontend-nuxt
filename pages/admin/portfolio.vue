<template>
  <ProjectSettings class="container" />
</template>

<script setup lang="ts">
definePageMeta({
  middleware: ['auth', 'fetch-user'],
})
</script>

<style scoped lang="scss">

</style>
