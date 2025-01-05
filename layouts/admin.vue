<template>
  <div>
    <section>
      <div class="container">
        <nav>
          <NuxtLink to="/admin/general">
            General Settings
          </NuxtLink>
          <NuxtLink to="/admin/portfolio">
            Portfolio
          </NuxtLink>
        </nav>
        <div class="container">
          <!-- Render child pages -->
        </div>
      </div>
    </section>
    <slot />
  </div>
</template>
