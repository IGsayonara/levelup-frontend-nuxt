<template>
  <div>
    <NuxtLayout name="default">
      <AppBreadcrumbs :breadcrumbs="breadcrumbs" />
      <section>
        <div class="container">
          <div class="not_found_image">
            <img
              src="/img/404.jpg"
              alt="Not found any project"
            >
          </div>
        </div>
      </section>
    </NuxtLayout>
  </div>
</template>

<script setup>
const breadcrumbs = ref([
  {
    to: '/',
    text: 'Home',
  },
  {
    to: '',
    text: 'Not found',
  },
])
</script>

<style scoped></style>
