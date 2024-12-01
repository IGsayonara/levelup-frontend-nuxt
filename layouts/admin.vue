<template>
  <div class="container">
    <section>
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
        <slot />
      </div>
    </section>
  </div>
</template>
