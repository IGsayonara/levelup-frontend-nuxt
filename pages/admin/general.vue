<template>
  <GeneralSettings class="mt-3" />
</template>

<script setup lang="ts">
definePageMeta({
  middleware: ['auth', 'fetch-user'],
})
</script>

<style scoped lang="scss">

</style>
